import config from './config.js';

// 方法混入
import mx_merge from './utils/mixins/mx-merge.js'

// 对方法数据分开处理
import app_mian from './config/app.mian.js'
import app_public from './config/app.public.js'
import app_global from './config/app.global.js'

const minidebug = require('./utils/services/minidebug.js');

new minidebug().init()

const r = {
  originalApp: App,
  originalPage: Page,
};

Page = (options) => {
  let mixins = options.mixins
  mixins = [...mixins || []]
  // mixin
  if (Array.isArray(mixins)) {
    delete options.mixins
    // mixins 注入并执行相应逻辑
    options = mx_merge(mixins, options)
  }
  // 释放原生 Page 函数
  r.originalPage(options)
}

App({
  onLaunch: function (options) {
    const _this = this;
    _this.getMianSystemInfo(); // 获取系统信息
    _this.getUpdateManager(); // 检查新版本并且更新
    _this.expandFinally(); // 拓展Promise 
  },

  // 刚刚进来的时候保存所传参数
  onShow() {},

  // 关闭小程序的时候将场景上报mta
  onHide() {},

  ...app_global,
  ...app_mian,
  ...app_public,
})