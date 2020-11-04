<!-- 前端-取保候审 -->
<template>
  <div class="container" >
    <div class="container-inner">
     <div class="header">物联网智能云柜管理平台</div>
     <div class="container-main">
       <el-row :gutter="10" style="height: 100%">
         <el-col :span="7" style="height: 100%">
           <div class='content-container'>
             <div >
               <div class="content-container-header">
                 <div style="width:25%"></div>
                  <div style="width:48%;text-align:center;color:#1A7DA2">
                    最新入柜物品
                  </div>
                  <div style="width:27%;text-align:right;padding-right:8px" >
                    <el-select v-model="inventoryItems" @change="init_Inventory_itemsdata()" placeholder="请选择" size="small" style="margin-top:-10%;opacity:0.5;width:112px">
                      <el-option
                        v-for="item in cabinet_Arr"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
               </div>
               <div class="content-container-body">
                 <!-- 无缝滚动开始 -->
                 <div class="ph20 pb20">
                    <el-row class="head" style="height:5%;text-align:center">
                      <el-col :span="3" >编号</el-col>
                      <el-col :span="7" v-text="inventoryItems===0?'人员编号':(inventoryItems===1?'案件名称':'物品名称')"></el-col>
                      <el-col :span="7" v-text="inventoryItems===0?'查获中队':(inventoryItems===1?'案件编号':'物品编号')">人员姓名</el-col>
                      <el-col :span="7" >柜门</el-col>
                    </el-row>
                    <vue-seamless-scroll :data="areaInOnOutInfos"   class="seamless-warp" style="height:94%;overflow:hidden;color:#fff">
                      <ul v-if="areaInOnOutInfos && areaInOnOutInfos.length" style="padding:0">
                        <li v-for="(item, index) in areaInOnOutInfos" :key='index'>
                          <el-row>
                            <el-col :span="3" style="text-align:center">
                              {{index + 1}}
                            </el-col>
                            <el-col :span="7" style="text-align:center;overflow:hidden;">
                              <div class="ellipsis" style="width: 100%;">
                              {{inventoryItems===0?(item.suspectName?item.suspectName:"——"):(inventoryItems===1?(item.caseName):(item.itemName))}}
                              </div>
                            </el-col>
                            <el-col :span="7" style="text-align:center;overflow:hidden;">
                              {{inventoryItems===0?(item.discoverDept?(item.discoverDept.length>6?item.discoverDept.slice(0,5)+'..':item.discoverDept.slice(0,5)+'..'):"——"):(inventoryItems===1?(item.caseNo?item.caseNo:"——"):(item.itemNo?item.itemNo:"——"))}}
                            </el-col>
                            <el-col :span="7" style="text-align:center">
                              {{item.doorNo}}
                            </el-col>
                          </el-row>
                        </li>
                      </ul>
                      <div class="ph20 pb20 no-data mt20" v-else>
                          <ol style="text-align:center;">暂无数据</ol>
                      </div>
                    </vue-seamless-scroll>
                  </div>
                  <!-- 无缝滚动结束 -->
               </div>
             </div>
           </div>
           <!-- 使用空间开始 -->
           <div class='content-container'>
             <div>
               <div class="content-container-header">
                 <div style="width:25%"></div>
                  <div style="width:48%;text-align:center;color:#1A7DA2">
                    使用空间
                  </div>
                  <div style="width:27%;text-align:right;padding-right:8px">
                    <el-select v-model="Use_space" @change="initUse_space_All()" placeholder="请选择" size="small" style="margin-top:-10%;opacity:0.5;width:112px">
                      <el-option
                        v-for="item in cabinet_Arr"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
               </div>
               <div class="content-container-body">
                 <div style="height:98%;overflow:hidden;">
                       <div style="height:50%;width:70%;margin-left:15%" id="ring_echarts">
                       </div>
                       <div style="height:48%;width:100%;" id="column_echarts"></div>
                    </div>
                 
               </div>

             </div>
           </div>
         </el-col>

         <!-- 中间部分 -->
         <el-col :span='10' style="height: 100%">
           <div class='content-container-2'>
             <div>
                <div class="content-container-header" style="height:10%;">
                  <div style="width:25%;vertical-align: top;"></div>
                  <div style="width:50%;text-align:center;color:#1A7DA2;vertical-align: top;">
                    云柜存放趋势
                  </div>
                  <div style="width:25%;vertical-align: top;text-align:right;padding-right:8px">
                    <el-select v-model="storage_trend" @change="initstorage_trenddata()" placeholder="请选择" size="small" style="margin-top:-10%;opacity:0.5;width:112px;">
                      <el-option
                        v-for="item in cabinet_Arr"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
               </div>
               <div class="content-container-body" style="height:80%;" id="storage_trend">
               </div>
             </div>
           </div>

           <div class='content-container-3'>
             <div>
               <div class="content-container-header" style="height:10%;padding-top: 0%;">
                  <div style="width:25%;vertical-align: top;"></div>
                  <div style="width:50%;text-align:center;color:#1A7DA2;vertical-align: top;">
                    云柜存放情况
                  </div>
                  <div style="width:25%;vertical-align: top;">
                  </div>
               </div>
               <div class="content-container-body storage_case" style="height:70%;color:#FFFF20;font-size:160%;font-weight:700;" id="storage_case">
                 <div>{{Storage_arr[0]}}</div>
                 <div>{{Storage_arr[1]}}</div>
                 <div>{{Storage_arr[2]}}</div>
               </div>
               <div class="content-container-body" style="height:15%;padding: 0% 2% ;color:#FFF;font-size:120%;" id="storage_case">
                 <div>生物检材柜</div>
                 <div>案卷柜</div>
                 <div>涉案财物柜</div>
               </div>
             </div>
           </div>
         </el-col>

         <!-- 中间部分结束 -->

         <el-col :span="7" style="height: 100%">
           <div class='content-container'>
             <div>
                <div class="content-container-header" style="height:10%;">
                  <div style="width:25%;vertical-align: top;"></div>
                  <div style="width:50%;text-align:center;color:#1A7DA2;vertical-align: top;">
                    云柜状态监测
                  </div>
                  <div style="width:25%;vertical-align: top;">
                  </div>
               </div>
               <div class="content-container-body" style="height:80%;position:relative;color:#fff" id="condition_monitoring">
                 <div style="position:absolute;height:60%;width:40%;left:8%;top:4%;" class="case_sheck" :class="{'warningLight':Condition_monitoringArr[1]?Condition_monitoringArr[1]:false}">
                     <div style="text-align:center;height:20%;margin-top:40%" >
                         <span style="height:15px;width:15px;border-radius:50%;display:inline-block;vertical-align: top;" :style="{ backgroundColor:Condition_monitoringArr[1]?'red':'green'}"></span>
                        案卷柜
                     </div>
                 </div>
                 <div>
                   <div style="position:absolute;height:60%;width:40%;right:8%;top:4%" class="case_sheck" :class="{'warningLight':Condition_monitoringArr[0]?Condition_monitoringArr[0]:false}">
                     <div style="text-align:center;height:20%;margin-top:40%">
                         <span style="height:15px;width:15px;border-radius:50%;display:inline-block;vertical-align: top;" :style="{ backgroundColor:Condition_monitoringArr[0]?'red':'green'}"></span>
                        生物检材柜
                     </div>
                 </div>
                 </div>
                 <div>
                   <div style="position:absolute;height:60%;width:40%;left:24%;bottom:4%" class="case_sheck" :class="{'warningLight':Condition_monitoringArr[2]?Condition_monitoringArr[2]:false}">
                     <div style="text-align:center;height:20%;margin-top:40%"  >
                         <span style="height:15px;width:15px;border-radius:50%;display:inline-block;vertical-align: top;" :style="{ backgroundColor:Condition_monitoringArr[2]?'red':'green'}"></span>
                        涉案财物柜
                     </div>
                 </div>
                 </div>
               </div>
             </div>
           </div>
           <div class='content-container'>
             <div>
               <div class="content-container-header">
                 <div style="width:25%"></div>
                  <div style="width:50%;text-align:center;color:#1A7DA2">
                    云柜管理
                  </div>
                  <div style="width:25%">
                    
                  </div>
               </div>
               <div class="content-container-body" id="Cloud_cabinet_management">
                  <div style="color:#fff;font-weight:600;height:60%;margin:12% 10%;display:flex;justify-content:space-around;">
                     <div  style="width:20%;height:100%;" @click="go_cabinet(0)">
                        <div  style="height:70%;" class="rotateclass"></div>
                        <div  style="text-align:center">
                          生物检材柜
                        </div>
                     </div>
                     <div  style="width:20%;height:100%;" @click="go_cabinet(1)">
                       <div  style="height:70%;" class="rotateclass"></div>
                        <div  style="text-align:center">
                          案卷柜
                        </div>
                     </div>
                     <div  style="width:20%;height:100%;" @click="go_cabinet(2)">
                       <div  style="height:70%;" class="rotateclass"></div>
                        <div  style="text-align:center">
                          涉案财物柜
                        </div>
                     </div>
                  </div>
               </div>
             </div>
           </div>
         </el-col>
       </el-row>
      </div>
      <div class="footer">
        <div style="padding:0% 1%" class="div_all">
           <div class="detail" style="margin-right:20px;border:0;background-color:transparent">
              <img src="@/assets/public_img/arrows.png" style="width: 30px;height:100%" alt="">
           </div>
           <div class="detail" @click="go_back()">
             <i class="el-icon-house"></i>
             后台
           </div>
           <div class="detail" style="font-size: 80%;margin-left:1%;padding:10px;">
             <div>当前时间</div>
             <div style="font-size:160%">{{index_time}}</div>
           </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import echarts from 'echarts'
