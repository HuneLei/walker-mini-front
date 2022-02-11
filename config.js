import {
  apiHost,
  apiConfig,
}
from './config/config.env.test.js'

import com_constants from './utils/services/constants';

let authorization = 'Basic cGlnOnBpZw==';

export {
  apiHost,
  apiConfig,
  authorization,
}


let TOKEN_NAME = 'db_token_' + com_constants.WX_TOKEN_NAME_ID;
let HOST_NAME = 'db_host_' + com_constants.WX_HOST_NAME_ID;
let WX_USERINFO_NAME_ID = 'db_user_' + com_constants.WX_USERINFO_NAME_ID;

// 设置 当前环境配置
export const setHost = {
  get: function () {
    return wx.getStorageSync(HOST_NAME);
  },

  set: function (host) {
    return wx.setStorageSync(HOST_NAME, host);
  },

  clear: function () {
    wx.removeStorageSync(HOST_NAME);
  },
};

// 设置 当前用户的token
export const setToken = {
  get: function () {
    return wx.getStorageSync(TOKEN_NAME);
  },

  set: function (token) {
    return wx.setStorageSync(TOKEN_NAME, token);
  },

  clear: function () {
    wx.removeStorageSync(TOKEN_NAME);
  },
};

// 设置 当前用户信息
export const setUserInfo = {
  get: function () {
    return wx.getStorageSync(WX_USERINFO_NAME_ID);
  },

  set: function (data) {
    return wx.setStorageSync(WX_USERINFO_NAME_ID, data);
  },

  clear: function () {
    wx.removeStorageSync(WX_USERINFO_NAME_ID);
  },
};

// // 获取 当前环境配置
export const getSetHost = function () {
  const host = setHost.get().host;
  const http = setHost.get().http;
  return host ? `${http}://${host}` : apiHost
};

// // 获取 当前环境配置
export const getHostConfig = function () {
  const config = setHost.get();
  return config || apiConfig
};