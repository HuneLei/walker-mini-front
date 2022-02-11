// components/FrameShow/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 默认提示文案
    placeholder: {
      type: String,
      value: '请选择',
    },
    // 内容
    content: {
      type: String,
      value: '',
    },
    // 文本标题
    label: {
      type: String,
      value: '标题',
    },
    // 是否展示右方文案
    isPit: {
      type: Boolean,
      value: false,
    },
    // 是否带箭头
    arrows: {
      type: Boolean,
      value: false,
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