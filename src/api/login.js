import req from '../utils/request'
const  request=req.axios;

//登录
export function login(data) {
  return request({
      url: '/cloudcabinet/login',
      method: 'post',
      data: data
  })
}

// 获取用户信息
export function getInfo() {
  return request({
      url: '/cloudcabinet/getInfo',
      method: 'get'
  })
}

// 获取用户信息
export function checkWarning() {
  return request({
      url: '/cloudcabinet/earlyWarning/checkWarning',
      method: 'get'
  })
}
