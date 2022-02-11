// components/DialogModal/index.js
Component({
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: '标题'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isShow: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 打开弹出框
    open() {
      this.setData({
        isShow: true,
      })
    },
    // 关闭弹出框
    _closeDialog() {
      this.setData({
        isShow: false,
      })
    },

    // 防止冒泡
    _mycatchtap() {
      return
    },

    // 阻止滚动
    _myCatchTouch() {
      return;
    },
  }
})