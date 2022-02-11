const app = getApp();
Component({
  /**
   * 组件的一些选项
   */
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  /**
   * 组件的对外属性
   */
  properties: {
    // 背景颜色
    bgColor: {
      type: String,
      default: ''
    },
    isCustom: {
      type: Boolean,
      optionalTypes: [Boolean, Number],
      default: false
    },
    // 是否带返回按钮
    isBack: {
      type: Boolean,
      optionalTypes: [Boolean, Number],
      default: false
    },
    // 背景图片
    bgImage: {
      type: String,
      default: ''
    },
    // 导航标题
    title: {
      type: String,
      value: '',
    },
    // 是否自定义导航栏
    isCustom: {
      type: Boolean,
      optionalTypes: [Boolean, Number],
      default: false
    },
  },
  /**
   * 组件的初始数据
   */
  data: {
    StatusBar: app.globalData.globalSystemInfo.statusBarHeight,
    CustomBar: app.globalData.globalSystemInfo.navBarHeight,
    Custom: app.globalData.globalSystemInfo.capsulePosition
  },

  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () {
      this.setData({
        StatusBar: app.globalData.globalSystemInfo.statusBarHeight,
        CustomBar: app.globalData.globalSystemInfo.navBarHeight,
        Custom: app.globalData.globalSystemInfo.capsulePosition
      })
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 返回
    BackPage() {
      this.triggerEvent('NavBackPage')
    },
    // 关闭
    ClosePage() {
      wx.navigateBack({
        delta: 1
      });
    },
  }
})