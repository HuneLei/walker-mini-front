// components/InputCom/index.js
Component({
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    // key值
    key: {
      type: String,
      value: '',
    },
    // 是否靠右显示
    right: {
      type: Boolean,
      value: true,
    },
    // input 的类型
    type: {
      type: String,
      value: 'text',
    },
    // 描述提示文字
    placeholder: {
      type: String,
      value: '请输入',
    },
    // 最大输入长度
    maxlength: {
      type: Number,
      value: 140,
    },
    // 默认值
    value: {
      type: Number,
      optionalTypes: [String, Number],
      observer: function(val) {
        this.setData({
          keyWord: val,
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    focus: false, // 获取焦点
    keyWord: "", // 搜索的关键字
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 输入时候触发
    importInput(e) {
      const keyWord = e.detail.value
      this.setData({
        keyWord,
      });
      const {
        key
      } = this.data;
      this.triggerEvent('ImportInput', {
        key,
        value: keyWord,
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
        const {
          key
        } = this.data;
        this.triggerEvent('ImportInput', {
          key,
          value: '',
        })
      }, 150)
    },
  }
})