import { checkWarning } from '@/api/login'
import { getLatestInCabinet ,getCabinetSpace,getCabinetStorage,getCabinetStatus} from '@/api/frontDesk'
import { formatDate4 } from '@/utils/global'
export default {
  data () {
    return {
      inventoryItems:0,//最新物品入柜，柜子种类
      Use_space:0,//使用空间
      storage_trend:0,//使用趋势
     cabinet_Arr:[{
       value:0,
       label:'生物检材柜'
     },{
       value:1,
       label:'案卷柜'
     },{
       value:2,
       label:'涉案财物柜'
     }],
     areaInOnOutInfos:[],
     index_time:'',//当前时间
     time:'',//时间间隔函数
     Use_space_Arr1:[
                    {value: 0, name: '未使用'},
                    {value: 0, name: '已使用'},
                  ],
      Condition_monitoringArr:[],//监测情况数组
      Storage_arr:[],//储存情况
    }
  },
  created() {
  },
  beforeDestroy() {
    clearInterval(this.time)
  },
  mounted() {
     this.initdata();
     this.time=setInterval(()=>{
       this.index_time=formatDate4(new Date())
     },1000)
     checkWarning().then(res=>{
      if(res.result){
         this.badgevalue=Boolean(res.data);
      }else{
        window_warning(res.msg)
      }
    }).catch()
   this.initCondition_monitoring()

  },
  methods: {
     gowarning(){
        this.$router.push({name: 'cloudCabinetAlarm'})
    },
    go_cabinet(num){
      if(num===0){
          this.$router.push({name: 'warehousingManagement'})
      }else if(num===1){
          this.$router.push({name: 'fileWarehousingManagement'})
      }else{
          this.$router.push({name: 'involvedWarehousingManagement'})
      }
    },
    initCondition_monitoring(){
       getCabinetStatus().then(res=>{
          if(res.result){
            this.Condition_monitoringArr=res.data
          }
       }).catch()
    },
    initdata(){
      this.init_Inventory_itemsdata();//获取最新入柜物品
      this.initUse_space_All();//获取全部使用空间数据
      this.initstorage_trenddata()
    },
    init_Inventory_itemsdata(){ //最新入柜物品
      var data={
        pageNum:1,
        pageSize:20,
        cabinetType:this.inventoryItems
      }
      getLatestInCabinet(data).then(res=>{
        if(res.result){
          this.areaInOnOutInfos=res.rows
        }else{
         window_warning(res.msg)
        }
      }).catch()
    },
    initUse_space_All(){ //获取全部使用空间数据
      var data={
        cabinetType:this.Use_space
      }
      getCabinetSpace(data).then(res=>{
        if(res.result){
          this.Use_space_Arr1[1].value= res.data[this.Use_space].num
          this.Use_space_Arr1[0].value=res.data[this.Use_space].total- res.data[this.Use_space].num
          this.initUse_space1(this.Use_space_Arr1)
          var arr=[];
          res.data.forEach(item=>{
            arr.push(item.num)
          })
          this.Storage_arr=arr
          this.initUse_space2(arr)
        }else{
         window_warning(res.msg)
        }
      }).catch()
    },
    initstorage_trenddata(){
      var data={
        cabinetType:this.storage_trend
      }
      getCabinetStorage(data).then(res=>{
        if(res.result){
          var arr_legend=[];
          var str=0;
          arr_legend.push(str);
          var data_x=[];
          var data_y=[];
          if(res.data.length>0){
            res.data.forEach(item=>{
             data_x.push(item.date);
             data_y.push(item.value);
             str+=item.value
            })
          }
          this.init_storage_trend(str,arr_legend,data_x,data_y,res.total,this.cabinet_Arr[this.storage_trend].label)
        }else{
         window_warning(res.msg)
        }
      }).catch()
    },
    initUse_space1(data_arr){ //使用空间1
        var myChart = echarts.init(document.getElementById('ring_echarts'));
        // 指定图表的配置项和数据
        var option = {
            color: ['#1890FF','#FACC14'],
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            legend: {
                orient: 'vertical',
                left: 10,
                data: ['未使用', '已使用'],
                show: false
            },
            series: [
                {
                    name: '使用空间',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: false,
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: data_arr
                }
            ]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);

    },
    initUse_space2(data_arr2){//使用空间2
         var myChart_1 = echarts.init(document.getElementById('column_echarts'));
        // 指定图表的配置项和数据
        var option_1 = {
            color: ['#3398DB'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                top :0,
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'value',
                    minInterval: 1,
                    axisLabel: {
                      show: true,
                        textStyle: {
                          color: '#ffffff',  //更改坐标轴文字颜色
                        }
                    },
                }
            ],
            yAxis: [
                {
                    type: 'category',
                    data: ['生物检材柜', '案卷柜', '涉案财物柜'],
                    axisTick: {
                        alignWithLabel: true,
                    },
                    axisLabel: {
                      show: true,
                        textStyle: {
                          color: '#ffffff',  //更改坐标轴文字颜色
                        }
                    },
                }
            ],
            series: [
                {
                    name: '',
                    type: 'bar',
                    barWidth: '10',
                    data: data_arr2
                }
            ]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart_1.setOption(option_1);
    },
    // 存放趋势
    init_storage_trend(str,arr_legend,data_x,data_y,total,label){
        var myChart = echarts.init(document.getElementById('storage_trend'));
        // 指定图表的配置项和数据
        var option = {
          title: {
              text: '共计'+str,
              textStyle: {
                    color: '#ffffff',  //更改坐标轴文字颜色
                  }
          },
          tooltip: {
              trigger: 'axis'
          },
          legend: {
              data: arr_legend,
              
          },
          grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
          },
          toolbox: {
              feature: {
                  // saveAsImage: {}
              }
          },
          xAxis: {
              type: 'category',
              boundaryGap: false,
              data: data_x,
              axisLabel: {
                interval:0,  
                rotate:60,  
                show: true,
                textStyle: {
                  color: '#ffffff',  //更改坐标轴文字颜色
                }
              }
          },
          yAxis: {
              type: 'value',
              minInterval: 1,
              axisLabel: {
                show: true,
                  textStyle: {
                    color: '#ffffff',  //更改坐标轴文字颜色
                  }
              },
              splitLine:{
                 show:false
             }
          },
          series: [
              {
                  name: label,
                  type: 'line',
                  stack: '总量',
                  data: data_y,
                  smooth: true
              }
          ]
      };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    },
    go_back(){
          this.$router.push({name: 'indexHome'})
    },
    loginOut(){
      
    },
    goEarlyWarning(val){
      
    },
    initUserInfo(){
      
    },
    getTime() {
     
    },

  },

}

