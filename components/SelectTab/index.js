// components/SelectTab/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // tab栏目
    tabList: {
      type: Array,
      value: [],
    },
    // 默认选中
    default: {
      type: Number,
      value: 0,
      observer: function (newVal, oldVal) {
        this.setData({
          selectTab: newVal,
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    selectTab: 0, // 选中的tab栏
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 选择tab栏切换
    handleSelectTab(e) {
      const {
        index
      } = e.currentTarget.dataset;
      const { tabList } = this.data;
      this.setData({
        selectTab: index,
      })
      this.triggerEvent('SelectTab', tabList[index]);
    }
  }
})