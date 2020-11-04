<!-- 分析研判 -->
<template>
  <div style="height:100%" class="box">
      <div class="text-left ph20 pv10 box" style="height:5%">
        分析研判
      </div>
      <div  class="bg-white ph20 pv10 box" style="height:95%;width:100%">
         <div style="height:50%;padding:1%;width:100%" class="box">
             <div class="box_div box" style="margin-right:2%;position:relative">
                 <span class="el-icon-collection-tag span_icon" ></span>
                 <div id="block_echarts1" style="width: 95%;height:95%;margin:2% 0 0 8%;"></div>
             </div>
             <div class="box_div box" style="position:relative">
                 <span class="el-icon-collection-tag span_icon" ></span>
                 <div id="block_echarts2" style="width: 95%;height:95%;margin:2% 0 0 8%;"></div>
             </div>
         </div>
         <div style="height:50%;padding:1%;width:100%" class="box">
             <div class="box_div box" style="margin-right:2%;position:relative">
                 <span class="el-icon-collection-tag span_icon" ></span>
                 <div id="block_echarts3" style="width: 95%;height:95%;margin:2% 0 0 8%;"></div>
             </div>
             <div class="box_div box" style="position:relative">
                 <span class="el-icon-collection-tag span_icon" ></span>
                 <div id="block_echarts4" style="width: 95%;height:95%;margin:2% 0 0 8%;"></div>
             </div>
         </div>
      </div>
  </div>
</template>
<script>
import { analysisJudgment} from '@/api/analysisAndJudgment'
import echarts from 'echarts'
export default {
  data(){
      return {
          
      }
  },
  mounted() {
      this.initdata()
  },
  methods: {
      initdata(){
          analysisJudgment().then(res=>{
              if(res.result){
                 this.initecharts_1(res.data.caseTypeList);
                 this.initecharts_2(res.data.carTypeList);
                this.initecharts_3(res.data.sexList);
                this.initecharts_4(res.data.caseStatistics.x,res.data.caseStatistics.y);
              }else{
                 window_warning(res.msg)
              }
          }).catch();
        
        
      },
      initecharts_1(data_arr){   //第一块的echarts
           // 基于准备好的dom，初始化echarts实例
        var myChart1 = echarts.init(document.getElementById('block_echarts1'));
        // 指定图表的配置项和数据
        var option = {
            color: ['#1BE9BF','#5AB1EF'],
            title: {
                text: '查处类型',
                // left: 'left'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
                orient: 'horizontal',
                // left: 'center',
                data: ['事故查获', '设卡查获']
            },
            grid: {
                left: '13%',
                right: '4%',
                bottom: '8%',
                containLabel: true
                },
            series: [
                {
                    name: '查处类型',
                    type: 'pie',
                    radius: '55%',
                    // center: ['50%', '60%'],
                    data: data_arr,
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart1.setOption(option);
      },

      initecharts_2(data_arr){   //第二块的echarts
           // 基于准备好的dom，初始化echarts实例
        var myChart1 = echarts.init(document.getElementById('block_echarts2'));
        // 指定图表的配置项和数据
        var option = {
            color: ['#1BE9BF','#5AB1EF'],
            title: {
                text: '车辆类型',
                // left: 'left'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
                orient: 'vertical',
                top:30,
                left: 0,
                data: ['小型汽车', '大型汽车','摩托车','电动车','其他']
            },
            grid: {
                left: '13%',
                right: '4%',
                bottom: '8%',
                containLabel: true
                },
            series: [
                {
                    name: '车辆类型',
                    type: 'pie',
                    radius: '55%',
                    // center: ['50%', '60%'],
                    data: data_arr,
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart1.setOption(option);
      },

       initecharts_3(data_arr){   //第3块的echarts
           // 基于准备好的dom，初始化echarts实例
        var myChart1 = echarts.init(document.getElementById('block_echarts3'));
        // 指定图表的配置项和数据
        var option = {
                color: ['#1BE9BF','#5AB1EF'],
                title: {
                    text: '人员性别',
                    // left: 'left'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}: {c} ({d}%)'
                },
                legend: {
                    orient: 'horizontal',
                    left: 'center',
                    data: ['男', '女']
                },
                series: [
                    {
                        name: '人员性别',
                        type: 'pie',
                        radius: ['40%', '55%'],
                        avoidLabelOverlap: false,
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                                show: true,
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
        myChart1.setOption(option);
      },

       initecharts_4(x,y){   //第4块的echarts
           // 基于准备好的dom，初始化echarts实例
        var myChart1 = echarts.init(document.getElementById('block_echarts4'));
        // 指定图表的配置项和数据
        var option = {
            color: ['#1BE9BF'],
            title: {
                text: '案件统计报表'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['案件数']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '8%',
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
                axisLabel: {
                    interval:0,  
                    rotate:60,  
                    show: true,
                },
                data: x
            },
            yAxis: {
                type: 'value',
            },
            series: [
                {
                    name: '案件数',
                    type: 'line',
                    stack: '总量',
                    smooth: true,
                    data: y
                }
            ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart1.setOption(option);
      }


  },
}
</script>
<style  scoped>
 .box{
     box-sizing: border-box;
 }
 .box_div{
     width:48.5%;
     margin-right:1%;
     border: 2px solid #eee;
     height:100%;
     display:inline-block;
 }
 .span_icon{
    position:absolute;
    top:2%;
    left:2%;
    color:rgb(57, 136, 240);
    font-size: 30px;
 }
</style>