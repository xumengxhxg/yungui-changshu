import req from '../utils/request'
const  request=req.axios;


// 分析研判
export function analysisJudgment() {
  return request({
      url: '/cloudcabinet/accidentInfo/analysisJudgment',
      method: 'get'
  })
}