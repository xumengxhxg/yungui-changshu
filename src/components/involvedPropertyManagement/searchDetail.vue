<!-- 查看详情 -->
<template>
  <div class="detail">
    <div class="text-left ph20 pv10">
      涉案财物查询
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
                <!-- <tr>
                  <td>人员姓名：</td>
                  <td>{{info.suspectName}}</td>
                  <td>身份证：</td>
                  <td>{{info.identityCard}}</td>
                </tr>
                <tr>
                  <td>人员性别：</td>
                  <td>{{info.sex ? '男' : '女'}}</td>
                  <td>驾驶证号码：</td>
                  <td>{{info.driverCard}}</td>>
                </tr>
                <tr>
                  <td>车辆类型：</td>
                  <td>{{info.carType == 0 ?'小型汽车' : info.carType == 1 ? '大型汽车': info.carType == 2 ? '摩托车' : info.carType == 3 ? '电动车' : '其他'}}</td>
                  <td style="line-height: 25px">血液已存含量:(mg/100ml)</td>
                  <td>{{info.ethanolContent}}</td>
                </tr>
                <tr>
                  <td>查处类型：</td>
                  <td>{{info.discoverType ? '设卡查获' : '事故查获'}}</td>
                  <td>查处中队</td>
                  <td>{{info.discoverDept}}</td>
                </tr>
                <tr>
                  <td>查处时间：</td>
                  <td colspan="3">{{info.discoverTime}}</td>
                </tr> -->
                <tr>
                  <td>案件名称：</td>
                  <td>{{info.caseName}}</td>
                  <td>案件编号：</td>
                  <td>{{info.caseNo}}</td>
                </tr>
                <tr>
                  <td>主办人：</td>
                  <td>{{info.sponsor}}</td>
                  <td>协办人：</td>
                  <td>{{info.cosponsor}}</td>
                </tr>
                 <tr>
                  <td>物品编号：</td>
                  <td>{{info.itemNo}}</td>
                  <td>物品名称：</td>
                  <td>{{info.itemName}}</td>
                </tr>
                <tr>
                  <td>物品数量：</td>
                  <td>{{info.itemCount}}</td>
                  <td>最后操作时间：</td>
                  <td>{{info.operateTime}}</td>
                </tr>
                <tr>
                  <td>存入照片：</td>
                  <td>
                    <img style="width: 60%" :src="info.storePicture" alt="">
                  </td>
                  <td>取出照片：</td>
                  <td>
                    <img style="width: 60%" :src="info.fetchPicture" alt="">
                  </td>
                </tr>
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
                        涉案财物：【{{item.status ? '出柜' : '入柜'}}】
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
import { circulationList, getPropertyDetail } from '@/api/cabinet'
export default {
  data () {
    return {
      dataTime: [],
      info: {}
    }
  },
  created() {

    this.info = JSON.parse(this.$route.query)
    console.log(this.info, 987)
    this.circulationList()
    this.getPropertyDetail()
  },
  methods: {
    getPropertyDetail() {
      let params = {
        inventoryId: this.info.inventoryId,
        itemNo: this.info.itemNo
      }
      getPropertyDetail(params).then((res) => {
        if (res.result) {
          this.info.operateTime = res.data.operateTime
        }
      }).catch()
    },
    circulationList() {
      let params = {
        eventNo: this.info.caseNo,
        itemNo: this.info.itemNo,
        cabinetType: 2
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
