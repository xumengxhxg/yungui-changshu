import req from '../utils/request'
const  request=req.axios;

//操作
export function operloglist(data) { //获取操作日志
  return request({
      url: '/cloudcabinet/operlog/list',
      method: 'get',
      params: data
  })
}


export function operlogclean(data) { //清空操作日志
  return request({
      url: '/cloudcabinet/operlog/clean',
      method: 'get',
      params:data
  })
}

//登录
export function loginloglist(data) { //获取登录日志
    return request({
        url: '/cloudcabinet/loginlog/list',
        method: 'get',
        params: data
    })
  }
  
  
  export function loginlogclean(data) { //清空操作日志
    return request({
        url: '/cloudcabinet/loginlog/clean',
        method: 'get',
        params:data
    })
  }
  

