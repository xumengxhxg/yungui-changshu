import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/index.vue'
import login from '../views/login.vue'
import indexHome from '../views/indexHome.vue'
import caseManagement from '@/views/caseManagement'
import warehousingManagement from '@/views/warehousingManagement'
import inStockManagement from '@/views/inStockManagement'
import inventoryManagement from '@/views/inventoryManagement'
import biologicalMaterialQuery from '@/views/biologicalMaterialQuery'
import inspectionCabinet from '@/views/inspectionCabinet'
import accessLog from '@/views/accessLog'
import involvedWarehousingManagement from '@/views/involvedWarehousingManagement'
import involvedInStockManagement from '@/views/involvedInStockManagement'
import involvedOutboundRegistration from '@/views/involvedOutboundRegistration'
import involvedPropertyInquiry from '@/views/involvedPropertyInquiry'
import involvedPropertyCabinet from '@/views/involvedPropertyCabinet'
import involvedAccessLog from '@/views/involvedAccessLog'
import fileWarehousingManagement from '@/views/fileWarehousingManagement'
import fileinStockManagement from '@/views/fileinStockManagement'
import fileInquiry from '@/views/fileInquiry'
import fileCabinetOfTheRecord from '@/views/fileCabinetOfTheRecord'
import fileAccessLog from '@/views/fileAccessLog'
import cloudCabinetAlarm from '@/views/cloudCabinetAlarm'
import serviceAlarm from '@/views/serviceAlarm'
import analysisAndJudgment from '@/views/analysisAndJudgment'
import userManagement from '@/views/userManagement'
import policeManagement from '@/views/policeManagement'
import systemSecurityLog from '@/views/systemSecurityLog'
import systemOperationLog from '@/views/systemOperationLog'
import systemSettings from '@/views/systemSettings'

import searchDetail from '@/components/biologicalManagement/searchDetail'
import cabinetDetail from '@/components/biologicalManagement/cabinetDetail'
import takeOutPicture from '@/components/involvedPropertyManagement/takeOutPicture'
import searchPropertyDetail from '@/components/involvedPropertyManagement/searchDetail'
import propertyCabinetDetail from '@/components/involvedPropertyManagement/cabinetDetail'
import searchFileDetail from '@/components/fileManagement/searchDetail'
import fileCabinetDetail from '@/components/fileManagement/cabinetDetail'

import frontDesk from '@/views/frontDesk'
import unfound from '@/views/404'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  }, {
    path: '/login',
    component: login
  }, 
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: 'indexHome',
        name: 'indexHome',
        component: indexHome
      },
      {
        path: 'caseManagement',
        name: 'caseManagement',
        component: caseManagement
      },{
        path: 'warehousingManagement',
        name: 'warehousingManagement',
        component: warehousingManagement
      },{
        path: 'searchDetail',
        name: 'searchDetail',
        component: searchDetail
      },{
        path: 'cabinetDetail',
        name: 'cabinetDetail',
        component: cabinetDetail
      },{
        path: 'inStockManagement',
        name: 'inStockManagement',
        component: inStockManagement
      },{
        path: 'inventoryManagement',
        name: 'inventoryManagement',
        component: inventoryManagement
      },{
        path: 'biologicalMaterialQuery',
        name: 'biologicalMaterialQuery',
        component: biologicalMaterialQuery
      },{
        path: 'inspectionCabinet',
        name: 'inspectionCabinet',
        component: inspectionCabinet
      },{
        path: 'accessLog',
        name: 'accessLog',
        component: accessLog
      },{
        path: 'takeOutPicture',
        name: 'takeOutPicture',
        component: takeOutPicture
      },{
        path: 'searchPropertyDetail',
        name: 'searchPropertyDetail',
        component: searchPropertyDetail
      },{
        path: 'propertyCabinetDetail',
        name: 'propertyCabinetDetail',
        component: propertyCabinetDetail
      },{
        path: 'involvedWarehousingManagement',
        name: 'involvedWarehousingManagement',
        component: involvedWarehousingManagement
      },{
        path: 'involvedInStockManagement',
        name: 'involvedInStockManagement',
        component: involvedInStockManagement
      },{
        path: 'involvedOutboundRegistration',
        name: 'involvedOutboundRegistration',
        component: involvedOutboundRegistration
      },{
        path: 'involvedPropertyInquiry',
        name: 'involvedPropertyInquiry',
        component: involvedPropertyInquiry
      },{
        path: 'involvedPropertyCabinet',
        name: 'involvedPropertyCabinet',
        component: involvedPropertyCabinet
      },{
        path: 'involvedAccessLog',
        name: 'involvedAccessLog',
        component: involvedAccessLog
      },{
        path: 'searchFileDetail',
        name: 'searchFileDetail',
        component: searchFileDetail
      },{
        path: 'fileCabinetDetail',
        name: 'fileCabinetDetail',
        component: fileCabinetDetail
      },{
        path: 'fileWarehousingManagement',
        name: 'fileWarehousingManagement',
        component: fileWarehousingManagement
      },{
        path: 'fileinStockManagement',
        name: 'fileinStockManagement',
        component: fileinStockManagement
      },{
        path: 'fileInquiry',
        name: 'fileInquiry',
        component: fileInquiry
      },{
        path: 'fileCabinetOfTheRecord',
        name: 'fileCabinetOfTheRecord',
        component: fileCabinetOfTheRecord
      },{
        path: 'fileAccessLog',
        name: 'fileAccessLog',
        component: fileAccessLog
      },{
        path: 'cloudCabinetAlarm',
        name: 'cloudCabinetAlarm',
        component: cloudCabinetAlarm
      },{
        path: 'serviceAlarm',
        name: 'serviceAlarm',
        component: serviceAlarm
      },{
        path: 'analysisAndJudgment',
        name: 'analysisAndJudgment',
        component: analysisAndJudgment
      },{
        path: 'userManagement',
        name: 'userManagement',
        component: userManagement
      },{
        path: 'policeManagement',
        name: 'policeManagement',
        component: policeManagement
      },{
        path: 'systemSecurityLog',
        name: 'systemSecurityLog',
        component: systemSecurityLog
      },{
        path: 'systemOperationLog',
        name: 'systemOperationLog',
        component: systemOperationLog
      },{
        path: 'systemSettings',
        name: 'systemSettings',
        component: systemSettings
      }

    ]
  }, {
    path: '/frontDesk',
    name: 'frontDesk',
    component: frontDesk,
  }, 
  // {
  //   path: '/unfound',
  //   name: 'unfound',
  //   component: unfound
  // },
  {
    path: '*',
    name: 'unfound',
    // meta: {
    //   hideInMenu: true
    // },
    component: unfound
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  // base: '/qbhs/',
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  let isLogin = localStorage.getItem('token');
  if (isLogin) {
    //如果用户信息存在则往下执行。
    next()
  } else {
    //如果用户token不存在则跳转到login页面
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  } 
})

// 路由重复问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
