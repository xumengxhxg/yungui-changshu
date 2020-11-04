import req from '../utils/request'
const  request=req.axios;


export function getLatestInCabinet(data) { //最新入柜物品
  return request({
      url: '/cloudcabinet/inventoryInfo/getLatestInCabinet',
      method: 'get',
      params: data
  })
}


export function getCabinetSpace(data) {
  return request({
      url: '/cloudcabinet/inventoryInfo/getCabinetSpace',
      method: 'get',
      params:data
  })
}

// 云柜存放趋势
export function getCabinetStorage(data) {
  return request({
      url: '/cloudcabinet/inventoryInfo/getCabinetStorage',
      method: 'get',
      params:data
  })
}

// 云柜存放趋势
export function getCabinetStatus(data) {
    return request({
        url: '/cloudcabinet/earlyWarning/getCabinetStatus',
        method: 'get',
        params:data
    })
  }
  
