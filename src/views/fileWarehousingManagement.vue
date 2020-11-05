<!-- 生物检材柜管理-入库管理 -->
<template>
  <div>
    <div class="text-left ph20 pv10">
      案卷柜管理/入库管理
    </div>
    <div class="bg-white top-container p20" >
      <div style="border: 1px solid rgb(64, 158, 255); width: 100%">
        <div class="triangle-topleft" style="position: absolute">
          <span class="triangle-text">登记</span>
        </div>
        <div class="right-container">
          <!-- 登记区域开始 -->
          <div class="pv20">
            <!-- 管理员分配 -->
            <!-- 查询输入框 -->
            <div style="width: 60%;margin: 0 auto" v-if="distributionType == 1">
                <!-- 步骤条 -->
                <div class="case-ark" :style="isShowCase ? 'height: 280px' : 'height: 80px'" style="float: left; margin-top: 10px">
                  <el-steps :active="active" direction="vertical" >
                    <el-step></el-step>
                    <el-step></el-step>
                  </el-steps>
                </div>
                <!-- 选择案件 -->
                <div>
                  <el-autocomplete popper-class="my-autocomplete" class="inline-input" style="width: 500px" v-model="caseSelect" :fetch-suggestions="querySearch" placeholder="搜索说明：输入案件编号"  :select-when-unmatched='true' @select="handleSelect" @change="handleChange">
                    <template slot="prepend">选择案件</template>
                    <el-button slot="append" type="primary" style="background: #0C8EF6; color: #fff" @click="searchCase">搜索</el-button>
                    <template slot-scope="{ item }">
                      <div style="border-bottom: 1px solid #ededed">
                        <div class="item1">{{ item.value }}</div>
                        <div class="item2">{{ item.value2 }}</div>
                      </div>
                    </template>
                  </el-autocomplete>
                </div>
                <!-- 查询到的案件详情 -->
                <div v-if="isShowCase">
                  <!-- 有数据时 -->
                  <div v-if="isHasCase">
                    <i class="el-icon-remove-outline delete-icon cursor" @click="removeCase"></i>
                    <table border="1" cellspacing="0">
                      <tr>
                        <td>案件编号：</td>
                        <td>{{caseInfo.caseNo}}</td>
                        <td>案件名称：</td>
                        <td>{{caseInfo.caseName}}</td>
                      </tr>
                      <!-- <tr>
                        <td>案件类型：</td>
                        <td>{{caseInfo.caseType ? '危险驾驶': '交通肇事'}}</td>
                        <td>嫌疑人：</td>
                        <td>{{caseInfo.suspectName}}</td>
                      </tr> -->
                      <!-- <tr>
                        <td>案件状态：</td>
                        <td>{{caseInfo.caseStatus == 0 ? '立案' : caseInfo.caseStatus == 1 ? '破案' :  caseInfo.caseStatus == 2 ? '结案' : '暂无'}}</td>
                        <td>驾驶证状态：</td>
                        <td v-if='caseInfo.licenseStatus == 0'>未吊销</td>
                        <td v-else-if="caseInfo.licenseStatus == 1">吊销</td>
                        <td v-else>无驾驶证</td>
                      </tr> -->
                      <tr>
                        <td>主办人：</td>
                        <td>{{caseInfo.sponsor}}</td>
                        <td>协办人：</td>
                        <td>{{caseInfo.cosponsor}}</td>
                      </tr>
                    </table>
                  </div>
                  <!-- 无数据时 -->
                  <div v-else style="height: 200px;width: 60%;text-align: center; padding: 20px;box-sizing: border-box">
                    <img src="@/assets/images/empty.png" alt="">
                    <div style="color: #a3a3a3">
                      暂无相关案件信息
                    </div>
                  </div>
                </div>
                <!-- 分配柜门 -->
                <div class="mt20">
                  <el-input placeholder="点击选择柜门" v-model="selectDoorNo" :disabled='selectDoorDisabled' style="width: 500px;" @focus="selectCabinet">
                    <template slot="prepend">分配柜门</template>
                  </el-input>
                </div>
            </div>
            <!-- 系统自动分配 -->
            <div style="margin: 0 auto" v-if="distributionType == 2">
                <!-- 步骤条 -->
                <!-- <div class="case-ark" :style="isShowCase ? 'height: 280px' : 'height: 80px'" style="float: left; margin-top: 10px">
                  <el-steps :active="active" direction="vertical" >
                    <el-step></el-step>
                  </el-steps>
                </div> -->
                <!-- 选择案件 -->
                <div style="text-align: center">
                  <el-autocomplete popper-class="my-autocomplete" class="inline-input" style="width: 500px" v-model="caseSelect" :fetch-suggestions="querySearch" placeholder="搜索说明：输入案件编号"  :select-when-unmatched='true' @select="handleSelect" @change="handleChange">
                    <template slot="prepend">选择案件</template>
                    <el-button slot="append" type="primary" style="background: #0C8EF6; color: #fff" @click="searchCase">搜索</el-button>
                    <template slot-scope="{ item }">
                      <div style="border-bottom: 1px solid #ededed">
                        <div class="item1">{{ item.value }}</div>
                        <div class="item2">{{ item.value2 }}</div>
                      </div>
                    </template>
                  </el-autocomplete>
                </div>
                <!-- 查询到的案件详情 -->
                <div v-if="isShowCase">
                  <!-- 有数据时 -->
                  <div v-if="isHasCase" style="text-align: center">
                    <i class="el-icon-remove-outline delete-icon-2 cursor"  @click="removeCase"></i>
                    <table border="1" cellspacing="0" style="margin: 0 auto">
                      <tr>
                        <td>案件编号：</td>
                        <td>{{caseInfo.caseNo}}</td>
                        <td>案件名称：</td>
                        <td>{{caseInfo.caseName}}</td>
                      </tr>
                      <tr>
                        <td>案件类型：</td>
                        <td>{{caseInfo.caseType ? '危险驾驶': '交通肇事'}}</td>
                        <td>嫌疑人：</td>
                        <td>{{caseInfo.suspectName}}</td>
                      </tr>
                      <tr>
                        <td>案件状态：</td>
                        <td>{{caseInfo.caseStatus == 0 ? '立案' : caseInfo.caseStatus == 1 ? '破案' :  caseInfo.caseStatus == 2 ? '结案' : '暂无'}}</td>
                        <td>驾驶证状态：</td>
                        <td v-if='caseInfo.licenseStatus == 0'>未吊销</td>
                        <td v-else-if="caseInfo.licenseStatus == 1">吊销</td>
                        <td v-else>无驾驶证</td>
                      </tr>
                      <tr>
                        <td>主办人：</td>
                        <td>{{caseInfo.sponsor}}</td>
                        <td>立案时间：</td>
                        <td>{{caseInfo.caseTime}}</td>
                      </tr>
                    </table>
                  </div>
                  <!-- 无数据时 -->
                  <div v-else style="height: 200px;width: 60%;text-align: center; padding: 20px;box-sizing: border-box">
                    <img src="@/assets/images/empty.png" alt="">
                    <div style="color: #a3a3a3">
                      暂无相关案件信息
                    </div>
                  </div>
                </div>
            </div>
            <div class="mt40" style="text-align: center">
              <el-button type='primary' style="width: 200px" :disabled='registerDisabled' @click="register">登记</el-button>
            </div>
          </div>
          <!-- 登记区域结束 -->
        </div>
      </div>
    </div>
     <!-- 数据展示区域开始 -->
    <div class="bg-white ph30">
      <!-- 数量展示 -->
      <div class="clearfix">
        <div class="pull-left  data">
          <div class="clearfix" style="border: 1px solid #0C8EF6; padding: 20px">
            <div class="pull-left">
              <div class="title-text">
                今日登记数量（个）
              </div>
              <div class="icon">
                <i class="el-icon-edit-outline"></i>
              </div>
            </div>
            <div class="pull-left num">
              {{registerTotal}}
            </div>
          </div>
        </div>
        <div class="pull-right clearfix data">
          <div class="clearfix" style="border: 1px solid #0C8EF6; padding: 20px">
            <div class="pull-left">
              <div class="title-text">
                今日入库数量（个）
              </div>
              <div class="icon">
                <i class="el-icon-document-checked"></i>
              </div>
            </div>
            <div class="pull-left num">
              {{storageTotal}}
            </div>
          </div>
        </div>
      </div>
      <!-- 待存列表 -->
      <div>
        <div style="font-size: 17px; font-weight: 600">
          待存列表
        </div>
        <el-row :gutter="20" class="pv20">
          <el-col :span="13">
            <div style="">
              <el-table
                size='mini'
                :data="storeList"
                style="width: 100%; border: 1px solid #ededed; border-bottom: 0px">
                <el-table-column
                  label="案件名称"
                  prop="caseName"
                  width="160">
                </el-table-column>
                <el-table-column
                  label="案件编号"
                  prop="eventNo"
                 >
                </el-table-column>
                <el-table-column
                    label="柜门"
                    prop="doorNo">
                  </el-table-column>
                <el-table-column
                  label="操作"
                  align="center"
                  width='200'>
                  <template slot-scope="scope">
                    <el-button type="text" @click="achieveBarcode(scope.row.eventNo)">下载条形码</el-button>
                    <el-button type="text"  @click="removeCheck(scope.row.id)">移除登记</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination
                class="mt10"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="pageNum"
                :page-size="pageSize"
                :page-sizes="[5]"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
              </el-pagination>
            </div>
          </el-col>
          <el-col :span="11">
            <div class="pv20" style="text-align: center; height: 240px; border: 1px solid #ededed; padding-top: 40px">
              <el-progress type="circle" :percentage="storePercent"></el-progress>
              <div style="font-size: 20px; font-weight: 600;;margin-top: 10px">
                入库率
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 数据展示区域结束 -->
    <div v-if="selectCabinetDialogVisible">
      <select-cabinet :dialogVisible='selectCabinetDialogVisible' @update='updateCabinetDialogVisible' @selectCabinet='selectDoor'></select-cabinet>
    </div>
  </div>
