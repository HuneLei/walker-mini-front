import * as minilog from './minilog.js'
import {
  VERSION
} from '../../config/app.config'

/* 
 * minidebug是记录小程序用户日志行为及错误日志报警的方法类集合
 * miniArray数组控制需要记录的原生方法行为
 * urlArray过滤不需要记录的请求路径
 */
const miniArray = ["page", "onError", "request", "getUserInfo"];
const requestArray = ["success", "fail"];
const urlArray = ["https://pingtas.qq.com/pingd"];

class minidebug {
  /*
   * minidebug类
   * @param {*} props 小程序初始化对象App()
   * @param [*] methods 方法集合默认为miniArray数组
   */
  constructor(methods = miniArray) {
    this.VERSION = VERSION; // 业务代码版本号
    this.originalApp = App || {}; // 原生app对象
    this.originalPage = Page || {}; // 原生page对象
    this.originalMethods = methods || []; // 初始化方法集合
    this.originalSystemInfo = this._getSystemInfo() || {}; // 系统信息
    this.originalUserInfo = {}; // 用户信息
    Object.assign(this, minilog) // 注入日志记录方法
  }

  /**
   * init初始化方法
   */
  init() {
    try {
      const _this = this;
      // 初始化时候查找需要运行的方法
      _this.originalMethods.forEach((m_name) => {
        if (_this[`_${m_name}`] && typeof _this[`_${m_name}`] == 'function') {
          _this[`_${m_name}`]()
        }
      })
      return _this;
    } catch (e) {
      console["error"](`init初始化方法失败：${e}`)
      return _this;
    }
  }

  // 日志记录注入每个页面
  _page() {
    Page = (options) => {
      const originalOnLoad = options.onLoad;
      options.onLoad = function (...arg) {
        new RenderLog(this)
        return originalOnLoad.call(this, ...arg)
      }
      return this.originalPage(options)
    }
  }

  /**
   * _onError方法
   * wx.onError()方法的重写
   */
  _onError() {
    App = (arg) => {
      try {
        arg.onError = (error) => {
          minilog.ERROR('小程序脚本错误', '错误信息 message = ', error)
        }
        this.originalApp(arg)
      } catch (e) {
        this.originalApp(arg)
        console["error"](`onError方法重写失败：${e}`)
      }
    }
  }

  /**
   * _request方法
   * wx.request()方法的重写
   */
  _request() {
    const _this = this
    try {
      // 保存wx.request原生方法
      const originalRequest = wx.request;
      Object.defineProperty(wx, 'request', {
        configurable: true, // 总开关，一旦为false，就不能再设置他的（value，writable，configurable）
        enumerable: true, // 是否能在for...in循环中遍历出来或在Object.keys中列举出来
        writable: true, // 如果为false，属性的值就不能被重写,只能为只读了
        // 属性的值
        value: function (e) {
          // 循环请求接口重写方法数组
          requestArray.forEach((r_name) => {
            const originalFunc = e[`${r_name}`] || '';
            // 重写操作
            if (originalFunc && typeof originalFunc == 'function' &&
              _this[`_${r_name}`] && typeof _this[`_${r_name}`] == 'function') {
              arguments[0][`${r_name}`] = (arg) => {
                _this[`_${r_name}`](this, e, arg, originalFunc)
              }
            }
          })

          // 返回wx.request重写方法
          return originalRequest.call(this, ...arguments);
        }
      })
    } catch (e) {
      console["error"](`request方法重写失败：${e}`)
    }
  }
  /**
   * request方法success的回调方法
   * @param {*} that 原始方法对象
   * @param {*} arg 原始方法参数
   * @param {*} _originalSuccess 原始方法
   */
  _success(that, res, arg, _originalSuccess) {
    this._reqResolve(res, 'success', arg)
    return _originalSuccess.call(that, arg);
  }
  /**
   * request方法fail的回调方法
   * @param {*} that 原始方法对象
   * @param {*} arg 原始方法参数
   * @param {*} _originalFail 原始方法
   */
  _fail(that, res, arg, _originalFail) {
    this._reqResolve(res, 'fail', arg)
    return _originalFail.call(that, arg);
  }

