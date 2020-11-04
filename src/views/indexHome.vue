<!-- 分析研判 -->
<template>
  <div style="height:100%;overflow:hidden" class="box">
      <div class="text-left ph20 pv10 box" style="height:5%;font-size:14px" >
        <span style="font-size:22px;font-weight:700">今日, </span><span v-text="datetext" ></span>,欢迎您使用智能云柜管理后台
      </div>
      <div  class="bg-white ph20 pv10 box" style="height:95%;width:100%">
         <div style="height:100%;height:100%;">
           <!-- 综合统计 -->
          <div style="height:25%;width:100%;" class="block1">
            <div style="height:100%;width:100%;display:flex;justify-content:space-around;">
            <div class="block_roll box" v-for="(item,key) in allnum_Arr" :key="key" >
               <div style="display:inline-block;width:25%;height:60%;vertical-align: top;margin:10% 5% 10% 10%;background-color:red;" :style="{backgroundColor:key===0?'#4BCED0':(key===1?'#FB6260':(key===2?'#8167F5':''))}" class="box">
                 <img :src="key===0?block_img1:(key===1?block_img2:(key===2?block_img3:''))" style="width:50%;height:50%;margin:25%" alt="">
               </div>
               <div style="display:inline-block;width:45%;height:60%;vertical-align: top;margin:10% 0% 10% 0%;"  class="box">
                 <div v-text="key===0?'生物检材在存总数(个)':(key===1?'涉案财物在存总数(个)':(key===2?'案卷在存总数(本)':''))" style="height:20%;margin-top:10%"></div>
                 <br>
                 <div style="font-size:18px;margin-top:5%">{{item.num}}</div>
               </div>
            </div>
          </div>
          </div>
          <!-- 第二个模块 -->
          <div style="height:48%;width:100%;margin:1% 0;" class="box"> 
            <div style="height:10%" class="box">
              <el-button-group>
                <el-button :type="case1 ===0?'primary':''" @click="getEchart(0)">生物检材</el-button>
                <el-button :type="case1 ===2?'primary':''" @click="getEchart(2)">涉案财物</el-button>
                <el-button :type="case1 ===1?'primary':''" @click="getEchart(1)">案卷</el-button>
              </el-button-group>
            </div>
            <div style="height:90%" class="box">

              <div style="height:100%;width:100%;" class="box"  >
                <div style="height:100%;width:80%;display:inline-block;vertical-align: top;" id="block2_echarts1" class="block_echarts"></div>
                <div style="height:100%;width:20%;display:inline-block;vertical-align: top;">
                  <div style="height:50%;" >
                    <div style="margin-top:45%;">
                        <span style="">昨日</span><span style="font-size:24px;font-weight:600;margin-left:20px">{{block2_obj1.num1}}</span>
                    </div>
                  </div>
                  <div style="height:50%;line-height:100%"><span>今日同比</span><span style="font-size:18px;font-weight:600;margin-left:20px;color:red">{{block2_obj1.num2>-1?('+'+block2_obj1.num2):''+block2_obj1.num2}}</span></div>
                </div>
              </div>
            </div>
          </div>
          <div style="padding-left:1%;font-size:16px;font-weight:700;height:3%;">库存管理</div>
          <div style="height:22%;width:100%;display:flex;justify-content:space-around;">
            <div class="block_roll box" v-for="(item,key) in roll_Arr" :key="key" :style="{color:(key===0?'blue':(key===1?'green':key===2?'orange':''))}">
               <div style="display:inline-block;width:50%;height:100%;vertical-align: top;">
                 <el-progress type="circle" :color="(key===0?'blue':(key===1?'green':key===2?'orange':''))" :percentage="item.centage" style="margin:20% 0 0 10%"></el-progress>
               </div>
               <div style="display:inline-block;width:50%;height:100%">
                 <div style="height:20%;text-align:center;margin-top:40%;font-size:24px;">{{item.num}}</div>
                 <div style="height:40%;text-align:center" v-text="key===0?'生物检材柜':(key===1?'涉案财物柜':(key===2?'案卷柜':''))"></div>
               </div>
            </div>
          </div>
         </div>
      </div>
  </div>