</template>

<script>
import { achieveBarcode2, getCaseList, getRegisterCountByTime, toBeStoredList, checkIn, getCounterInfo, removeCheck } from '@/api/cabinet'
import selectCabinet from '@/components/fileManagement/cabinetSelect'
import { getBaseSet } from '@/api/systemSettings'
import { download} from '@/utils/global'
export default {
  components: {
    selectCabinet
  },
  data () {
    return {
      isShowCase: false,
      pageNum: 1,
      pageSize: 5,
      total: 0,
      active: 2,
      caseSelect: '',
      restaurants: [],
      isHasCase: false,
      selectCabinetDialogVisible: false,
      registerTotal: 0,
      storageTotal: 0,
      storePercent:0, //入库率
      storeList: [],
      caseInfo: {},
      selectDoorNo: '',
      distributionType: 1,
      registerDisabled: true,
      selectDoorDisabled: true,
      sum: 0,
      cabinetList: [{doorNo: 'D-1'}, {doorNo: 'D-2'}, {doorNo: 'D-3'}, {doorNo: 'D-4'}, {doorNo: 'D-5'}, {doorNo: 'D-6'}, {doorNo: 'D-7'}, {doorNo: 'D-8'}, 
      {doorNo: 'C-1'}, {doorNo: 'C-2'}, {doorNo: 'C-3'}, {doorNo: 'C-4'}, {doorNo: 'C-5'}, {doorNo: 'C-6'}, {doorNo: 'C-7'}, {doorNo: 'C-8'}, 
      {doorNo: 'B-1'}, {doorNo: 'B-2'}, {doorNo: 'B-3'}, {doorNo: 'B-4'}, {doorNo: 'B-5'}, {doorNo: 'B-6'}, {doorNo: 'B-7'}, {doorNo: 'B-8'}, 
      {doorNo: 'A-1'}, {doorNo: 'A-2'}, {doorNo: 'A-3'}, {doorNo: 'A-4'}, {doorNo: 'A-5'}, {doorNo: 'A-6'}]
    }
  },
  created() {
    this.getRegisterCountByTime()
    this.toBeStoredList()
    this.loadAllAccident()
    this.getBaseSet()
    this.getCounterInfo()
  },
  mounted() {
  },
  methods: {
    achieveBarcode(val) {
      let data = {
        ajbh: val
      }
      achieveBarcode2(data).then((res) => {
        download('条形码.png', res)
      }).catch()
    },
    // 获取柜面信息
    getCounterInfo() {
      let params = {
        cabinetType: 1
      }
      getCounterInfo(params).then((res) => {
        this.sum = res.data.capacity
        if (res.result) {
          this.cabinetList.forEach((item, index) => {
            item.surplusSpace = res.data.capacity // 未使用
            item.usedSpace = 0 //已使用
            item.inExistence = 0
            if (res.data.doorInfoList) {
              res.data.doorInfoList.forEach((doorItem) => {
                if (item.doorNo == doorItem.doorNo) {
                  item.surplusSpace = doorItem.surplusSpace
                  item.usedSpace = doorItem.usedSpace
                  item.inExistence = doorItem.inExistence
                } else {
                  // item.surplusSpace = res.data.capacity // 未使用
                  // item.usedSpace = 0 //已使用
                }
              })
            } else {
              item.surplusSpace = res.data.capacity // 未使用
              item.usedSpace = 0 //已使用
              item.inExistence = 0
            }
          })
        }
      }).catch()
    },
    // 获取系统设置 柜子分配方式
    getBaseSet() {
      let params = {
        cabinetType: 1
      }
      getBaseSet(params).then((res) => {
        if (res.result) {
          this.distributionType =  res.data[0].distributionType // 1管理员分配 2系统自动分配
        }
      }).catch()
    },
    // 查询所有案件（下拉展示）
    loadAllAccident() {
      let data = {
        cabinetType: 1
      }
      getCaseList(data).then((res) => {
        if (res.result) {
          this.restaurants = res.rows.map((item, index) => {
            return {
              value: item.caseNo,
              value2: item.caseName
            }
          })
        }
      }).catch()
    },
    selectCabinet(val) {
      this.selectCabinetDialogVisible = true
    },
    updateCabinetDialogVisible(val) {
      this.selectCabinetDialogVisible = val
    },
    // 选择柜号
    selectDoor(val) {
      this.selectDoorNo = val
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    // 点击搜索按钮
    searchCase() {
      if (this.caseSelect) { // 搜索框有内容时，展示表格
        this.isShowCase = true
        // 判断是否能查询到案件信息，查不到就展示空样式
        let list = this.restaurants.map((item) => {
          return item.value
        })
        if (list.includes(this.caseSelect)) {
          this.isHasCase = true
        } else {
          this.isHasCase = false
        }
        let data = {
          search: this.caseSelect
        }
        getCaseList(data).then((res) => {
          if (res.result) {
            this.caseInfo = res.rows[0]
            if (res.rows.length == 0) {
              this.isHasCase = false
            } else {
              if (list.includes(this.caseSelect)) {
                this.isHasCase = true
                this.selectDoorDisabled = false
                if (this.distributionType == 2) {
                  this.registerDisabled = false
                }
              } else {
                this.isHasCase = false
              }
            }
          }
        }).catch()
      } else { // 无内容时，不展示表格
        this.isShowCase = false
      }
    },
    // 选择搜索到的下拉数据时
    handleSelect(item) {
      if (item) {
        // this.isShowCase = true
        this.caseSelect = item.value
        this.isShowCase = false
        this.registerDisabled = true
      }
    },
    handleChange() {
      this.caseInfo = {}
      this.isShowCase = false
      this.registerDisabled = true
    },
    // 登记
    register() {
      const h = this.$createElement;
      this.$msgbox({
        title: '',
        message: h('p', null, [
          h('p', null, [
            h('i', {class: 'el-icon-success', style: 'color: #67C23A; font-size: 18px'}),
            h('span', {style: 'display: inline-block; margin-left: 10px'}, '确认要登记这条信息吗？')
          ]),
          h('p', { style: 'color: #777; font-size: 12px; padding-left: 20px;margin-top: 5px' }, '您确认要登记这条案件信息并生成案件条形码')
        ]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            // 系统自动分配第一个还有剩余空间的柜子
            let doorItem = {}
            // doorItem = this.cabinetList.find((item) => {
            //   return item.surplusSpace
            // })
            doorItem = this.cabinetList.find((item) => {
              return (item.usedSpace + item.inExistence) < this.sum
            })
            console.log(doorItem, 888)
            if (doorItem) {
              this.doorNo = doorItem.doorNo
            } else {
              this.$message({
                message: '暂时没有空余的柜子',
                type: 'warning'
              })
              return
            }
            let data = {
              cabinetType: 1,
              doorNo: this.selectDoorNo || this.doorNo,
              eventNo: this.caseInfo.caseNo
            }
            checkIn(data).then((res) => {
              // if (res.result) {
                this.$message({
                  message: res.msg,
                  type: 'warning'
                })
                this.getRegisterCountByTime()
                this.toBeStoredList()
                this.getCounterInfo()
                this.caseSelect = ''
                this.selectDoorNo = ''
                this.isShowCase = false
                this.registerDisabled = true
                this.selectDoorDisabled = true
                done()
              // }
            }).catch()
          } else {
            done()
          }
        }
      }).then(action => {
      })
    },
    removeCase() {
      this.isShowCase = false
    },
    // 获取登记和入库数量
    getRegisterCountByTime() {
      let params = {
        cabinetType: 1 // 0-检材柜，1-案卷柜，2-财务柜
      }
      getRegisterCountByTime(params).then((res) => {
        if (res.result) {
          this.registerTotal = res.data.registerCount
          this.storageTotal = res.data.storageCount
          if (res.data.registerTotal) {
            this.storePercent = Number(((res.data.storageTotal / res.data.registerTotal) * 100).toFixed(2))
          }
        }
      }).catch()
    },
    // 待办列表
    toBeStoredList() {
      let params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        cabinetType: 1,
        storeStatus: 0 // 0待存，1已存，2取出，3部分在存
      }
      toBeStoredList(params).then((res) => {
        if (res.result) {
          this.storeList = res.rows
          this.total = res.total
        }
      }).catch()
    },
     // 移除登记
    removeCheck(id) {
      this.$confirm('确定要移除登记吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = {
          ids: [id]
        }
        removeCheck([id]).then((res) => {
          if (res.result) {
            this.$message({
              message: res.msg,
              type: 'warning'
            })
            this.toBeStoredList()
            this.getRegisterCountByTime()
          }
        }).catch()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })         
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.toBeStoredList()
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this.toBeStoredList()
    }
  },
  watch: {
    selectDoorNo(to, from) {
      if (to) {
        if (this.distributionType == 1) {
          this.registerDisabled = false
        }
      }
    }
  }
}

