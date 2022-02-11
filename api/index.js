/**
 * api 初始化文件
 */
import api from './base';

import {
  apiHost
} from '../config'

export default api.setOption({
  baseUrl: apiHost, //  接口的基础地址配置
  params: {
    // 基础参数，即每次调用都要传的参
    // access_token: config.getToken()
  },
});