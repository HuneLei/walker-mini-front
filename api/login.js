/**
 * 登录 api
 */

import api from './index';
import {
  authorization
} from '../config';

const path = {
  tokenCheck: '/app/token/check',
  gainToken: '/auth/oauth/token',
};

// 检查token是否有效
export const tokenCheck = () => api.get(path.tokenCheck);

// 增加欢迎语
export const gainToken = (data) => api.get(path.gainToken, data, {
  headers: {
    'Authorization': authorization,
  }
});