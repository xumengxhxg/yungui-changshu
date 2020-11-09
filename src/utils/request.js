import axios from 'axios'
// import { MessageBox } from 'element-ui'
// import store from '@/store'
// import { getToken } from '@/utils/auth'
axios.defaults.withCredentials = true
// axios.defaults.crossDomain = true
var config=require('../../vue.config')
// console.log(config)
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// import config from "../../vue.config"
// console.log(import "../../vue.config")
// axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
// 创建axios实例
console.log(config.devServer.proxy)
const service ={
  axios:axios.create({
    // axios中请求配置有baseURL选项，表示请求URL公共部分
    // baseURL: HOST_URL,
    // baseURL: 'http://localhost:8080',
    // baseURL: 'http://119.3.10.67:8080',
    baseURL: process.env.VUE_APP_BASE_API ,
    // 超时
    timeout: 30000
  }),
  publicPath:process.env.VUE_APP_BASE_API
}
// const service = axios.create({
//   // axios中请求配置有baseURL选项，表示请求URL公共部分
//   // baseURL: HOST_URL,
// //   baseURL: process.env.VUE_APP_BASE_API,
//   baseURL: '/api',
//   // 超时
//   timeout: 30000
// })
// request拦截器
service.axios.interceptors.request.use(
  config => {
    if (localStorage.getItem('token')) {
      config.headers['Authorization'] = localStorage.getItem('token')
    }
    return config
  },
  error => {
    console.log(error)
    // Promise.reject(error)
  }
)
// 响应拦截器
service.axios.interceptors.response.use(res => {
  const code = res.data.code
  if(code===401) {
    localStorage.removeItem('token')
    this.$message({type: 'warning', message: '登录过期，请重新登录'})
    // window_warning('登录过期，请重新登录')
    window.location.reload()
    // return res.data
    // window_warning('登录过期，请重新登录').then(res=>{
    //   console.log(1245)
    // window.location.reload()
    // })
  }
  if (code !== 200) {
    // Notification.error({
    //   title: res.data.msg
    // })
    // return Promise.reject('error')
    return res.data
  } else {
    return res.data
  }
},
error => {
  // console.log('err' + error)
  // Message({
  //   message: error.message,
  //   type: 'error',
  //   duration: 5 * 1000
  // })
  // return Promise.reject(error)
  return error
}
)

export default service