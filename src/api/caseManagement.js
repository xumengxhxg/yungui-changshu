import req from '../utils/request'
const  request=req.axios;

export function getCaseList(data) { //获取事故案件列表
  return request({
      url: '/cloudcabinet/caseInfo/getCaseList?pageSize='+data.pageSize+'&pageNum='+data.pageNum,
      method: 'post',
      data: data
  })
}

// export function deleteAccident(data) { //批量删除事故
//   return request({
//       url: '/cloudcabinet/accidentInfo/deleteAccident?ids='+data,
//       method: 'get',
//   })
// }

// export function getCaseDetail(data) { //获取案件详情
//     console.log(111)
//     return request({
//         url: '/cloudcabinet/caseInfo/getCaseDetail',
//         method: 'get',
//         params:data
//     })
//   }

// export function updateAccident(data) { //事故修改
//     return request({
//         url: '/cloudcabinet/accidentInfo/updateAccident',
//         method: 'post',
//         data:data
//     })
// }

// export function addAccident(data) { //事故添加
//     return request({
//         url: '/cloudcabinet/accidentInfo/addAccident',
//         method: 'post',
//         data:data
//     })
// }

export function updateCase(data) { //案件修改
    return request({
        url: '/cloudcabinet/caseInfo/updateCase',
        method: 'post',
        data:data
    })
}

export function addCase(data) { //案件添加
    return request({
        url: '/cloudcabinet/caseInfo/addCase',
        method: 'post',
        data:data
    })
}

export function deleteCase(data) { //批量删除事故
    return request({
        url: '/cloudcabinet/caseInfo/deleteCase?ids='+data,
        method: 'get',
    })
  }
  