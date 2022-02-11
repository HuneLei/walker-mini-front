// components/FilterCom/index.js
Component({
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    // 跳转地址
    url: {
      type: String,
      value: ''
    },
    // 是否改变筛选切换
    isfilter: {
      type: Boolean,
      value: false
    },
    // 数量
    amount: {
      type: Number,
      optionalTypes: [String, Number],
      value: 0,
    },
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