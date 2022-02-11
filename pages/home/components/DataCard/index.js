// pages/home/DataCard/index.js
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
      value: '',
    },
    // 是否显示去重切换
    isSwitch: {
      type: Boolean,
      value: false,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    switchChecked: true,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击提示
    _HanldeHint() {
      this.triggerEvent('HanldeHint')
    },
    // 是否去重切换的时候
    _SwitchChange(e) {
      const {
        value
      } = e.detail;
      this.setData({
        switchChecked: value,
      })
    }
  }
})