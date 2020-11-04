import req from '../utils/request'
const  request=req.axios;

// 获取一周内取保候审人数
export function getSuspectByWeek(params) {
  return request({
      url: '/pendingjudge/suspect/getSuspectByWeek',
      method: 'get',
      params: params
  })
}

// 到期提醒
export function getReminder(params) {
  return request({
      url: '/pendingjudge/suspect/getReminder',
      method: 'get',
      params: params
  })
}

// 新增取保候审人数
export function getNewNum(data) {
  return request({
      url: '/pendingjudge/suspect/getNewNum',
      method: 'post',
      data: data
  })
}

// 获取取保候审总人数
export function getSuspectNum(params) {
  return request({
      url: '/pendingjudge/suspect/getSuspectNum',
      method: 'get',
      params: params
  })
}

// 智能报警次数
export function getWarnDetails(params) {
  return request({
      url: '/pendingjudge/suspect/getWarnDetails',
      method: 'get',
      params: params
  })
}

// 根据类型获取报警次数
export function getWarnTimes(params) {
  return request({
      url: '/pendingjudge/suspect/getWarnTimes',
      method: 'get',
      params: params
  })
}