// components/CutItem/index.js
Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    // 是否显示必输符号
    required: {
      type: Boolean,
      value: false,
    },
    // 默认提示文案
    placeholder: {
      type: String,
      value: '请选择',
    },
    solid: {
      type: Boolean,
      value: false,
    },
    // 标题
    label: {
      type: String,
      value: '标题'
    },
    // 标题样式
    labelClass: {
      type: String,
      value: '',
    },
    // 内容
    content: {
      type: String,
      value: ''
    },
    // 内容样式
    contentClass: {
      type: String,
      value: '',
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
