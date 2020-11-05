<!-- 涉案财物柜管理-入库登记-->
<template>
  <div>
    <div class="text-left ph20 pv10">
      涉案财物柜管理/入库登记
    </div>
    <div class="bg-white top-container p20" >
      <div style="border: 1px solid #409eff; width: 100%">
        <div class="triangle-topleft" style="position: absolute">
          <span class="triangle-text">登记</span>
        </div>
        <div class="right-container" style="text-align: center">
          <!-- 登记区域开始 -->
          <div class="pv20">
            <!-- 查询输入框 -->
            <div>
              <el-autocomplete popper-class="my-autocomplete" class="inline-input" style="width: 500px"  v-model="caseSelect" :fetch-suggestions="querySearch" placeholder="搜索说明：输入案件编号"  :select-when-unmatched='true' @select="handleSelect" @change="handleChange">
                <template slot="prepend">选择案件</template>
                <el-button slot="append" type="primary" style="background: #0C8EF6; color: #fff" @click="searchCase">添加</el-button>
                <template slot-scope="{ item }">
                  <div style="border-bottom: 1px solid #ededed">
                    <div class="item1">{{ item.value }}</div>
                    <div class="clearfix">
                      <div class="item2 pull-left">{{ item.value2 }}</div>
                      <!-- <div class="item2 pull-right">查获时间：{{ item.value3 }}</div> -->
                    </div>
                  </div>
                </template>
              </el-autocomplete>
            </div>
            <!-- 查询到的涉案财物 -->
           <div class="property" v-if="isShowCase">
            <div v-if="isHasCase">
               <div class="title">
                    涉案财物
                </div>
                <div class="property-list" >
                  <div>
                    <el-row :gutter="30">
                      <el-col :span="12" class="mb20" v-for="(item, index) in propertyList" :key="index">
                        <div class="clearfix property-item">
                          <div class="pull-left">
                            <img v-show="item.isShowEditBtn" :src="item.fileList[0].url" alt="">
                            <el-upload
                              v-show="!item.isShowEditBtn"
                              list-type="picture-card"
                              ref="permitUpload"
                              :headers='header'
                              :action="imageUploadUrl"
                              :file-list='item.fileList'
                              :disabled="isUploading"
                              :on-progress="handleUploadProgress"
                              :on-success="handleSuccess"
                              :before-upload="beforeFileUpload"
                              :on-remove="handleRemove"
                            >
                              <i slot="default" class="el-icon-plus" style="position: relative; top: -20px"></i>
                            </el-upload>
                          </div>
                          <div class="pull-left pl10 content">
                            <div class="title-1">
                              <span v-show="item.isShowEditBtn" style="display: inline-block; margin-top: 10px">{{item.itemName}}</span>
                              <span v-show="!item.isShowEditBtn">
                                <el-input v-model="item.itemName" size="mini"></el-input>
                              </span>
                            </div>
                            <div class="title-3">
                              <span>数量：</span>
                              <span v-show="item.isShowEditBtn">{{item.itemCount}}</span>
                              <span v-show="!item.isShowEditBtn">
                                <el-input-number v-model="item.itemCount" size="mini" controls-position="right" :min="0"></el-input-number>
                              </span>
                            </div>
                          </div>
                          <span class="btn-group">
                            <i class="el-icon-edit edit cursor" v-if="item.isShowEditBtn" @click="editProperty(item)"></i>
                            <i class="el-icon-delete remove cursor" @click="removeProperty(item, index)"></i>
                          </span>
                          <span>
                            <i class="el-icon-success success cursor" v-if="!item.isShowEditBtn" @click="save(item)"></i>
                            <i class="el-icon-error error cursor" v-if="!item.isShowEditBtn" @click="cancel(item)"></i>
                          </span>
                        </div>
                      </el-col>
                      <!-- 新增财物 -->
                      <el-col :span="12" class="mb20" v-show="isAddProperty">
                        <div class="clearfix property-item">
                          <div class="pull-left">
                            <el-upload
                              list-type="picture-card"
                              ref="permitUpload"
                              :headers='header'
                              :action="imageUploadUrl"
                              :file-list='propertyItem.fileList'
                              :disabled="isUploading"
                              :on-progress="handleUploadProgress"
                              :on-success="handleSuccess"
                              :before-upload="beforeFileUpload"
                              :on-remove="handleRemove"
                            >
                            <i slot="default" class="el-icon-plus" style="position: relative; top: -20px"></i>
                            </el-upload>
                          </div>
                          <div class="pull-left pl10 content">
                            <div class="title-1">
                              <span>
                                <el-input v-model='propertyItem.itemName' size="mini" placeholder="涉案财物名称"></el-input>
                              </span>
                            </div>
                            <div class="title-3">
                              <span>数量：</span>
                              <span>
                                <el-input-number v-model="propertyItem.itemCount" size="mini" controls-position="right" :min="0"></el-input-number>
                              </span>
                            </div>
                          </div>
                          <span class="btn-group">
                            <i class="el-icon-delete remove cursor" @click="removePropertyDialog"></i>
                          </span>
                          <span>
                            <i class="el-icon-success success cursor" @click="savePropertyDialog"></i>
                          </span>
                        </div>
                      </el-col>
                      <!-- 新增财物按钮 -->
                      <el-col :span="12" class="mb20">
                        <div class="property-item cursor"  @click="addProperty" style="text-align: center;height: 120px;line-height: 100px;color: #409EFF">
                          <i class="el-icon-plus"></i>
                          涉案财物
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </div>
            </div>
            <div v-else style="height: 200px;width: 100%;text-align: center; padding: 20px;box-sizing: border-box">
              <img src="@/assets/images/empty.png" alt="">
              <div style="color: #a3a3a3">
                暂无相关事故信息
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
          <el-col :span="15">
            <div class="clearfix">
              <div class="pull-left" :style="isShowPropertyTable ? 'width: 60%' : 'width: 100%'" style="box-sizing: border-box">
                <el-table
                  ref="multipleTable"
                  highlight-current-row
                  class="case"
                  size='mini'
                  :data="storeList"
                  @row-click='rowClick'
                  style="width: 100%; border: 1px solid #ededed; border-bottom: 0px">
                  <el-table-column
                  label="案件编号"
                    prop="caseNo"
                    width="120">
                  </el-table-column>
                  <el-table-column
                    label="案件名称"
                    prop="caseName">
                  </el-table-column>
                  <!-- <el-table-column
                    label="柜门"
                    prop="doorNo">
                  </el-table-column> -->
                  <el-table-column
                    label="操作"
                    width='250'>
                    <template slot-scope="scope">
                      <el-button type="text" @click.stop="achieveBarcode(scope.row.caseNo)">打印条形码</el-button>
                      <el-button type="text" @click.stop="removeCheck(scope.row.id, 1)">全部移除登记</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div v-show="isShowPropertyTable" class="pull-left p10 property" style="width: 40%; box-sizing: border-box;background: #e5e9f2; position: relative;height: 260px;overflow: auto">
                <i class="el-icon-arrow-left back-icon cursor" @click="hide"></i>
                <div>案件内涉案财物（<span>{{propertyTotal}}</span>）</div>
                <ul style="padding-left: 10px; font-size: 12px">
                  <li style="border-bottom: 1px solid #c2c1c1">
                    <el-row style="height: 25px;line-height: 25px">
                      <el-col :span="8">物品名称</el-col>
                      <el-col :span="8">物品编号</el-col>
                      <el-col :span="8" style="text-align: center">
                        操作
                      </el-col>
                    </el-row>
                  </li>
                  <li v-for="(item, index) in property" :key="index" class="p10" style="border-bottom: 1px solid #c2c1c1">
                    <el-row>
                      <el-col :span="8">{{item.itemName}}</el-col>
                      <el-col :span="8">{{item.itemNo}}</el-col>
                      <el-col :span="8" style="text-align: right">
                        <span style="color: #F56C6C; " class="cursor" @click="removeCheck(item.id, 0, item.inventoryId)">移除登记</span>
                      </el-col>
                    </el-row>
                  </li>
                </ul>
              </div>
            </div>
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
          </el-col>
          <el-col :span="9">
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
import { getPropertyCountByTime, getCaseList, getAccidentList, getRegisterCountByTime, toBeStoredList, checkIn, getCounterInfo, removeCheck, getProperty, achieveBarcode2, removeAllPropertyCheck, removeSinglePropertyCheck } from '@/api/cabinet'
export default {
  data () {
    return {
      header: {},
      property: [],
      total: 0,
      pageNum: 1,
      pageSize: 5,
      registerDisabled: true,
      // isShowEditBtn: true,
      propertyList: [],
      imgUpload: [],
      isAddProperty: false,
      isShowPropertyTable: false,
      caseSelect: '',
      caseSelectDiscoverTime: '',
      restaurants: [],
      isShowCase: false,
      isHasCase: false,
      registerTotal: 0,
      storageTotal: 0,
      storePercent: 0,
      storeList: [],
      propertyItem: {
        fileList: [],
        itemName: '',
        itemCount: 0,
        storePicture: ''
      },
      accidentInfo: {},
      doorNo: '', // 分配柜号
      propertyTotal: 0,
      itemName: '',
      currentRow: {},
      currentEditProperty: {},
      isUploading: false,
      // imageUploadUrl: 'http://119.3.10.67:8080' + '/cloudcabinet/common/upload',
      imageUploadUrl: process.env.VUE_APP_BASE_API + '/cloudcabinet/common/upload',
      cabinetList: [
      {doorNo: 'A-1'}, {doorNo: 'A-2'}, {doorNo: 'A-3'}, {doorNo: 'A-4'}, {doorNo: 'A-5'}, {doorNo: 'A-6'}, {doorNo: 'A-7'}, {doorNo: 'A-8'}, {doorNo: 'A-9'}, {doorNo: 'A-10'},
      {doorNo: 'A-11'}, {doorNo: 'A-12'}, {doorNo: 'A-13'}, {doorNo: 'A-14'}, {doorNo: 'A-15'}, {doorNo: 'A-16'}, {doorNo: 'A-17'}, {doorNo: 'A-18'}, {doorNo: 'A-19'}, {doorNo: 'A-20'}]
    }
  },
  created() {
    this.header.Authorization = localStorage.getItem('token')
    this.loadAllAccident()
    this.getCounterInfo()
    this.toBeStoredList()
    this.getRegisterCountByTime()
  },
  mounted() {
  },
  methods: {
    handleUploadProgress(event, file, fileList) {
      this.isUploading = true
    },
    handleSuccess(response, file, fileList) {
      this.isUploading = false
      let obj = {
        name: file.name,
        url: response.url,
        fileName: response.fileName
      }
      // 编辑财物时修改图片上传
      if (!this.isShowEditBtn && !this.isAddProperty) {
        this.currentEditProperty.fileList = [obj]
        this.currentEditProperty.storePicture = response.url
      }
      // 添加采取时图片上传
      if (this.isAddProperty) {
        this.propertyItem.fileList = [obj]
        this.propertyItem.storePicture = response.url
      }
      
    },
    beforeFileUpload(file) {
      console.log(file)
      
      const fileSize = file.size
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      if (fileSize >= 10485760) {
        this.$message.error('上传的文件不能超过10M')
        return false
      }
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
        return false
      }
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        this.imgStream = reader.result
      }
    },
    handleRemove(file, fileList) {
      // this.isUploading = false
      // this.propertyItem.fileList = []
    },
    // 打印条形码
    achieveBarcode(val) {
      let data = {
        // ajbh: '123456342313'
        ajbh: val
      }
      achieveBarcode2(data).then((res) => {
        // var blob = new Blob([res]);
        // const url = window.URL.createObjectURL(blob);
        // console.log(url)
        // const a = document.createElement('a');
        // const fileName = '条形码.png';
        // a.download = fileName;
        // a.href = url;
        // document.body.appendChild(a);
        // a.click();
        // a.remove();
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
        cabinetType: 2
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
    // 获取涉案财物列表
    getProperty() {
      let params = {
        search: this.caseSelect,
        itemStatus: 0 //待存
      }
      getProperty(params).then((res) => {
        if (res.result) {
          this.property = res.rows
          res.rows.map((item) => {
            return {
              itemName: item.itemName,
              itemNo: item.itemNo,
              itemCount: item.itemCount,
              storePicture: item.storePicture || '',
              isShowEditBtn: true
            }
          })
          res.rows.forEach((item) => {
            item.isShowEditBtn = true
          })
          this.propertyList = res.rows
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
          search: this.caseSelect
        }
        getCaseList(data).then((res) => {
          if (res.result) {
            this.accidentInfo = res.rows[0]
          }
          // this.registerDisabled = false
        }).catch()
        // 获取涉案财物列表
        // this.getProperty()
       
      } else { // 无内容时，不展示表格
        this.isShowCase = false
        this.$message({
          message: '请输入人员身份证号进行搜索',
          type: 'warning'
        })
      }
    },
    // 获取柜面信息
    getCounterInfo() {
      let params = {
        cabinetType: 2
      }
      getCounterInfo(params).then((res) => {
        if (res.result) {
          this.cabinetList.forEach((item) => {
            item.usedSpace = 0 //已使用
            if (res.data.doorInfoList) {
              res.data.doorInfoList.forEach((doorItem) => {
                if (item.doorNo == doorItem.doorNo) {
                  // item.surplusSpace = doorItem.surplusSpace
                  item.usedSpace = doorItem.usedSpace
                } else {
                  // item.surplusSpace = res.data.capacity // 未使用
                  // item.usedSpace = 0 //已使用
                }
              })
            } else {
              // item.surplusSpace = res.data.capacity // 未使用
              item.usedSpace = 0 //已使用
            }
          })
        }
      }).catch()
    },
    // 选择搜索到的下拉数据时
    handleSelect(item) {
      if (item) {
        // this.isShowCase = true
        this.caseSelect = item.value
        this.caseSelectDiscoverTime = item.value3
        this.isShowCase = false
        this.registerDisabled = true
      }
    },
    handleChange() {
      this.propertyList = []
      this.isShowCase = false
      this.registerDisabled = true
    },
    rowClick(row) {
      this.currentRow = row
      this.isShowPropertyTable = true
      // 查询涉案财物
      let params = {
        // search: row.eventNo,
        inventoryId: row.inventoryId,
        itemStatus: 0
      }
      getProperty(params).then((res) => {
        if (res.result) {
          this.property = res.rows
          this.propertyTotal = res.total
        }
      }).catch()
    },
    hide() {
      this.isShowPropertyTable = false
    },
    // 添加财物
    addProperty() {
      this.propertyItem = {}
      this.isAddProperty = true
    },
    // 删除添加财物的框
    removePropertyDialog() {
      this.isAddProperty = false
    },
    // 保存添加财物的框
    savePropertyDialog() {
      if (!this.propertyItem.itemName || (!this.propertyItem.itemCount && this.propertyItem.itemCount != 0) || !this.propertyItem.storePicture) {
        this.$message({
          message: '请输入物品名称，物品编号，并上传物品照片',
          type: 'warning'
        })
        return
      }
      this.propertyItem.isShowEditBtn = true
      this.propertyList.push(this.propertyItem)
      // this.isShowEditBtn = true
      this.isAddProperty = false
      this.propertyItem = {}
    },
    // changeImg(e) {
    //   const fileList = e.target.files
    //   fileList.forEach((item, index) => {
    //     item.src = window.URL.createObjectURL(item)
    //   })
    //   const arr = Array.prototype.slice.call(fileList, 0)
    //   this.imgUpload = arr
    // },
    // 编辑
    editProperty(val) {
      this.currentEditProperty = val
      this.itemName = val.itemName
      val.isShowEditBtn = false
      let name = val.itemName
      val.itemName = ''
      val.itemName = name
    },
    // 保存编辑
    save(val) {
      if (!val.itemName || (!val.itemCount && val.itemCount != 0) || !val.storePicture) {
        this.$message({
          message: '请输入物品名称,物品名称，已经上传物品照片',
          type: 'warning'
        })
        return
      }
      let name = val.itemName
      val.itemName = ''
      val.itemName = name
      val.isShowEditBtn = true
    },
    // 删除财物
    removeProperty(item, index) {
      this.propertyList.splice(index, 1)
    },
    // 取消编辑
    cancel(val) {
      let name = this.itemName
      val.itemName = ''
      val.itemName = name
      val.isShowEditBtn = true
    },
    register() {
      const h = this.$createElement;
      this.$msgbox({
        title: '',
        message: h('p', null, [
          h('p', null, [
            h('i', {class: 'el-icon-success', style: 'color: #67C23A; font-size: 18px'}),
            h('span', {style: 'display: inline-block; margin-left: 10px'}, '确认要登记这条信息吗？')
          ]),
          h('p', { style: 'color: #777; font-size: 12px; padding-left: 20px;margin-top: 5px' }, '您确认要登记这条事故信息并生成涉案财物条形码')
        ]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            // 系统自动分配第一个还有剩余空间的柜子
            // let doorItem = {}
            // doorItem = this.cabinetList.find((item) => {
            //   return item.surplusSpace
            // })
            // if (doorItem) {
            //   this.doorNo = doorItem.doorNo
            // } else {
            //   this.$message({
            //     message: '暂时没有空余的柜子',
            //     type: 'warning'
            //   })
            //   return
            // }
            this.propertyList.forEach((item) => {
              delete item.isShowEditBtn
              delete item.fileList
            })
            let data = {
              cabinetType: 2,
              // doorNo: this.doorNo,
              eventNo: this.accidentInfo.caseNo,
              inventoryAttacheDTOs: this.propertyList
            }
            checkIn(data).then((res) => {
              if (res.result) {
                this.$message({
                  message: res.msg,
                  type: 'success'
                })
                done()
                this.caseSelect = ''
                this.isShowCase = false
                this.registerDisabled = true
                this.propertyList = []
                this.getRegisterCountByTime()
                this.toBeStoredList()
                this.getCounterInfo()
              }
            }).catch()
          } else {
            done()
          }
        }
      }).then()
    },
    // 获取登记和入库数量
    getRegisterCountByTime() {
      getPropertyCountByTime().then((res) => {
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
        cabinetType: 2,
        storeStatus: 0 // 0待存，1已存，2取出，3部分在存
      }
      toBeStoredList(params).then((res) => {
        if (res.result) {
          this.storeList = res.rows
          this.total = res.total
          if (res.total) {
            // 查询涉案财物
            let params = {
              // search: res.rows[0].eventNo,
              inventoryId: res.rows[0].inventoryId,
              itemStatus: 0
            }
            getProperty(params).then((res) => {
              if (res.result) {
                this.property = res.rows
                this.propertyTotal = res.total
                this.isShowPropertyTable = true
              }
            }).catch()
          }
        }
      }).catch()
    },
    // 移除登记
    removeCheck(id, val, val2) {
      this.$confirm('确定要移除登记吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let api
        if (val) { // 全部移除
          api = removeAllPropertyCheck
        } else { // 单个移除
          api = removeSinglePropertyCheck
        }
        api(id).then((res) => {
          if (res.result) {
            this.$message({
              message: '移除成功',
              type: 'warning'
            })
            this.getRegisterCountByTime()
            // this.toBeStoredList()
            // 查询涉案财物
            let params = {
              // search: row.eventNo,
              inventoryId: val2,
              itemStatus: 0
            }
            getProperty(params).then((res) => {
              if (res.result) {
                this.property = res.rows
                this.propertyTotal = res.total
              }
            }).catch()
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
    isAddProperty(to) {
      if (to) {
        this.registerDisabled = true
      } else {
        if (this.propertyList.length > 0) {
          this.registerDisabled = false
        } else {
          this.registerDisabled = true
        }
      }
    },
    storeList() {
      this.$nextTick(()=>{
        this.$refs.multipleTable.setCurrentRow(this.storeList[0])
      })
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
  ul:last-child {
    border-bottom: 0px;
  }
}
.top-container {
  display: flex; 
  flex-direction: row;
  .right-container {
    flex: 1;
    .property {
      margin: 20px 150px;
      border: 1px solid #ededed;
      text-align: left;
    }
    .title {
      padding: 10px;
      text-align: left;
      border-bottom: 1px solid #ededed;
    }
    .property-list {
      padding: 40px 40px 20px;
      img {
        width: 100px;
        height: 100px;
      }
      .property-item {
        padding: 10px; 
        height: 120px;
        background: #e8f1fa;
        box-sizing: border-box;
        position: relative;
        .content {
          padding-left: 10px;
          .title-1 {
            // margin-top: 10px;
            font-size: 16px;
            font-weight: 600;
          }
          .title-2 {
            margin-top: 10px;
            font-size: 13px;
          }
          .title-3 {
            margin-top: 5px;
            font-size: 13px;
          }
        }
        .btn-group {
          position: absolute;
          right: 10px;
          .edit {
            display: inline-block;
            margin-right: 10px;
            color: #409EFF;
          }
          .remove {
            color: #F56C6C;
          }
        }
        .success {
          color:  #409EFF;
          position: absolute;
          bottom: 10px;
          right: 10px;
          font-size: 20px;
        }
        .error {
          font-size: 20px;
          color: #E6A23C;
          position: absolute;
          bottom: 10px;
          right: 35px;
        }
      }
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
#files {
  opacity: 0;
  position: absolute;
  left: 10px;
  height: 40px;
  width: 100px;
}
.back-icon {
  position: absolute;
  width: 20px;
  height: 80px;
  background: #b6d7f8;
  height: 60px;
  line-height: 60px;
  top: 100px;
  left: 0px;
  z-index: 1000;
  color: #409EFF;
  font-weight: 600;
}
</style>
