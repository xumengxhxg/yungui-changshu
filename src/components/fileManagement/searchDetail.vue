<!-- 查看详情 -->
<template>
  <div class="detail">
    <div class="text-left ph20 pv10">
      案卷查询
      <span class="cursor" @click="$router.go(-1)">
        <i class="el-icon-back"></i>
        <span>返回</span>
      </span>
    </div>
    <div class="bg-white p20">
      <div style="font-size: 24px; "> 
        查看详情
      </div>
      <div class="mt20 detail">
        <el-tabs type="border-card">
          <el-tab-pane>
            <span slot="label"><i class="el-icon-date"></i> 详情</span>
            <div class="p20" style="border-top: 1px solid #ededed">
              <table border="1" cellspacing="0" style="margin: 0 auto">
                <tr>
                  <td>案件编号：</td>
                  <td>{{info.caseNo}}</td>
                  <td>案件名称：</td>
                  <td>{{info.caseName}}</td>
                </tr>
                <!-- <tr>
                  <td>案件类型：</td>
                  <td>{{info.caseType ? '危险驾驶' : '交通肇事'}}</td>
                  <td>嫌疑人：</td>
                  <td>{{info.suspectName}}</td>
                </tr> -->
                <!-- <tr>
                  <td>案件状态：</td>
                  <td>{{info.caseStatus == 0 ? '立案' : info.caseStatus == 1 ? '破案' : info.caseStatus == 2 ? '结案' : '暂无'}}</td>
                  <td>驾驶证状态：</td>
                  <td v-if="info.licenseStatus == 0">未吊销</td>
                  <td v-else-if="info.licenseStatus == 1">吊销</td>
                  <td v-else>无驾驶证</td>
                </tr> -->
                <tr>
                  <td>主办人：</td>
                  <td>{{info.sponsor}}</td>
                  <td>协办人：</td>
                  <td>{{info.cosponsor}}</td>
                  <!-- <td>立案时间：</td>
                  <td v-if="info.caseTime != '1900-01-01 00:00:00'">{{info.caseTime ? info.caseTime.slice(0, 10) : ''}}</td>
                  <td v-else></td> -->
                </tr>
                <!-- <tr>
                  <td>破案时间：</td>
                  <td v-if="info.solveTime != '1900-01-01 00:00:00'">{{info.solveTime ? info.solveTime.slice(0, 10) : ''}}</td>
                  <td v-else></td>
                  <td>结束时间：</td>
                  <td v-if="info.finishTime != '1900-01-01 00:00:00'">{{info.finishTime ? info.finishTime.slice(0, 10) : ''}}</td>
                  <td v-else></td>
                </tr> -->
              </table>
            </div>
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label"><i class="el-icon-set-up"></i>流转行程</span>
            <div class="p20" style="border-top: 1px solid #ededed;height: 300px" v-if="dataTime.length > 0">
               <div id="time-line" >
                 <!-- 时间节点 -->
                 <!-- <div class="item">
                   <div class="item-time"> 
                      <img src="@/assets/images/time.png" style="width: 30px" alt="">
                      <span style="display: inline-block; height: 30px;line-height: 30px; position: relative; top: -10px;left: 5px">02-09</span>
                   </div>
                 </div> -->
                 <!-- 具体内容 -->
                <div class="item"  v-for="(item, index) in dataTime" :key="index">
                  <div class="clearfix p10 item-content" style="background: #ecf8ff;border: 1px solid #50bfff">
                    <div class="pull-left">
                      <div>
                        {{item.handleName}}
                      </div>
                      <div class="mt10" style="font-size: 13px">
                        <!-- 0-存柜，1-出柜 -->
                        案卷：【{{item.status ? '出柜' : '入柜'}}】
                      </div>
                      <div style="font-size: 13px">
                        操作柜门：{{item.doorNo}}
                      </div>
                    </div>
                    <div class="pull-right" style="font-size: 13px">
                      <i class="el-icon-time"></i>
                      <span class="d-in-block ml5">{{item.createTime}}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="item-end">
              </div>
            </div>
            <div v-else style="text-align: center;height: 100px; line-height: 100px">暂无流转过程</div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { circulationList } from '@/api/cabinet'
export default {
  data () {
    return {
      info: {},
      dataTime: []
    }
  },
  created() {
    this.info = JSON.parse(this.$route.query)
    this.circulationList()
  },
  methods: {
    circulationList() {
      let params = {
        eventNo: this.info.caseNo,
        cabinetType: 1
      }
      circulationList(params).then((res) => {
        this.dataTime = res.rows
      }).catch()
    }
  }
}

</script>

<style lang='less' scoped>
table,table tr td {
  border: 1px solid #ededed;
}
table tr td:nth-child(2n-1) {
  width: 130px;
  height: 40px;
  line-height: 40px;
  text-align: right;
  background: #F5F5F5 100%;
}
table tr td:nth-child(2n) {
  width: 200px;
  height: 40px;
  line-height: 40px;
  text-align: center;
}
.item {
  margin-left: 30px; /*用左边margin显示时间线*/
  width: calc(100% - 30px); /*因为左边部分用于显示时间线，所以右边部分减去30px*/
  height: auto; /*高度由内容决定*/
  position: relative;
  margin-bottom: 20px;
  cursor: pointer;
}
.item::before {
  content: "";
  width: 11px;
  height: 11px;
  border-radius: 100%;
  background-color: #91c2fc;
  position: absolute;
  left: -15px;
}
.item::after {
  content: "";
  width: 3px;
  height: calc(100% + 20px); /*加上10px是item底部的margin*/
  background-color: #91c2fc;
  position: absolute;
  top: 0;
  left: -11px;
}
.item-content {
  height: auto;
  position: relative;
  top: 10px;
}
.item-end {
  margin-left: 30px; /*用左边margin显示时间线*/
  width: calc(100% - 30px); /*因为左边部分用于显示时间线，所以右边部分减去30px*/
  height: auto; /*高度由内容决定*/
  position: relative;
  margin-bottom: 10px;
  cursor: pointer;
}
.item-end::before {
  content: "";
  width: 11px;
  height: 11px;
  border-radius: 100%;
  background-color: #91c2fc;
  position: absolute;
  left: -15px;
}
</style>
