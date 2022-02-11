// components/ErrorCom/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 图片路径
    src: {
      type: String,
      value: '/assets/images/error/empty_data.png'
    },
    // 提示文案
    hint: {
      type: String,
      value: '暂无搜索结果'
    },
    // 状态类型
    type: {
      type: String,
      value: 'result'
    },
    // 加载中提示文案
    loadHint: {
      type: String,
      value: '加载中...'
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

  }
})