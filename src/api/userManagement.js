import req from '../utils/request'
const  request=req.axios;

export function addUserInfo(data) { //新增警员
  return request({
      url: '/cloudcabinet/userInfo/addUserInfo',
      method: 'post',
      data: data
  })
}

export function batchDeleteUser(data) { //删除警员
  return request({
      url: '/cloudcabinet/userInfo/batchDeleteUser',
      method: 'post',
      data:data
  })
}

export function deleteUserAttacheInfo(data) { //删除用户绑定信息
  return request({
      url: '/cloudcabinet/userInfo/deleteUserAttacheInfo',
      method: 'get',
      params:data
  })
}

export function getPoliceDetail(data) { //获取用户详情
  return request({
      url: '/cloudcabinet/userInfo/getPoliceDetail',
      method: 'get',
      params:data
  })
}

export function getUserInfo(data) { //获取用户分页信息
  return request({
      url: '/cloudcabinet/userInfo/getUserInfo?pageSize='+data.pageSize+'&pageNum='+data.pageNum,
      method: 'post',
      data:data
  })
}

export function importData(data) { //导入警员
  return request({
      url: '/cloudcabinet/userInfo/importData',
      method: 'post',
      data:data
  })
}

export function updateBasicUserInfo(data) { //修改用户基本信息
  return request({
      url: '/cloudcabinet/userInfo/updateBasicUserInfo',
      method: 'post',
      data:data
  })
}

export function updateUserAttacheInfo(data) { //修改用户绑定信息
  return request({
      url: '/cloudcabinet/userInfo/updateUserAttacheInfo',
      method: 'post',
      data:data
  })
}

export function updateUserPermits(data) { //修改用户绑定信息
  return request({
      url: '/cloudcabinet/userInfo/updateUserPermits',
      method: 'post',
      data:data
  })
}

export function downloadExcel(data) { //下载模板
  return request({
      url: '/cloudcabinet/userInfo/download',
      method: 'get',
      // data:data
  })
}

