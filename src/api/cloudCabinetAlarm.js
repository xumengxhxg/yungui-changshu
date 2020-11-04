import req from '../utils/request'
const  request=req.axios;

export function getAll(data) { //获取预警列表
  return request({
      url: '/cloudcabinet/earlyWarning/getAll?pageSize='+data.pageSize+'&pageNum='+data.pageNum,
      method: 'post',
      data: data
  })
}

export function dealWarning(data,flag) { //批量处理预警
  return request({
      url: '/cloudcabinet/earlyWarning/dealWarning?flag='+flag +'&ids='+data,
      method: 'get',
  })
}

export function dealAllWarning(data) { //一键处理预警
    return request({
        url: '/cloudcabinet/earlyWarning/dealAllWarning',
        method: 'get',
        params:data
    })
  }

