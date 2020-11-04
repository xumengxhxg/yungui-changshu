import req from '../utils/request'
const  request=req.axios;

//首页云柜趋势对比图
export function getCabinetContrastGraphical(data) {
  return request({
      url: '/cloudcabinet/inventoryInfo/getCabinetContrastGraphical',
      method: 'get',
      params: data
  })
}


