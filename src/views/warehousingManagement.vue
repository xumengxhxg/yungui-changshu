<!-- 生物检材柜管理-入库管理 -->
<template>
  <div>
    <div class="text-left ph20 pv10">
      生物检材柜管理/入库管理
    </div>
    <div class="bg-white top-container p20" >
      <div style="border:1px solid rgb(64, 158, 255); width: 100%">
        <div class="triangle-topleft" style="position: absolute">
          <span class="triangle-text">登记</span>
        </div>
        <div class="right-container" style="text-align: center">
          <!-- 登记区域开始 -->
          <div class="pv20">
            <!-- 查询输入框 -->
            <div>
              <el-autocomplete popper-class="my-autocomplete" class="inline-input" style="width: 500px"  v-model="caseSelect" :fetch-suggestions="querySearch" placeholder="搜索说明：输入身份证号"  :select-when-unmatched='true' @select="handleSelect" @change="handleChange">
                <template slot="prepend">选择事项</template>
                <el-button slot="append" type="primary" style="background: #0C8EF6; color: #fff" @click="searchCase">添加</el-button>
                <template slot-scope="{ item }">
                  <div style="border-bottom: 1px solid #ededed">
                    <div class="item1">{{ item.value }}</div>
                    <div class="clearfix">
                      <div class="item2 pull-left">{{ item.value2 }}</div>
                      <div class="item2 pull-right">查获时间：{{ item.value3 }}</div>
                    </div>
                  </div>
                </template>
              </el-autocomplete>
            </div>
            <!-- 查询到的案件详情 -->
            <div class="mt20" v-if="isShowCase">
              <div v-if="isHasCase">
                <div class="title">
                  <i class="el-icon-document text-0C8EF6" style="font-weight: 600"></i>
                  事故详情
                </div>
                <div class="mt10">
                  <i class="el-icon-remove-outline delete-icon cursor"  @click="removeCase"></i>
                  <table border="1" cellspacing="0" style="margin: 0 auto">
                    <tr>
                      <td>人员姓名：</td>
                      <td>{{accidentInfo.suspectName}}</td>
                      <td>身份证：</td>
                      <td>{{accidentInfo.identityCard}}</td>
                    </tr>
                    <tr>
                      <td>人员性别：</td>
                      <td>{{accidentInfo.sex ? '男' : '女'}}</td>
                      <td>驾驶证号码：</td>
                      <td>{{accidentInfo.driverCard || '-'}}</td>
                    </tr>
                    <tr>
                      <td>车辆类型：</td>
                      <!-- 0小型汽车 1大型汽车 2 摩托车 3电动车 4其他 -->
                      <td>{{accidentInfo.carType == 0 ? '小型汽车' : accidentInfo.carType == 1 ? '大型汽车' : accidentInfo.carType == 2 ? '摩托车' : accidentInfo.carType == 3 ? '电动车' : '其他' }}</td>
                      <td style="line-height: 20px">血液乙醇含量：（mg/100ml）</td>
                      <td>{{accidentInfo.ethanolContent}}</td>
                    </tr>
                    <tr>
                      <td>查处类型：</td>
                      <!-- 0事故查获、1设卡查获 -->
                      <td>{{accidentInfo.discoverType ? '设卡查获' : '事故查获'}}</td>
                      <td>查处中队：</td>
                      <td>{{accidentInfo.discoverDept}}</td>
                    </tr>
                    <tr>
                      <td>查处时间：</td>
                      <td>{{accidentInfo.discoverTime}}</td>
                      <td>案件状态：</td>
                      <td>{{accidentInfo.caseStatus == 0 ? '立案' : accidentInfo.caseStatus == 1 ? '破案' : accidentInfo.caseStatus == 2 ? '结案' : '暂无'}}</td>
                    </tr>
                  </table>
                </div>
              </div>
              <div v-else style="height: 200px;text-align: center; padding: 20px;box-sizing: border-box">
                <img src="@/assets/images/empty.png" alt="">
                <div style="color: #a3a3a3">
                  暂无相关案件信息
                </div>
              </div>
            </div>
            <div class="mt20">
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
                  label="人员姓名"
                  prop="suspectName"
                  width="180">
                </el-table-column>
                <el-table-column
                  label="身份证号"
                  prop="identityCard"
                  width="160"
                  >
                </el-table-column>
                <el-table-column
                  label="柜门"
                  prop="doorNo"
                  >
                </el-table-column>
                <el-table-column
                  label="事项编号"
                  prop="eventNo"
                  >
                </el-table-column>
                <el-table-column
                  label="操作"
                  width='200'
                  align="center">
                  <template slot-scope="scope">
                    <el-button type="text" @click="achieveBarcode(scope.row.eventNo)">下载条形码</el-button>
                    <el-button type="text" @click="removeCheck(scope.row.id)">移除登记</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination
                class="mt10"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="pageNum"
                :page-sizes="[5]"
                :page-size="pageSize"
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
  </div>
