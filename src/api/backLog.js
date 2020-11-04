import req from '../utils/request'
const  request=req.axios;

// 获取我的待办列表
export function getPersonApplicationList(data) {
  return request({
      url: '/pendingjudge/personApplication/getPersonApplicationList?pageSize='+data.pageSize+'&pageNum='+data.pageNum,
      method: 'post',
      data: data
  })
}

// 处理为保证人
export function dealGuarantee(data) {
  return request({
      url: '/pendingjudge/personApplication/dealGuarantee',
      method: 'post',
      data: data
  })
}

// 处理为嫌疑人
export function dealSuspect(data) {
  return request({
      url: '/pendingjudge/personApplication/dealSuspect',
      method: 'post',
      data: data
  })
}

// 忽略我的待办
export function ignoreData(ids) {
  return request({
      url: '/pendingjudge/personApplication/ignore?ids=' + ids,
      method: 'get'
  })
}