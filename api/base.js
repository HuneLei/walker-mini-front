import {
  setToken,
  getSetHost
} from '../config'

import errorCode from './errorCode'

import constants from '../utils/services/constants';

/**
 * 封装微信 wx.request 方法，方便项目开发
 * get
 * post
 */

const apiFun = () => {};
const methods = ['GET', 'POST', 'PUT', 'DELETE'];

apiFun.prototype = {
  baseUrl: '',
  params: {},
  /**
   * 初始化api的基础参数
   * @type {*} Object
   * @param {*} baseUrl 基础路径，相当于接口地址
   * @param {*} params 基础参数，即每次调用都要传的参
   */
  setOption(data) {
    this.baseUrl = data.baseUrl || '';
    this.params = data.params || {};
    this.request = data.request || undefined;
    this.response = data.response || undefined;
    // 循环设置请求方式
    this.initMethods();
    return this;
  },

  // 循环设置请求方式
  initMethods() {
    methods.forEach(key => {
      this[key.toLowerCase()] = (path, data = {}, params = {}) => {
        return this.use(key, path, data, params);
      }
    });
  },

  /**
   * use方法请求
   * @param {*} path 接口地址
   * @param {*} data 参数
   */

  use(method, path, data = {}, params = {}) {
    let headers = params.headers || {};
    let reqparams = dealObjectValue(params);
    const header = {};
    header[constants.WX_HEADER_TOKEN] = `Bearer ${setToken.get()}`;
    // header[constants.WX_HEADER_TOKEN] = 'Bearer dc32f673-d0ed-4d01-90ad-42a1d3c8cabf';
    Object.assign(header, headers);
    let baseUrl = getSetHost();
    return new Promise((resolve, reject) => {
      wx.request({
        method,
        header,
        url: urlParams(`${baseUrl}${path}`, {
          ...reqparams,
        }),
        data,
        success(res) {
          console.log('data', res.data);
          const {
            statusCode
          } = res;
          const message = res.data.msg || errorCode[statusCode] || errorCode["default"];
          if (statusCode === 424) {
            setToken.clear();
            wx.reLaunch({
              url: "/pages/index/index"
            })
            return reject(message);
          }
          if (statusCode !== 200 || res.data.code === 1) {
            wx.showModal({
              title: '提示',
              showCancel: false,
              content: message,
              confirmColor: '#2E7DFF'
            })
            return reject(message);
          }
          return resolve(res);
        },
        fail(error) {
          reject(error);
        },
      })
    })
  }
}

/**
 *  判断传入参数的类型，以字符串的形式返回
 *  @obj：数据
 **/
const dataType = (obj) => {
  if (obj === null) return "Null";
  if (obj === undefined) return "Undefined";
  return Object.prototype.toString.call(obj).slice(8, -1);
};

/**
 * 处理对象参数值，排除对象参数值为""、null、undefined，并返回一个新对象
 **/
const dealObjectValue = (obj) => {
  let param = {};
  if (obj === null || obj === undefined || obj === "") return param;
  for (var key in obj) {
    if (dataType(obj[key]) === "Object") {
      param[key] = dealObjectValue(obj[key]);
    } else if (obj[key] !== null && obj[key] !== undefined && obj[key] !== "") {
      param[key] = obj[key];
    }
  }
  return param;
};

const urlParams = (url, params) => {
  let ret = decodeURIComponent(url);
  let retUrl = ret.match(/(.*)\?(.*)/);
  let urlParamsHave = '';
  if (retUrl && retUrl.length > 0) {
    ret = retUrl[1];
    urlParamsHave = retUrl[2] || '';
  }
  const arr = urlParamsHave.split('&');
  let data = {};
  if (arr && arr.length) {
    for (let i = 0; i < arr.length; i += 1) {
      const item = arr[i];
      if (item) {
        const itemArr = item.split('=');
        data[itemArr[0]] = itemArr[1];
      }
    }
  }

  data = {
    ...data,
    ...params,
  };

  if (data && typeof data === 'object') {
    const keys = Object.keys(data);
    if (keys && keys.length) {
      ret += '?';
      for (let i = 0; i < keys.length; i += 1) {
        const key = keys[i];
        if (data[key] != null) {
          ret += `${i === 0 ? '' : '&'}${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`;
        }
      }
    }
  }
  return ret;
}

const api = new apiFun();
module.exports = api;