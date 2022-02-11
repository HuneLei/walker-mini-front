import {
  performance
} from './minilog'

/**
 * 小程序测速上报
 */
class Renderer {
  constructor(pageContext) {
    this.totalTime = {}
  }
  // 获取开始时间
  getStartTime(id) {
    this.totalTime[id] = new Date().getTime();
  }

  // 上报时间
  getEndime(id) {
    if (!id || !this.totalTime[id]) return
    const startTime = this.totalTime[id];
    const endTime = new Date().getTime();
    performance(id, endTime - startTime)
  }
}
module.exports = Renderer