</script>

<style lang='less' scoped>
.my-autocomplete {
  li {
    line-height: normal;
    padding: 7px;

    .item1 {
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .item2 {
      font-size: 12px;
      color: #b4b4b4;
      line-height: 20px;
    }

    .highlighted .item2 {
      color: #ddd;
    }
  }
}
.top-container {
  display: flex; 
  flex-direction: row;
  .right-container {
    flex: 1;
    .title {
      font-size: 20px;
      font-weight: 500;
    }
    .delete-icon {
      font-size: 20px;
      position: relative;
      left: -10px;
      top: 12px;
      color: #F56C6C;
    }
    .delete-icon-2 {
      font-size: 20px;
      position: relative;
      left: -340px;
      top: 12px;
      color: #F56C6C;
    }
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
  }
}
.triangle-text {
  width: 100px;
  text-align: center;
  display: inline-block;
  position: relative;
  top: -70px;
  color: #fff;
  left: -30px;
  font-size: 16px;
}
.data {
  width: 50%;
  box-sizing: border-box;
  padding: 20px 40px;
  .title-text {
    font-size: 25px;
    font-weight: 600;
  }
  .icon {
    font-size: 35px;
    font-weight: 600;
    color: #0C8EF6;
    margin-top: 10px;
  }
  .num {
    height: 100%;
    line-height: 100%;
    font-size: 45px;
    color: red;
    position: relative;
    bottom: 0px;
    left: 50px;
    margin-top: 20px;
    margin-left: 20px;
  }
}
</style>