</script>

<style lang='less' scoped>
*{
  box-sizing: border-box;
}
.header {
  background: url('../assets/img/front_header.png');
  height: 8%;
  background-size: 100% 100%;
  font-size: 200%;
  font-weight: 700;
  color: #fff;
  padding-top: 1%;
  text-align: center;
  letter-spacing: 10px;
}
.container {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  /* background: url(../assets/img/init.jpg); */
  background: url(../assets/img/bg1.png) no-repeat;
  background-size: 100% 100%;
}
.container-inner {
  height: 100% !important;
}
.container-main{
  height: 84%;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  // margin: 1%;
  // padding: 1%;
}
.content-container {
  width: 100%;
  height: 50%;
  padding: 5px;
  box-sizing: border-box;
}
.content-container>div {
    // background: #2d5790;
    background: url(../assets/img/云柜首页1.png) no-repeat;
  background-size: 100% 100%;
    width: 100%;
    height: 100%;
  }

.content-container-header{
  box-sizing: border-box;
  padding-top: 2%;
  height:10%;
  // background-color: #fff;
  overflow: hidden;
  div{
    display: inline-block;
  }
}
.content-container-body{
  height:90%;
  // background-color: #fff;
  padding: 1%;
  overflow: hidden;
  .head{
    color:#fff
  }
}
.no-data {
  color: #ffffff;
  text-align: center;
}
.content-container-2 {
  width: 100%;
  height: 58%;
  padding: 5px 0px;
  margin-bottom: 2%;
  box-sizing: border-box;
  background: url(../assets/img/云柜首页1.png) no-repeat;
  background-size: 100% 100%;
  div {
    // background: #2d5790;
    width: 100%;
    height: 100%;
  }
}
.content-container-3 {
  width: 100%;
  height: 40%;
  padding: 5px 0px;
  box-sizing: border-box;
  background: url(../assets/img/云柜首页1.png) no-repeat;
  background-size: 100% 100%;
  div {
    // background: #2d5790;
    width: 100%;
    height: 100%;
  }
}
.footer {
  width: 100%;
  height: 8%;
  padding: 0px 10px;
  box-sizing: border-box;
  .div_all {
    // background: #2d5790;
    width: 100%;
    height: 100%;
    .detail{
      display: inline-block;
      height:80%;
      color: #fff;
      font-size: 140%;
      padding: 0.5%;
      vertical-align: top;
      border: 2px solid #00ACF5;
      background-color: #042D6B;
      // line-height: 100%;
    }
  }
}
ul{
  padding: 0;
  text-align: center;
}
ul>li{
  height:40px;
  line-height: 40px;
}
.seamless-warp ul>li:nth-child(even){
  background-color: aqua;
}
#storage_case{
  padding: 5% 2% 0%;
  display: flex;
  justify-content:space-around;
  div{
    display: inline-block;
    height: 100%;
    text-align: center;
    line-height: 100%;
    width: 25%;
    // background-color: green;
  };
}
.bgc_green{
  background-color: green;
}
.storage_case>div{
  box-sizing: border-box;
  background: url(../assets/public_img/图片Copy2.png) no-repeat;
  background-size: 100% 100%;
  padding-top: 11%;
}
.case_sheck{
  background: url(../assets/public_img/图片2.png) no-repeat;
  background-size: 100% 100%;
}
#Cloud_cabinet_management{
  height: 90%;
  background: url(../assets/img/guizibg.png) no-repeat;
  background-size: 100% 100%;
}
.warningLight{
     
      animation: showAlerm 1s infinite;
    }
@keyframes showAlerm{
  0%{
    opacity: 0;
  }
  50%{
    opacity: 1;
  }
  100%{
    opacity: 0;
  }
}
.rotateclass{
  animation: rotate 3s infinite;
  background: url(../assets/public_img/rotate.png) no-repeat;
  background-size: 100% 100%;
}
@keyframes rotate{
	0%{
		transform: rotateY(0deg);/*从0度开始*/
	}
	100%{
		transform: rotateY(360deg);/*360度结束*/
	}
}     
</style>
