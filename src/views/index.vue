<template>
<el-container class="container">
  <el-header class="header" style="display: flex;justify-content:space-between;">
    <span class="public_c" style="padding:0;">
      <img src="../assets/images/police.jpg" alt="" style="height:55px;width:60px;vertical-align:middle">
      物联网智能云柜管理平台
    </span>
    <span style="color: #fff;" >
      <span  class="public_c ">
        <router-link class="public_c header_a" to="/frontDesk"  >
            切换到前端系统
        </router-link>
        <span class="public_c">
          <el-badge :is-dot="badgevalue" class="item" style="display: inline;">
              <i class="el-icon-message-solid " style="color: #fff;font-size: 20px;" @click="gowarning()"></i>
          </el-badge>
        </span>
      </span>
      <span class="public_center">

      </span>
      <span>
        <img :src="head_portrait" style="height: 50px;line-height: 50px;width: 50px;border-radius: 50%;margin: 5px 15px 0 ;" alt="">
        <span class="public_c">
          <span v-text="username" style="color: #fff;font-size: 16px;"></span>
        </span>
        <span class="public_c">
          <span style="color: #fff;font-size: 16px;"></span>
          <span v-text="belongingTo" style="color: #fff;font-size: 16px;"></span>
        </span>
        <span class="public_c">
          <i class="el-icon-switch-button" @click="loginOut()"></i>
        </span>
      </span>
    </span>
  </el-header>
  <el-container>
    <el-aside width="200px" class="aside">
      <div class="text-left">
        <el-menu
          unique-opened
          :default-active="activeName"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffffff"
          router>
          <el-menu-item index="indexHome" @click="toPage('indexHome')">
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item index="caseManagement" @click="toPage('caseManagement')">
            <span slot="title">事项管理</span>
          </el-menu-item>
          <!-- <el-submenu index="#0">
            <template slot="title" style="height: 45px; line-height: 45px">
              <span>生物检材柜管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="warehousingManagement" @click="toPage('warehousingManagement')">入库管理</el-menu-item>
              <el-menu-item index="inStockManagement" @click="toPage('inStockManagement')">在库管理</el-menu-item>
              <el-menu-item index="inventoryManagement" @click="toPage('inventoryManagement')">盘点管理</el-menu-item>
              <el-menu-item index="biologicalMaterialQuery" @click="toPage('biologicalMaterialQuery')">生物检材查询</el-menu-item>
              <el-menu-item index="inspectionCabinet" @click="toPage('inspectionCabinet')">检材柜</el-menu-item>
              <el-menu-item index="accessLog" @click="toPage('accessLog')">存取日志</el-menu-item>
            </el-menu-item-group>
          </el-submenu> -->
          <el-submenu index="#1">
            <template slot="title">
              <span>涉案财物柜管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="involvedWarehousingManagement" @click="toPage('involvedWarehousingManagement')">入库登记</el-menu-item>
              <el-menu-item index="involvedInStockManagement" @click="toPage('involvedInStockManagement')">在库管理</el-menu-item>
              <el-menu-item index="involvedOutboundRegistration" @click="toPage('involvedOutboundRegistration')">出库登记</el-menu-item>
              <el-menu-item index="involvedPropertyInquiry" @click="toPage('involvedPropertyInquiry')">涉案财物查询</el-menu-item>
              <el-menu-item index="involvedPropertyCabinet" @click="toPage('involvedPropertyCabinet')">涉案财物柜</el-menu-item>
              <el-menu-item index="involvedAccessLog" @click="toPage('involvedAccessLog')">存取日志</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="#2">
            <template slot="title">
              <span>案卷柜管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="fileWarehousingManagement" @click="toPage('fileWarehousingManagement')">入库管理</el-menu-item>
              <el-menu-item index="fileinStockManagement" @click="toPage('fileinStockManagement')">在库管理</el-menu-item>
              <el-menu-item index="fileInquiry" @click="toPage('fileInquiry')">案卷查询</el-menu-item>
              <el-menu-item index="fileCabinetOfTheRecord" @click="toPage('fileCabinetOfTheRecord')">案卷柜</el-menu-item>
              <el-menu-item index="fileAccessLog" @click="toPage('fileAccessLog')">存取日志</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="#4">
            <template slot="title">
              <span>预警管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="cloudCabinetAlarm" @click="toPage('cloudCabinetAlarm')">云柜报警</el-menu-item>
              <el-menu-item index="serviceAlarm" @click="toPage('serviceAlarm')">业务报警</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!-- <el-menu-item index="earlyWarningManagement" @click="toPage('earlyWarningManagement')">
            <span slot="title">预警管理</span>
          </el-menu-item> -->
          <el-menu-item index="analysisAndJudgment" @click="toPage('analysisAndJudgment')">
            <span slot="title">分析研判</span>
          </el-menu-item>
          <el-menu-item index="userManagement" @click="toPage('userManagement')">
            <span slot="title">权限管理</span>
          </el-menu-item>
          <el-submenu index="#3">
            <template slot="title">
              <span>日志管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="systemSecurityLog" @click="toPage('systemSecurityLog')">系统安全日志</el-menu-item>
              <el-menu-item index="systemOperationLog" @click="toPage('systemOperationLog')">系统操作日志</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="systemSettings" @click="toPage('systemSettings')">
            <span slot="title">系统设置</span>
          </el-menu-item>
        </el-menu>
        
      </div>
    </el-aside>
    <el-main class="main">
      <!-- <keep-alive> -->
        <router-view></router-view>
      <!-- </keep-alive> -->
    </el-main>
  </el-container>
