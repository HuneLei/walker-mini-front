// 全局公共方法文件
module.exports = {
  // 拓展Promise
  expandFinally() {
    Promise.prototype.finally = function (callback) {
      let P = this.constructor;
      return this.then(
        value => P.resolve(callback()).then(() => value),
        reason => P.resolve(callback()).then(() => {
          throw reason
        })
      );
    };
  },
  // 根据网络的变化去状态页面
  goStartIndexPage() {
    setTimeout(() => {
      wx.redirectTo({
        url: "/pages/error/index"
      })
    }, 1000)
  },

  /**
   * 监听网络状态变化
   * 可根据业务需求进行调整
   */
  getNetworkStatusChange() {
    const that = this;
    wx.onNetworkStatusChange((res) => {
      if (!res.isConnected) {
        that.globalData.isConnected = false
        wx.showToast({
          title: '网络已断开',
          icon: 'loading',
          duration: 2000,
          complete: () => {
            // that.goStartIndexPage()
          }
        })
      } else {
        that.globalData.isConnected = true
        wx.hideToast()
      }
    });
  },


  // 检查新版本并且更新
  getUpdateManager() {
    // 检测新版本
    const updateManager = wx.getUpdateManager()
    updateManager.onUpdateReady(() => {
      // updateManager.applyUpdate()
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    });
    updateManager.onUpdateFailed(function () {
      // 新版本下载失败
      wx.showModal({
        showCancel: false,
        title: '更新提示',
        content: '新版本下载失败,请检查网络！',
      })
    })
  },

  // 给两个对象相同的值辅助
  objectAssignment(inObject, outObject) {
    Object.keys(inObject).forEach(m => {
      inObject[m] = outObject[m];
    })
    return inObject;
  },

  // 给两个对象的值是否都为""、null、undefined、[]
  checkObjectValue(obj) {
    //  判断传入参数的类型，以字符串的形式返回
    const dataType = (obj) => {
      if (obj === null) return "Null";
      if (obj === undefined) return "Undefined";
      return Object.prototype.toString.call(obj).slice(8, -1);
    };

    let param = {};
    if (obj === null || obj === undefined || obj === "") return false;
    for (var key in obj) {
      if (dataType(obj[key]) === "Object") {
        param[key] = checkObjectValue(obj[key]);
      } else if (obj[key] !== null && obj[key] !== undefined && obj[key] !== "" && JSON.stringify(obj[key]) !== '[]') {
        return true
      }
    }
    return false;
  },

  // 获取本地缓存数据
  getStorageSync(key) {
    return !key || config[key];
  },

  // 保存图片
  saveImage(url) {
    const _this = this;
    this.$toast().loading('保存中...');
    wx.downloadFile({
      url,
      success: function (res) {
        if (res.statusCode === 200) {
          let img = res.tempFilePath;
          wx.saveImageToPhotosAlbum({
            filePath: img,
            success(res) {
              setTimeout(() => {
                _this.$toast().success('已存入相册', false, 1500)
              }, 300)

            },
            fail(res) {
              setTimeout(() => {
                _this.$toast().error('保存失败', false, 1500)
              }, 300)
            }
          });
        }
      }
    });
  },

  // toast设置
  $toast() {
    return {
      // 加载
      loading(title = '加载中...', mask = false) {
        wx.showLoading({
          title,
          mask,
        })
      },
      // 成功
      success(title = '成功', mask = false, duration = 1000) {
        wx.showToast({
          title,
          mask,
          icon: 'success',
          duration,
        })
      },
      // 失败
      error(title = '失败', mask = false, duration = 1000) {
        wx.showToast({
          title,
          mask,
          icon: 'error',
          duration,
        })
      },
      // 不显示图标
      none(title = '不显示图标', mask = false, duration = 1000) {
        wx.showToast({
          title,
          mask,
          icon: 'none',
          duration,
        })
      },
      // 不显示图标
      hideLoading(duration = 150) {
        setTimeout(() => {
          wx.hideLoading()
        }, duration)
      },
    }
  },
}