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
  },

  /**
   * 组件的初始数据
   */
  data: {
    focus: false, // 获取焦点
    keyWord: "", // 搜索的关键字
  },

  lifetimes: {
    // 组件所在页面的生命周期函数
    attached: function () {
      setTimeout(() => {
        this.setData({
          keyWord: '',
          focus: true,
        })
      }, 150)
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 取消按钮
    _HanldeCancal() {
      wx.navigateBack({
        delta: 1
      })
    },
    // 搜索提交
    SearchConfirm() {
      const {
        keyWord
      } = this.data;
      this.triggerEvent('SearchConfirm', keyWord)
    },
    // 输入时候触发
    searchInput(e) {
      const keyWord = e.detail.value
      this.setData({
        keyWord,
      })
    },
    // 清空输入的值
    emptyCode() {
      setTimeout(() => {
        this.setData({
          keyWord: '',
          focus: true,
        })
        this.triggerEvent('EmptyCode', '')
      }, 150)
    },
  }
})