</el-container>
</template>
<script>
import { getInfo,checkWarning } from '@/api/login'
export default {
  data () {
    return {
      badgevalue:false,//消息条数
      head_portrait:require('../assets/img/user.png'),//用户头像
      username:'小刀',
      belongingTo:'',
      activeName: '',
      monitorCount:0,
      pendingCount:0
    }
  },
  mounted() {
    localStorage.setItem('page', 'back');
    setTimeout(()=>{
    this.initUserInfo()
    },200)
    this.activeName = this.$route.name;
    checkWarning().then(res=>{
      if(res.result){
         this.badgevalue=Boolean(res.data);
      }else{
        window_warning(res.msg)
      }
    }).catch()
  },
  methods: {
    gowarning(){
        this.$router.push({name: 'cloudCabinetAlarm'})
    },
    toPage(val) {
      // this.$router.push('/qbhs/' + val)
      this.$router.push('/' + val)
    },
    loginOut(){
      this.$confirm('确认退出当前系统吗?', '提示',{
            type: 'warning'
        }).then((res)=>{
          localStorage.removeItem('token')
          this.$router.push({name: 'login'})
        }).catch()
    },
    initUserInfo(){
      getInfo().then(res=>{
           this.username=res.user.userName;
           this.belongingTo=res.user.deptName;
           this.head_portrait=res.user.avatar?res.user.avatar:require('../assets/img/user.png')
      }).catch()
      // getNoDealWarn().then(res=>{
      //   this.badgevalue=Boolean(res.monitorCount+res.pendingCount);
      //   this.monitorCount=res.monitorCount;
      //   this.pendingCount=res.pendingCount
      // }).catch()
    }
  },
  watch: {
    $route() {
      // this.activeName = this.$route.name
    }
  }
}
</script>
<style scoped>
.container {
  height: 100%;
}
.header {
  height: 60px;
  line-height: 60px;
  text-align: left;
  background: #3a5ea6;
  color: #fff;
  font-size: 20px;
  background: url(../assets/img/header-bg.png) no-repeat;
}
.aside  {
  background: #202A33;
  color: #fff;
  /* opacity: 0.6; */
  /* box-shadow: -5px 2px 25px #999; */
}
.el-submenu{
  background: #31404C;
}
.el-menu-item{
  background: #31404C;
  color: #fff;
}
 .el-menu-item:hover{
  opacity: 0.5;
  color: #000000;
 }
.home {
  height: 100%;
  width: 100%;
}
.text-left {
  text-align: left;
}
.public_c{
  display: inline-block;
  height: 60px;
  line-height: 60px;
  vertical-align: top;
  margin-right: 15px;
}
.public_center{
  display: inline-block;
  height: 50px;
  line-height: 50px;
  width: 1px;
  background-color: #fff;
  vertical-align: top;
  margin-top: 5px;
}
.header_a{
  line-height:40px;
  height:40px;
  margin-top:10px;
  text-decoration:none;
  color: #fff;
  font-size: 14px;
  background: rgba(255, 255, 255,0.5);
  width: 150px;
  border-radius: 20px;
  text-align: center;
}
.el-menu-item.is-active {
   background-color: #1890ff !important;
   color: #ffffff;
}
</style>
