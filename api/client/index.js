// 客户
import api from '../index';

const path = {
  fetchList: '/app/customer/list', // 分页查询客户列表
  fetchHanlde: '/app/customer', // 操作客户信息
};

// 分页查询客户列表
export const fetchList = (query) => api.post(path.fetchList, query)

// 获取客户信息
export const getObj = (id) => api.get(`${path.fetchHanlde}/${id}`)

// 操作客户信息
export const putObj = (data) => api.put(path.fetchHanlde, data)