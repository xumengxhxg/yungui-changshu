import req from '../utils/request'
const  request=req.axios;

// 获取柜面信息
export function getCounterInfo(params) {
  return request({
      url: '/cloudcabinet/inventoryInfo/getCounterInfo',
      method: 'get',
      params: params
  })
}

// 事故搜索
export function getAccidentList(data) {
  return request({
      url: '/cloudcabinet/accidentInfo/getAccidentList',
      method: 'post',
      data: data
  })
}

// 案件搜索
export function getCaseList(data) {
  return request({
      url: '/cloudcabinet/caseInfo/getCaseList',
      method: 'post',
      data: data
  })
}
export function getCaseList2(data) {
  return request({
      url: '/cloudcabinet/inventoryInfo/getCaseList?pageSize='+data.pageSize+'&pageNum='+data.pageNum,
      method: 'post',
      data: data
  })
}
// 登记
export function checkIn(data) {
  return request({
      url: '/cloudcabinet/inventoryInfo/checkIn',
      method: 'post',
      data: data
  })
}

// 流转过程
export function circulationList(params) {
  return request({
      url: '/cloudcabinet/inventoryInfo/circulationList',
      method: 'get',
      params: params
  })
}

// 获取柜体详情
export function getCabinetDetail(params) {
  return request({
      url: '/cloudcabinet/inventoryInfo/getCabinetDetail',
      method: 'get',
      params: params
  })
}

// 获取柜体使用空间
export function getCabinetSpace(params) {
  return request({
      url: '/cloudcabinet/inventoryInfo/getCabinetSpace',
      method: 'get',
      params: params
  })
}

// 云柜存放趋势
export function getCabinetStorage(params) {
  return request({
      url: '/cloudcabinet/inventoryInfo/getCabinetStorage',
      method: 'get',
      params: params
  })
}

// 最新入柜物品
export function getLatestInCabinet(params) {
  return request({
      url: '/cloudcabinet/inventoryInfo/getLatestInCabinet',
      method: 'get',
      params: params
  })
}

// 入库管理-涉案财物查询
export function getProperty(data) {
  return request({
      url: '/cloudcabinet/inventoryInfo/getProperty',
      method: 'post',
      data: data
  })
}

// 登记/入库数量统计
export function getRegisterCountByTime(params) {
  return request({
      url: '/cloudcabinet/inventoryInfo/getRegisterCountByTime',
      method: 'get',
      params: params
  })
}

// 生物检材查询/查看详情
export function queryProperty(params,data) {
  return request({
      url: '/cloudcabinet/inventoryInfo/queryProperty',
      method: 'post',
      params: params,
      data: data
  })
}

// 移除登记
export function removeCheck(ids) {
  return request({
      url: '/cloudcabinet/inventoryInfo/removeCheck?ids=' + ids,
      method: 'get'
  })
}

// 取出
export function takeOut(params) {
  return request({
      url: '/cloudcabinet/inventoryInfo/takeOut',
      method: 'get',
      params: params
  })
}

// 待存列表
export function toBeStoredList(params) {
  return request({
      url: '/cloudcabinet/inventoryInfo/toBeStoredList',
      method: 'get',
      params: params
  })
}

// 出库登记
export function updateItemsStatus(data) {
  return request({
      url: '/cloudcabinet/inventoryInfo/updateItemsStatus',
      method: 'post',
      data: data
  })
}

// 出库登记
// export function updateItemsStatus(params) {
//   return request({
//       url: '/cloudcabinet/inventoryInfo/updateStoreStatus',
//       method: 'get',
//       params: params
//   })
// }

// 存取日志
export function getRecordList(params, data) {
  return request({
      url: '/cloudcabinet/accessRecord/getRecordList',
      method: 'post',
      data: data,
      params: params
  })
}

// 案件查询 查看详情
export function queryFiles(data) {
  return request({
      url: '/cloudcabinet/inventoryInfo/queryFiles?pageSize='+data.pageSize+'&pageNum='+data.pageNum,
      method: 'post',
      data: data
  })
}

// 打印条形码
export function achieveBarcode(data) {
  return request({
      url: '/cloudcabinet/office/achieveBarcode',
      method: 'get',
      params: data,
      responseType:'blob'
  })
}

export function achieveBarcode2(data) {
  return request({
      url: '/cloudcabinet/office/achieveBarcode2',
      method: 'get',
      params: data,
      responseType:'blob'
  })
}
// 盘点管理
export function inventoryManagement(data) {
  return request({
      url: '/cloudcabinet/inventoryInfo/inventoryManagement',
      method: 'post',
      data: data
  })
}

// 盘点管理数量
export function inventoryManagementCount(data) {
  return request({
      url: '/cloudcabinet/inventoryInfo/inventoryManagementCount',
      method: 'post',
      data: data
  })
}

// 盘点管理导出
export function inventoryManagementExport(data) {
  return request({
      url: '/cloudcabinet/inventoryInfo/export',
      method: 'post',
      data: data,
      responseType:'blob'
  })
}

// 全部移除
export function removeAllPropertyCheck(id) {
  return request({
      url: '/cloudcabinet/inventoryInfo/removeAllPropertyCheck?inventoryId=' + id,
      method: 'get'
  })
}

// 单个移除
export function removeSinglePropertyCheck(id) {
  return request({
      url: '/cloudcabinet/inventoryInfo/removeSinglePropertyCheck?inventoryAttacheId=' + id,
      method: 'get'
  })
}

// /cloudcabinet/inventoryInfo/haveStoredList
export function haveStoredList(data) {
  return request({
      url: '/cloudcabinet/inventoryInfo/haveStoredList',
      method: 'post',
      data: data
  })
}

export function getPropertyCountByTime() {
  return request({
      url: '/cloudcabinet/inventoryInfo/getPropertyCountByTime',
      method: 'get'
  })
}

export function getPropertyDetail(params) {
  return request({
      url: '/cloudcabinet/inventoryAttache/getPropertyDetail',
      method: 'get',
      params: params
  })
}

export function getTemperature() {
  return request({
      url: '/cloudcabinet/baseSet/getTemperature',
      method: 'get'
  })
}

// 
export function getPersonalItemList(data, params) {
  return request({
      url: '/cloudcabinet/inventoryInfo/getPersonalItemList',
      method: 'post',
      data: data,
      params: params
  })
}


export function updateSuspect(data) {
  return request({
      url: '/cloudcabinet/inventoryInfo/updateSuspect',
      method: 'post',
      data: data
  })
}


export function removeAllPropertyCheckNew(params) {
  return request({
      url: '/cloudcabinet/inventoryInfo/removeAllPropertyCheckNew',
      method: 'get',
      params: params
  })
}

// 随身物品移除登记
export function removePersonalItemCheck(id) {
  return request({
      url: '/cloudcabinet/inventoryInfo/removePersonalItemCheck?ids=' + id,
      method: 'get'
  })
}
export function removePersonalItemCheck2(id) {
  return request({
      url: '/cloudcabinet/inventoryInfo/removeAllPropertyCheckNew?inventoryId=' + id,
      method: 'get'
  })
}
// 新增随身物品
export function addPersonalItem(data) {
  return request({
      url: '/cloudcabinet/inventoryInfo/addPersonalItem',
      method: 'post',
      data: data
  })
}

export function getStoreName(params) {
  return request({
      url: '/cloudcabinet/inventoryInfo/getStoreName',
      method: 'get',
      params: params
  })
}