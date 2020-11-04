import req from '../utils/request'
const  request=req.axios;

//获取预警tablelist查询
export function getWaringList(params) {
    return request({
        url: '/pendingjudge/earlyWarning/getWaringList?pageNum='+params.pageNum+'&pageSize='+params.pageSize,
        // url:'/pendingjudge/earlyWarning/getWaringList?pageNum=1&pageSize=5',
        method: 'post',
        data: params
    })
}

//删除预警
export function dealWarning(params) {
    return request({
        url: '/pendingjudge/earlyWarning/dealWarning',
        method: 'post',
        data: params
    })
}

//预警下拉菜单
export function getEarlyWaringDropdown(params) {
    return request({
        url: '/pendingjudge/earlyWarning/getEarlyWaringDropdown',
        method: 'post',
        data: params
    })
}

//一键处理
export function updateclickProcess(params) {
    return request({
        url: '/pendingjudge/earlyWarning/updateclickProcess',
        method: 'post',
        data: params
    })
}

