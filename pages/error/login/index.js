const app = getApp()

const resultType = {
  'no_install': {
    'title': '登录失败',
    'subTitle': '请重试，如无法解决，请联系公司管理人员',
    isLogin: true,
  },
  'no_thing': {
    'title': '暂时无法使用产品',
    'subTitle': '请联系公司管理人员了解情况',
    isLogin: false,
  },
  'no_wxwork': {
    'title': '暂时无法使用产品',
    'subTitle': '请使用企业微信打开此小程序',
    isLogin: true,
  }
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    resultObj: {}, // 登录失败原因类型
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {
      code
    } = options;
    let resultObj = {};
    switch (code) {
      case 'no_install':
        resultObj = resultType['no_install'];
        break;
      case 'no_wxwork':
        resultObj = resultType['no_wxwork'];
        break;
      default:
        resultObj = resultType['no_thing'];
        break;
    }
    this.setData({
      resultObj
    })
  },

  // 重新登录按钮
  GoLoginButton() {
    app.$toast().loading('加载中...', true);
    app.initLoadLogin().then(() => {
      wx.hideLoading();
      wx.switchTab({
        url: '/pages/home/index'
      })
    }).catch(() => {
      setTimeout(() => {
        app.$toast().error('登录失败', true);
      }, 300)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
})