// 需要调用接口获取数据的公共方法
import {
  gainToken,
  tokenCheck,
} from '../api/login'

import {
  setToken,
  setUserInfo,
} from '../config.js';

module.exports = {
  // 检查是否在企业微信中打开
  checkLoadMode() {
    return new Promise((resolve, reject) => {
      const {
        environment
      } = this.globalData.globalSystemInfo;
      console.log('environment', environment);
      if (!environment) {
        wx.reLaunch({
          url: '/pages/error/login/index?code=no_wxwork',
        })
        return reject()
      } else {
        return resolve()
      }
    })
  },
  // 登录检测
  checkLoadLogin() {
    const _this = this;
    return new Promise((resolve, reject) => {
      if (wx.qy) {
        wx.qy.checkSession({
          success: function () {
            let token = setToken.get();
            if (token) {
              tokenCheck().then((res) => {
                const {
                  data
                } = res.data;
                if (data) {
                  setUserInfo.set(data);
                  return resolve()
                } else {
                  return reject("后端检查token 已经失效")
                }
              }).catch(() => {
                return reject("检查token接口 报错")
              })
            } else {
              return reject("未找到token")
            }
          },
          // session_key 已经失效，需要重新执行登录流程
          fail: function () {
            return reject("session_key 已经失效");
          }
        })
      }
    }).then(() => {
      wx.switchTab({
        url: '/pages/home/index'
      })
    }).catch((error) => {
      _this.initLoadLogin().then(() => {
        wx.switchTab({
          url: '/pages/home/index'
        })
      }).catch((code) => {
        wx.reLaunch({
          url: `/pages/error/login/index?code=${code}`,
        })
      });
    })
  },

  // 登录操作
  initLoadLogin() {
    const _this = this;
    return new Promise((resolve, reject) => {
      _this.getLoginCode().then(code => {
        gainToken({
          grant_type: 'work_weixin_mini',
          scope: 'server',
          code,
        }).then((res) => {
          let {
            access_token,
            user_info,
          } = res.data;
          if (access_token) {
            setToken.set(access_token);
            setUserInfo.set(user_info);
            return resolve();
          } else {
            return reject('no_thing')
          }
        }).catch((error) => {
          return reject('no_install')
        })
      }).catch(() => {
        return reject('no_install')
      });
    })
  },

  // 获取微信login code
  getLoginCode() {
    return new Promise((resolve, reject) => {
      wx.qy.login({
        success: (res) => {
          resolve(res.code)
        },
        fail: () => {
          reject()
        },
      })
    })
  },

  // 获取系统信息
  getMianSystemInfo() {
    // 获取系统信息
    let systemInfo = wx.getSystemInfoSync() || {
      model: '',
      system: ''
    };
    let rect;
    // 校验是否是ios手机 和 是否是iPhone X手机
    let ios = !!(systemInfo.system.toLowerCase().search('ios') + 1);
    let iosX = !!(systemInfo.model.toLowerCase().search('iphone x') + 1);
    try {
      // 获取右上角胶囊位置信息
      rect = wx.getMenuButtonBoundingClientRect ? wx.getMenuButtonBoundingClientRect() : null;
      if (rect === null) {
        throw 'getMenuButtonBoundingClientRect error';
      }
      //取值为0的情况  有可能width不为0 top为0的情况
      if (!rect.width || !rect.top || !rect.left || !rect.height) {
        throw 'getMenuButtonBoundingClientRect error';
      }
    } catch (error) {
      let gap = ''; //胶囊按钮上下间距 使导航内容居中
      let width = 96; //胶囊的宽度
      if (systemInfo.platform === 'android') {
        gap = 8;
        width = 96;
      } else if (systemInfo.platform === 'devtools') {
        if (ios) {
          gap = 5.5; //开发工具中ios手机
        } else {
          gap = 7.5; //开发工具中android和其他手机
        }
      } else {
        gap = 4;
        width = 88;
      }

      if (!systemInfo.statusBarHeight) {
        //开启wifi的情况下修复statusBarHeight值获取不到
        systemInfo.statusBarHeight = systemInfo.screenHeight - systemInfo.windowHeight - 20;
      }

      rect = {
        //获取不到胶囊信息就自定义重置一个
        bottom: systemInfo.statusBarHeight + gap + 32,
        height: 32,
        left: systemInfo.windowWidth - width - 10,
        right: systemInfo.windowWidth - 10,
        top: systemInfo.statusBarHeight + gap,
        width: width
      };
    }

    // 导航栏高度 
    let navBarHeight = '';

    if (!systemInfo.statusBarHeight) {

      systemInfo.statusBarHeight = 0;
      systemInfo.navBarExtendHeight = 0; //下方扩展4像素高度 防止下方边距太小

      //开启wifi和打电话下
      systemInfo.statusBarHeight = systemInfo.screenHeight - systemInfo.windowHeight - 20;
      navBarHeight = (function () {
        let gap = rect.top - systemInfo.statusBarHeight;
        return 2 * gap + rect.height;
      })();
    } else {
      if (ios && systemInfo.platform !== 'devtools') {
        systemInfo.navBarExtendHeight = 4; // 下方扩展4像素高度 防止下方边距太小
      } else {
        systemInfo.navBarExtendHeight = 0;
      }

      navBarHeight = (function () {
        let gap = rect.top - systemInfo.statusBarHeight;
        return systemInfo.statusBarHeight + 2 * gap + rect.height;
      })();
    }

    systemInfo.navBarHeight = navBarHeight + systemInfo.navBarExtendHeight; // 导航栏高度不包括statusBarHeight
    systemInfo.capsulePosition = rect; // 右上角胶囊按钮信息bottom: 58 height: 32 left: 317 right: 404 top: 26 width: 87
    systemInfo.ios = ios; // 是否ios
    systemInfo.iosX = iosX; // 是否iPhone X类型手机
    systemInfo.customTabbar = iosX ? 82 : 48; // iPhone X手机定义table高度
    this.globalData.globalSystemInfo = systemInfo // 将信息保存到全局变量中
    return systemInfo;
  },
}