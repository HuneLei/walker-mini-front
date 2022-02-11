// pages/home/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hintList: [{
      title: '历史累计',
      content: '截止至昨日24点，与团队成员（包含我）互为好友的客户总数',
    }, {
      title: '申请加客',
      content: '昨日0点到24点之间，团队成员（包含我）发送过加好友申请的客户数量',
    }, {
      title: '新增',
      content: '昨日0点到24点之间，新增加的与团队成员（包含我）互为好友的客户数',
    }, {
      title: '流失',
      content: '昨日0点到24点之间，删除或拉黑团队成员（包含我）的客户数',
    }, {
      title: '去重',
      content: '多个团队成员对同一个客户产生的数据，以客户角度去重',
    }],
    dataList: [{
      time: '2020-01-21',
      title: '开年基金持续走下跌趋势，竟然是牛市反弹操作',
    }, {
      time: '2021-01-21',
      title: '2022年将持续牛市冲破最高点',
    }, {
      time: '2022-01-21',
      title: '2022年将持续牛市冲破最高点冲破最高点',
    }, {
      time: '2020-12-21',
      title: '2022年将持续牛市冲破最高点',
    }],
    selectTab: 0,
    tabList: [{
      id: 1,
      name: '今日早报'
    }, {
      id: 2,
      name: '突发热点'
    }],
    navOpacity: 0,
    switchList: [{
      id: 1,
      name: '我的'
    }, {
      id: 2,
      name: '团队'
    }],
    functionList: [{
      type: 'qrcode',
      name: '员工二维码',
    }, {
      type: 'message',
      name: '已发资讯',
    }, {
      type: 'packet',
      name: '红包裂变',
    }, {
      type: 'fund',
      name: '工作任务',
    }]
  },

  // 点击去到相关的页面
  GoRelatedPage(e) {
    const {
      url
    } = e.currentTarget.dataset;
    if (url) {
      wx.navigateTo({
        url: `${url}`
      })
    }
  },

  // 页面滚动时候触发
  onPageScroll(e) {
    const _this = this;
    let {
      scrollTop
    } = e;
    let navOpacity = 0;
    let maxDistance = 60;
    navOpacity = parseFloat(scrollTop / maxDistance).toFixed(2);
    if (navOpacity >= 1) {
      navOpacity = 1;
    }
    if (navOpacity <= 0.1) {
      navOpacity = 0;
    }
    // 这里设置<100是减少setData次数，节省内存
    if ((scrollTop < 100 && this.data.navOpacity != navOpacity) || (navOpacity == 1 && this.data.navOpacity != 1)) {
      _this.setData({
        navOpacity,
      })
    }
  },

  // 点击问号提示
  HanldeHint() {
    const child = this.selectComponent('.dialog-modal-message');
    child.open();
  },

  // 选择tab栏切换
  handleSelectTab(e) {
    const {
      index
    } = e.currentTarget.dataset;
    this.setData({
      selectTab: index,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})