  /**
   * _reqResolv方法request的入参数据
   * @param {*} e 原始方法参数
   */
  _reqResolve(e, state, arg) {
    let url = e.url || '';
    let data = e.data || '';
    let code = !(arg && arg.data && arg.data.status) ? '' : arg.data.status.code || 0;
    let isRecord = urlArray.some((urlItem) => {
      return isInArray(url, urlItem)
    })
    if (!isRecord && code == 0) {
      minilog.WARN('请求信息', `${url} invoke, params = `, data || {})
      minilog.WARN('返回信息', `请求成功, data =`, arg.data || {})
      this._logSystemInfo()
    } else if (!isRecord && code != 0) {
      minilog.ERROR('请求信息', `${url} invoke, params = `, data || {})
      minilog.ERROR('返回信息', `请求失败, params = `, arg || {})
    }
  }

  // 获取系统信息
  _getSystemInfo() {
    try {
      const res = wx.getSystemInfoSync()
      return res;
    } catch (e) {
      console["error"](`获取系统信息失败：${e}`);
    }
  }

  // 获取用户信息
  _getUserInfo() {
    const _this = this;
    try {
      // 查看是否授权
      wx.getSetting({
        success(res) {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            wx.getUserInfo({
              success: function (res) {
                _this.originalUserInfo = res.userInfo
              }
            })
          }
        },
      })
    } catch (e) {
      console["error"](`获取用户信息失败：${e}`);
    }
  }

  // 记录系统信息
  _logSystemInfo() {
    try {
      let userInfo = {};
      const res = this.originalSystemInfo
      JSON.stringify(this.originalUserInfo) == "{}" ? this._getUserInfo() : userInfo = this.originalUserInfo;
      const data = {
        '用户姓名': userInfo.nickName || '未知姓名',
        '用户地址': userInfo.city || '未知地址',
        '时间': convertDate(),
        '设备品牌': res.brand,
        '设备型号': res.model,
        '环系统境': res.platform,
        '微信版本号': res.version,
        '基础库版本': res.SDKVersion,
      }
      minilog.WARN('基本信息', 'SystemInfo invoke, params = ', data || {})
    } catch (e) {
      console["error"](`记录系统信息失败：${e}`);
    }
  }
}

module.exports = minidebug

// 过滤不需要记录日志的方法和方法类型
const miniMethods = ['onPageScroll']
const methodTypes = ['change', 'scroll']

// 页面日志记录类
class RenderLog {
  /**
   * 初始化方法，在页面的 onLoad 方法中调用，传入 Page 对象
   */
  constructor(pageContext, page_name = '') {
    this.page = pageContext; // 记录页面原生对象
    try {
      Object.keys(this.page || {}).forEach(methodName => {
        const originMethod = this.page[methodName];
        // 判断是否为方法和过滤方法集合
        if (typeof originMethod == 'function' && !isInArray(miniMethods, methodName)) {
          // 重构方法集合
          this.page[methodName] = (ev, ...args) => {
            let evType = ev && ev.type;
            // 判断类型是否是需求日志记录的方法类型
            if (!isInArray(methodTypes, evType)) {
              if (ev && ev.target && ev.currentTarget && ev.currentTarget.dataset) {
                // 如果是事件类型，则只需要记录 dataset 数据
                minilog.INFO(this.page.route, `${methodName} invoke, event dataset = `, ev.currentTarget.dataset, ev, "params = ", ...args || {})
              } else {
                // 其他情况下，则都记录日志
                minilog.INFO(this.page.route, `${methodName} invoke, params = `, ev || {}, ...args || {})
              }
            };
            // 触发原有的方法
            return originMethod.call(this.page, ev, ...args);
          }
        }
      })
    } catch (e) {
      console["error"](`初始化Page 对象失败：${e}`);
    }
  }
}

/**
 * 使用indexOf判断元素是否存在于数组中
 * @param {Object} arr 数组
 * @param {Object} value 元素值
 */
function isInArray(arr, value) {
  if (value && arr.indexOf && typeof (arr.indexOf) == 'function') {
    var index = arr.indexOf(value);
    if (index >= 0) {
      return true;
    }
  }
  return false;
}

// 格式化日期
function convertDate() {
  const date = new Date();
  const y = date.getFullYear();
  let m = (date.getMonth() + 1).toString();
  let d = date.getDate().toString();
  let h = date.getHours(); // 小时
  let f = date.getMinutes(); // 分
  let s = date.getSeconds(); // 秒
  if (m.length < 2) {
    m = `0${m}`;
  }
  if (d.length < 2) {
    d = `0${d}`;
  }
  if (h.length < 2) {
    h = `0${h}`;
  }
  if (f.length < 2) {
    f = `0${f}`;
  }
  if (s.length < 2) {
    s = `0${s}`;
  }
  return `${y}-${m}-${d} ${h}:${f}:${s}`;
};