</template>
<script>
import {getCabinetSpace,getCabinetStorage} from '@/api/frontDesk'
// import {getCabinetContrastGraphical} from '@/api/indexHome'
import echarts from 'echarts'
import { formatDate3 } from '@/utils/global'
export default {
  data(){
      return {
          datetext:'',
          block2_obj1:{
            num1:0,
            num2:0,
          },
          block2_obj2:{
            num1:0,
            num2:0,
          },
          block2_obj3:{
            num1:0,
            num2:0,
          },
          case1: 0,
          block_img1:require('../assets/img/house.png'),
          block_img2:require('../assets/img/line.png'),
          block_img3:require('../assets/img/star.png'),
          data_x:['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
          data_y1:[120, 132, 101, 134, 90, 230, 210],
          data_y2:[220, 182, 191, 234, 290, 330, 310],
          roll_Arr:[{centage:0,num:0},
                    {centage:0,num:0},
                    {centage:0,num:0}],
          allnum_Arr:[{num:0},{num:0},{num:0}]
      }
  },
  mounted() {
    this.datetext=formatDate3(new Date())
    this.init_base_data();
    this.getEchart(0)
  },
  methods: {
     init_base_data(){
        var data={
        cabinetType:0
      }
      getCabinetSpace(data).then(res=>{
        if(res.result){
          this.allnum_Arr[0].num=res.data[0].num;//生物检材
          this.allnum_Arr[1].num=res.data[2].num;//涉案财物
          this.allnum_Arr[2].num=res.data[1].num;//案卷
          this.roll_Arr[0].num=res.data[0].total;
          this.roll_Arr[1].num=res.data[2].total;
          this.roll_Arr[2].num=res.data[1].total;
          this.roll_Arr[0].centage=Number(((res.data[0].num/res.data[0].total)*100).toFixed(2));
          this.roll_Arr[1].centage=Number(((res.data[2].num/res.data[2].total)*100).toFixed(2));
          this.roll_Arr[2].centage=Number(((res.data[1].num/res.data[1].total)*100).toFixed(2));
        }else{
         window_warning(res.msg)
        }
      }).catch()
     },
     getEchart(str) {
       this.case1=str;
       var data={
         cabinetType:str
       }
      getCabinetStorage(data).then(res=>{
        if(res.result){
          var arr_legend=[];
          // var str=0;
          arr_legend.push(str);
          var data_x=[];
          var data_y=[];
          this.block2_obj1.num1=res.data[res.data.length-2].value;
          this.block2_obj1.num2=(res.data[res.data.length-1].value)-(res.data[res.data.length-2].value);
          if(res.data.length>0){
            res.data.forEach(item=>{
             data_x.push(item.date);
             data_y.push(item.value);
            })
          }
         this.initecharts('block2_echarts1',data_x,data_y)
        }else{
          window_warning(res.msg)
        }
      }).catch()

      },
     initecharts(id,data_x,data_y){
           // 基于准备好的dom，初始化echarts实例
        var myChart1 = echarts.init(document.getElementById(id));
        // 指定图表的配置项和数据
        var option = {
              color: ['#1BE9BF','#5AB1EF'],
              title: {
                  text: ''
              },
              tooltip: {
                  trigger: 'axis'
              },
              legend: {
                  data: ['云柜存储趋势']
              },
              grid: {
                  left: '3%',
                  right: '4%',
                  bottom: '3%',
                  containLabel: true
              },
              toolbox: {
                  feature: {
                      
                  }
              },
              xAxis: {
                  type: 'category',
                  boundaryGap: false,
                  minInterval: 1,
                   axisLabel: {
                    interval:0,  
                    rotate:60,  
                    show: true
                  },
                  // data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                  data: data_x
              },
              yAxis: {
                  type: 'value',
                  minInterval: 1,
              },
              series: [
                  {
                      name: '云柜储存',
                      type: 'line',
                      stack: '总量',
                      // data: [120, 132, 101, 134, 90, 230, 210]
                      data: data_y
                  }
              ]
          };
        // 使用刚指定的配置项和数据显示图表。
        myChart1.setOption(option);
        myChart1.resize();
     }

  },
}
</script>
<style  scoped>
 .box{
     box-sizing: border-box;
 }
 .block1_div{
   display: inline-block;
   width: 32%;
   height: 100%;
   line-height: 100%;
   vertical-align: top;
 }
 .block1_div>div{
   display: inline-block;
   vertical-align: top;
 }
 .block_echarts>div{
   width: 100%!important;
   height: 100%!important;
 }
 .block_roll{
   display: inline-block;
   width: 28%;
   height: 100%;
   border: 1px solid #eee;
   border-radius: 4px;
 }
</style>