</template>

<script>
import { download } from '@/utils/global'
import { getBaseSet } from '@/api/systemSettings'
import { getCaseList, getAccidentList, getRegisterCountByTime, toBeStoredList, checkIn, getCounterInfo, removeCheck, achieveBarcode } from '@/api/cabinet'
export default {
  data () {
    return {
      isShowCase: false,
      registerDisabled: true,
      pageNum: 1,
      pageSize: 5,
      total: 0,
      caseSelect: '',
      caseSelectDiscoverTime: '',
      restaurants: [],
      isHasCase: false,
      accidentInfo: {},
      registerTotal: 0,
      storageTotal: 0,
      storePercent:0, //入库率
      storeList: [], // 待存列表
      doorNo: '', // 分配柜号
      sum: 0,
      num: 0,
      cabinetList: [
      {doorNo: 'A-1'}, {doorNo: 'A-2'}, {doorNo: 'A-3'}, {doorNo: 'A-4'}, {doorNo: 'A-5'}, {doorNo: 'A-6'}, {doorNo: 'A-7'}, {doorNo: 'A-8'}, {doorNo: 'A-9'}, {doorNo: 'A-10'},
      {doorNo: 'B-1'}, {doorNo: 'B-2'}, {doorNo: 'B-3'}, {doorNo: 'B-4'}, {doorNo: 'B-5'}, {doorNo: 'B-6'}, {doorNo: 'B-7'}, {doorNo: 'B-8'}, {doorNo: 'B-9'}, {doorNo: 'B-10'}]
    }
  },
  created() {
  },
  mounted() {
    this.getBaseSet()
    // this.restaurants = this.loadAll()
    this.loadAllAccident()
    this.getRegisterCountByTime()
    this.getCounterInfo()
    this.toBeStoredList()
  },
  methods: {
    getBaseSet() {
      let params = {
        cabinetType: 0
      }
      getBaseSet(params).then((res) => {
        this.num = res.data[0].bottomCapacity
      }).catch()
    },
    achieveBarcode(val) {
      let data = {
        ajbh: val
      }
      achieveBarcode(data).then((res) => {
        download('条形码.png', res)
      }).catch()
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
    // 查询所有事故（下拉展示）
    loadAllAccident() {
      let data = {
      }
      getAccidentList(data).then((res) => {
        if (res.result) {
          this.restaurants = res.rows.map((item, index) => {
            return {
              value: item.identityCard,
              value2: item.suspectName,
              value3: item.discoverTime
            }
          })
        }
      }).catch()
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
        // 获取事故列表
        let data = {
          search: this.caseSelect,
          discoverTime: this.caseSelectDiscoverTime
        }
        getAccidentList(data).then((res) => {
          if (res.result) {
            this.accidentInfo = res.rows[0]
            if (res.rows.length == 0) {
              this.isHasCase = false
            } else {
              if (list.includes(this.caseSelect)) {
                this.isHasCase = true
                this.registerDisabled = false
              } else {
                this.isHasCase = false
              }
            }
          }
        }).catch()
      } else { // 无内容时，不展示表格
        this.isShowCase = false
        this.$message({
          message: '请输入事故名称进行搜索',
          type: 'warning'
        })
      }
    },
    // 选择搜索到的下拉数据时
    handleSelect(item) {
      console.log(item, 76555)
      if (item) {
        // this.isShowCase = true
        this.caseSelect = item.value
        this.caseSelectDiscoverTime = item.value3
        this.isShowCase = false
        this.registerDisabled = true
      }
    },
    handleChange() {
      this.accidentInfo = {}
      this.isShowCase = false
      this.registerDisabled = true
    },
    // 获取柜面信息
    getCounterInfo() {
      let params = {
        cabinetType: 0
      }
      getCounterInfo(params).then((res) => {
        this.sum = res.data.capacity
        // if (res.result) {
        //   this.cabinetList.forEach((item, index) => {
        //     item.surplusSpace = res.data.capacity // 未使用
        //     item.usedSpace = 0 //已使用
        //     item.inExistence = 0
        //     if (res.data.doorInfoList) {
        //       res.data.doorInfoList.forEach((doorItem) => {
        //         if (item.doorNo == doorItem.doorNo) {
        //           item.surplusSpace = doorItem.surplusSpace
        //           item.usedSpace = doorItem.usedSpace
        //           item.inExistence = doorItem.inExistence
        //         } else {
        //           // item.surplusSpace = res.data.capacity // 未使用
        //           // item.usedSpace = 0 //已使用
        //         }
        //       })
        //     } else {
        //       item.surplusSpace = res.data.capacity // 未使用
        //       item.usedSpace = 0 //已使用
        //       item.inExistence = 0
        //     }
        //   })
        // }
        if (res.result) {
          this.cabinetList.forEach((item) => {
            item.surplusSpace = res.data.capacity // 未使用
            item.usedSpace = 0 //已使用
            item.inExistence = 0
            item.sum = res.data.capacity
            if (item.doorNo == 'A-5' || item.doorNo == 'A-10' || item.doorNo == 'B-5' || item.doorNo == 'B-10') {
              item.surplusSpace = this.num // 未使用
              item.usedSpace = 0 //已使用
              item.inExistence = 0
              item.sum = this.num
            }
            if (res.data.doorInfoList) {
              res.data.doorInfoList.forEach((doorItem) => {
                if (item.doorNo == doorItem.doorNo) {
                  item.surplusSpace = doorItem.surplusSpace
                  item.usedSpace = doorItem.usedSpace
                  item.inExistence = doorItem.inExistence
                  if (item.doorNo == 'A-5' || item.doorNo == 'A-10' || item.doorNo == 'B-5' || item.doorNo == 'B-10') {
                    item.surplusSpace = this.num - (item.usedSpace) // 未使用
                  }
                } else {
                  // item.surplusSpace = res.data.capacity // 未使用
                  // item.usedSpace = 0 //已使用
                }
              })
            } else {
              item.surplusSpace = res.data.capacity // 未使用
              item.usedSpace = 0 //已使用
              item.inExistence = 0
              if (item.doorNo == 'A-5' || item.doorNo == 'A-10' || item.doorNo == 'B-5' || item.doorNo == 'B-10') {
                item.surplusSpace = this.num // 未使用
                item.usedSpace = 0 //已使用
                item.inExistence = 0
              }
            }
          })
          console.log(this.cabinetList, 7778)
        }
      }).catch()
    },
    // 登记
    register() {
      console.log(this.cabinetList, 6665)
      const h = this.$createElement;
      this.$msgbox({
        title: '',
        message: h('p', null, [
          h('p', null, [
            h('i', {class: 'el-icon-success', style: 'color: #67C23A; font-size: 18px'}),
            h('span', {style: 'display: inline-block; margin-left: 10px'}, '确认要登记这条信息吗？')
          ]),
          h('p', { style: 'color: #777; font-size: 12px; padding-left: 20px;margin-top: 5px' }, '您确认要登记这条案件信息并生成血样存入条形码')
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
              return (item.usedSpace + item.inExistence) < item.sum
            })
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
              cabinetType: 0,
              doorNo: this.doorNo,
              eventNo: this.accidentInfo.accidentNo,
            }
            checkIn(data).then((res) => {
              this.$message({
                message: res.msg,
                type: 'warning'
              })
              this.caseSelect = ''
              this.isShowCase = false
              this.getRegisterCountByTime()
              this.toBeStoredList()
              this.getCounterInfo()
              this.registerDisabled = true
              done()
            }).catch()
          } else {
            done()
          }
        }
      }).then(action => {
      })
    },
    // 获取登记和入库数量
    getRegisterCountByTime() {
      let params = {
        cabinetType: 0 // 0-检材柜，1-案卷柜，2-财务柜
      }
      getRegisterCountByTime(params).then((res) => {
        this.registerTotal = res.data.registerCount
        this.storageTotal = res.data.storageCount
        if (res.data.registerTotal) {
          this.storePercent = Number(((res.data.storageTotal / res.data.registerTotal) * 100).toFixed(2))
        }
      }).catch()
    },
    // 待办列表
    toBeStoredList() {
      let params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        cabinetType: 0,
        storeStatus: 0 // 0待存，1已存，2取出，3部分在存
      }
      toBeStoredList(params).then((res) => {
        this.storeList = res.rows
        this.total = res.total
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
            this.$message({
              message: res.msg,
              type: 'warning'
            })
            this.toBeStoredList()
            this.getRegisterCountByTime()
        }).catch()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })         
      })
    },
    removeCase() {
      this.isShowCase = false
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.toBeStoredList()
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this.toBeStoredList()
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
      color: #F56C6C;
      font-size: 20px;
      position: relative;
      left: -340px;
      top: 12px;
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
  // margin-right: 100px;
  // border: 1px solid #ededed;
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
