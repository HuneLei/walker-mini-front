// 定义小程序内置的属性/方法
const originProperties = ['data', 'properties', 'options']
const originMethods = ['onLoad', 'onReady', 'onShow', 'onHide', 'onUnload', 'onPullDownRefresh', 'onReachBottom', 'onShareAppMessage', 'onPageScroll', 'onTabItemTap']

module.exports = (mixins, options) => {
  mixins.forEach((mixin) => {
    if (Object.prototype.toString.call(mixin) !== '[object Object]') {
      throw new Error('mixin 类型必须为对象！')
    }
    // 遍历 mixin 里面的所有属性
    let mixinLth = Object.keys(mixin).length;
    for (let i = 0; i < mixinLth; i++) {
      let key = Object.keys(mixin)[i];
      let value = mixin[key];
      if (isInArray(originProperties, key)) {
        // 内置对象属性混入
        options[key] = {
          ...value,
          ...options[key]
        }
      } else if (isInArray(originMethods, key)) {
        // 内置方法属性混入，优先执行混入的部分
        const originFunc = options[key]
        options[key] = function (...args) {
          options = {
            ...value.call(this, ...args),
            ...originFunc && originFunc.call(this, ...args)
          }
          return options
        }
      } else {
        // 自定义方法混入
        options = {
          ...mixin,
          ...options
        }
      }
    }
  })
  return options
}

/**
 * 使用indexOf判断元素是否存在于数组中
 * @param {Object} arr 数组
 * @param {Object} value 元素值
 */
function isInArray(arr, value) {
  if (arr.indexOf && typeof (arr.indexOf) == 'function') {
    var index = arr.indexOf(value);
    if (index >= 0) {
      return true;
    }
  }
  return false;
}