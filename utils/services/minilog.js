import {
  VERSION
} from '../../config/app.config' // 业务代码版本号

// minilog.js
const canIUseLogManage = wx.canIUse("getLogManager"); // 版本检测
const logger = canIUseLogManage ? wx.getLogManager({
  level: 0
}) : null; // 日志管理器
var realtimeLogger = wx.getRealtimeLogManager ? wx.getRealtimeLogManager() : null; // 实时日志

const reportPerformance = wx.canIUse("reportPerformance"); // 测速上报

/**
 * @param {Number} id 监控ID
 * @param  {Number} val 需要上报的数值
 */

export function performance(id, val) {
  if (reportPerformance) {
    wx.reportPerformance(id, val)
  }
}

/**
 * @param {string} file 所在文件名
 * @param  {...any} arg 参数
 */

export function DEBUG(file, ...args) {
  if (canIUseLogManage) {
    logger.debug(`[${VERSION}]`, file, " | ", ...args);
  }
  realtimeLogger && realtimeLogger.debug(`[${VERSION}]`, file, " | ", ...args);
}

/**
 * @param {string} file 所在文件名
 * @param  {...any} arg 参数
 */

export function WARN(file, ...args) {
  if (canIUseLogManage) {
    logger.warn(`[${VERSION}]`, file, " | ", ...args);
  }
  realtimeLogger && realtimeLogger.warn(`[${VERSION}]`, file, " | ", ...args);
}

/**
 *
 * @param {string} file 所在文件名
 * @param  {...any} arg 参数
 */
export function INFO(file, ...args) {
  if (canIUseLogManage) {
    logger.info(`[${VERSION}]`, file, " | ", ...args);
  }
  realtimeLogger && realtimeLogger.info(`[${VERSION}]`, file, " | ", ...args);
}

/**
 *
 * @param {string} file 所在文件名
 * @param  {...any} arg 参数
 */
export function ERROR(file, ...args) {
  wx.reportMonitor('0', 1)
  console.error(file, " | ", ...args);
  if (canIUseLogManage) {
    logger.warn(`[${VERSION}]`, file, " | ", ...args);
  }
  if (realtimeLogger) {
    realtimeLogger.error(`[${VERSION}]`, file, " | ", ...args);
    // 判断是否支持设置模糊搜索
    // 错误的信息可记录到 FilterMsg，方便搜索定位
    if (realtimeLogger.addFilterMsg) {
      try {
        realtimeLogger.addFilterMsg(
          `[${VERSION}] ${file} ${JSON.stringify(args)}`
        );
      } catch (e) {
        realtimeLogger.addFilterMsg(`[${VERSION}] ${file}`);
      }
    }
  }
}

// 方便将页面名字自动打印
export function getLogger(fileName = '') {
  return {
    DEBUG: function (...args) {
      DEBUG(fileName, ...args);
    },
    INFO: function (...args) {
      INFO(fileName, ...args);
    },
    ERROR: function (...args) {
      ERROR(fileName, ...args);
    }
  };
}