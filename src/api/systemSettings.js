import req from '../utils/request'
const  request=req.axios;

//登录
export function getBaseSet(data) { //获取基础设置
  return request({
      url: '/cloudcabinet/baseSet/getBaseSet',
      method: 'get',
      params: data
  })
}

// 获取用户信息
export function updateBaseSet(data) { //更新基础设置
  return request({
      url: '/cloudcabinet/baseSet/updateBaseSet',
      method: 'post',
      data:data
  })
}

