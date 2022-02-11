// 员工二维码
import api from '../index';

const path = {
  fetchList: '/app/contact/list', // 分页查询员工二维码
  fetchHanlde: '/app/contact', // 操作员工二维码
};

// 分页查询员工二维码
export const fetchList = (query) => api.get(path.fetchList, query)

// 获取员工二维码信息
export const getObj = (id) => api.get(`${path.fetchHanlde}/${id}`)

// 删除二维码配置
export const deleteObj = (id) => api.delete(`${path.fetchHanlde}/${id}`)

// 增加员工二维码
export const addObj = (data) => api.post(path.fetchHanlde, data)

// 编辑二维码配置
export const putObj = (data) => api.put(path.fetchHanlde, data)
