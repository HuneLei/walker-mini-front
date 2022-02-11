// pages/home/SwitchBox/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    switchList: {
      type: Array,
      value: [],
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    switchChecked: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _SwitchChange() {
      const { switchChecked } = this.data;
      this.setData({
        switchChecked: switchChecked == 0 ? 1 : 0,
      })
    },
  }
})
