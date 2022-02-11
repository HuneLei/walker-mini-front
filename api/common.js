/**
 * 首页 api
 */

import api from './index';

const path = {
  fetchCityList: '/app/common/list/city', // 城市下拉框
  fetchAllTag: '/app/common/allTag', // 标签列表
  fetchDeptTree: '/app/common/getUserDept', // 用户部门树
};

// 用户部门树
export const fetchDeptTree = (id) => api.get(`${path.fetchDeptTree}/${id}`)

// 标签列表
export const fetchAllTag = () => api.get(path.fetchAllTag)

// 城市下拉框
export const fetchCityList = () => api.get(path.fetchCityList)