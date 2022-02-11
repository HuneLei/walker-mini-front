// components/TopSearch/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 描述文案
    searchTitle: {
      type: String,
      value: '请输入关键字搜索'
    },
    // 跳转地址
    url: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    _GoRelatedPage(e) {
      const {
        url
      } = e.currentTarget.dataset;
      if (url) {
        wx.navigateTo({
          url: `${url}`
        })
      }
    },
  }
})