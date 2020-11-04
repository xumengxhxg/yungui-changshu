<!-- 编辑待办信息 嫌疑人 -->
<template>
  <div>
    <!-- 标题 -->
    <div class="text-left ph20 pv10">
      <span>
        {{$route.query.title}}
      </span>
      <span class="back" @click="back('info')">
        <i class="el-icon-back"></i>
        返回
      </span>
    </div>
    <div class="content-container">
      <div>
        <div class="pv20 ph10">
          <el-form :model="info" :rules="rules" ref="info" label-width="150px">
            <!-- 基本信息开始 -->
            <div class="title" style="color: #fff">
              基本信息
            </div>
            <el-row :gutter="20" class="pt20">
              <el-col :span="12">
                <el-form-item label="姓名：" prop="name" >
                  <el-input v-model="info.name"></el-input>
                </el-form-item>
                <el-form-item label="绑定手机：" prop="phone" >
                  <el-input v-model="info.phone"></el-input>
                </el-form-item>
                <el-form-item label="性别：" prop="sex">
                  <el-radio-group v-model="info.sex">
                    <el-radio :label="1">男</el-radio>
                    <el-radio :label="0">女</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="执行单位：" prop="actionCompany" >
                  <!-- <el-input v-model="info.actionCompany"></el-input> -->
                  <treeselect
                    :disable-branch-nodes="true"
                    v-model="info.actionCompany"
                    :options="handleDepOptions"
                    :normalizer="normalizer"
                    placeholder="请选择所属执行单位"
                    :style="{width: '240px'}"
                    auto-complete=“new-password”
                    @select='selectTreeNode'
                  />
                </el-form-item>
                <el-form-item label="执行单位警员：" prop="policeId" >
                  <el-select v-model="info.policeId" placeholder="请选择">
                    <el-option
                      v-for="item in policeList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="身份证号：" prop="idCard">
                  <el-input v-model="info.idCard"></el-input>
                </el-form-item>
                <el-form-item label="地址：" prop="address" >
                  <el-input v-model="info.address" class="d-in-block" style="width: 90%" disabled></el-input>
                  <i class="el-icon-location-information map" @click="mapSearch"></i>
                </el-form-item>
               <el-form-item label="照片上传：" prop='picture'>
                <el-upload
                  ref="permitUpload"
                  accept=".jpg, .png, .JPG, .PNG"
                  :action="imageUploadUrl"
                  :headers='header'
                  :file-list='info.picture'
                  show-file-list
                  multiple
                  :limit="1"
                  :disabled="isImageUploading"
                  :on-progress="handleImageUploadProgress"
                  :on-success="handlePhotoSuccess"
                  :before-upload="beforeImageUpload"
                  :on-remove="handleRemovePicture"
                  :on-exceed="handleExceed"
                >
                  <el-button size="small" type="primary" style="display: inline-block">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip ml10" style="display: inline-block">提示：仅允许上传 “jpg” 或 “png”格式文件！且最多不能超过10MB</div>
                </el-upload>
              </el-form-item>
              </el-col>
            </el-row>
            <!-- 基本信息结束 -->
            <!-- 涉案信息开始 -->
            <div class="title" style="color: #fff">
              涉案信息
            </div>
            <el-row :gutter="20" class="pt20">
              <el-col :span="12">
                <el-form-item label="案件编号：" prop="caseCode" >
                  <el-input v-model="info.caseCode"></el-input>
                </el-form-item>
                <el-form-item label="案件名称：" prop="caseName" >
                  <el-input v-model="info.caseName"></el-input>
                </el-form-item>
                <el-form-item label="执行开始时间：" prop="caseStartTime">
                  <el-date-picker
                    v-model="info.caseStartTime"
                    type="date"
                    value-format='yyyy-MM-dd'
                    placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="管控状态：" prop="controlStatus" >
                  <el-select v-model="info.controlStatus" placeholder="请选择">
                    <el-option-group
                      v-for="group in statusOptions"
                      :key="group.label"
                      :label="group.label">
                      <el-option
                        v-for="item in group.options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-option-group>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="措施类型：" prop="measuresType" >
                  <el-radio-group v-model="info.measuresType" @change="changeMeasureType">
                    <el-radio :label="1">取保候审</el-radio>
                    <el-radio :label="0">监视居住</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="是否实质性侦查：" prop="realCheck" v-if="info.measuresType === 1">
                  <el-switch v-model="info.realCheck">
                  </el-switch>
                </el-form-item>
                <el-form-item label="监测等级：" prop="monitorLevel" >
                  <el-select v-model="info.monitorLevel" placeholder="请选择监测等级">
                    <el-option
                      v-for="item in monitorLevelOptions"
                      :label="item.label"
                      :value="item.value"
                      :key="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="情况描述：">
              <el-input type="textarea" v-model="info.description" placeholder="请输入情况" :rows="3"></el-input>
            </el-form-item>
             <el-form-item label="附件上传：" style="width: 50%">
              <el-upload
                  ref="permitUpload"
                  :action="imageUploadUrl"
                  :headers='header'
                  :file-list='info.enclosure'
                  show-file-list
                  multiple
                  :limit="1"
                  :disabled="isEnclosureUploading"
                  :on-progress="handleEnclosureUploadProgress"
                  :on-success="handleEnclosureSuccess"
                  :before-upload="beforeFileUpload"
                  :on-remove="handleRemoveEnclosure"
                  :on-exceed="handleExceed"
                >
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip ml10" style="display: inline-block">提示：最多不能超过10MB</div>
                </el-upload>
            </el-form-item>
            <!-- 涉案信息结束 -->
            <!-- 人员绑定开始 -->
            <div class="title" style="color: #fff">
              人员绑定
            </div>
            <el-row :gutter="20" class="pt20">
              <el-col :span="12">
                <el-form-item label="是否需要保证人：">
                  <el-switch
                    v-model="isNeedGuarantor">
                  </el-switch>
                </el-form-item>
              </el-col>
              <el-col :span="12" v-if="isNeedGuarantor">
                <el-form-item label="保证人：" prop="guaranteeId" >
                  <el-select v-model="info.guaranteeId" placeholder="请选择">
                    <el-option
                      v-for="item in guarantorList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="办案单位：">
                  <treeselect
                    :disable-branch-nodes="true"
                    v-model="info.handleDept"
                    :options="handleDepOptions2"
                    :normalizer="normalizer2"
                    placeholder="请选择所属办案单位"
                    :style="{width: '240px'}"
                    auto-complete=“new-password”
                    @select='selectTreeNode2'
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="办案单位警员：">
                  <el-select v-model="info.handleId" placeholder="请选择" @change="changeHandlePolice">
                    <el-option
                      v-for="item in handlePoliceList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 人员绑定结束 -->
          </el-form>
        </div>
      </div>
      <div class="footer-btn">
        <el-button type="primary" style="width: 200px" @click="submit('info')">确认</el-button>
        <el-button type='primary' plain style="width: 200px" @click="back('info')">取消</el-button>
      </div>
    </div>
    <div v-if="mapSearchDialogVisible">
      <map-search :dialogVisible='mapSearchDialogVisible' @update='updateShow' @save='saveLocation'></map-search>
    </div>
  </div>
</template>

<script>
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { getSelectUnitTree, getUnitTree } from '@/api/policeStation'
import { formatDate } from '@/utils/global'
import MapSearch from '@/components/backLog/mapSearch'
import { updateSuspect, getSuspect, getPoliceByDept } from '@/api/suspectManagement'
import { dealGuarantee, dealSuspect } from '@/api/backLog'
import { getPoliceList } from '@/api/policeList'
import { getGuaranteeList } from '@/api/guarantorManagement'
import { getMonitorLevelList } from '@/api/detectionLevel'
export default {
  components: {
    MapSearch,
    Treeselect
  },
  data () {
    return {
      header:{
      },
      policeList: [],
      handlePoliceList: [], // 办案单位警员
      guarantorList: [],
      info: {
        name: '',
        phone: '',
        sex: '',
        actionCompany: null,
        idCard: '',
        address: '',
        picture: [],
        caseCode: '',
        caseName: '',
        caseStartTime: '',
        controlStatus: '',
        measuresType: '',
        realCheck: '',
        monitorLevel: '',
        description: '',
        enclosure: [],
        policeId: '',
        // isNeedGuarantor: '',
        guaranteeId: '',
        handleDept: '',
        handleId: ''
      }, // 信息
      mapSearchDialogVisible: false, // 地图搜索
      locationInfo: {}, // 位置信息
      statusOptions: [],
      monitorLevelOptions: [], // 监测等级选项
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        actionCompany: [
          { required: true, message: '请输入执行单位', trigger: 'blur' }
        ],
        idCard: [
          { required: true, message: '请输入身份证号', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入地址', trigger: 'blur' }
        ],
        picture: [
          { required: true, message: '请上传照片', trigger: 'change' }
        ],
        caseCode: [
          { required: true, message: '请输入案件编号', trigger: 'blur' }
        ],
        caseName: [
          { required: true, message: '请输入案件名称', trigger: 'blur' }
        ],
        caseStartTime: [
          { required: true, message: '请选择开始时间', trigger: 'blur' }
        ],
        controlStatus: [
          { required: true, message: '请选择管控状态', trigger: 'change' }
        ],
        measuresType: [
          { required: true, message: '请选择措施类型', trigger: 'change' }
        ],
        monitorLevel: [
          { required: true, message: '请输入监测等级', trigger: 'change' }
        ],
        policeId: [
          { required: true, message: '请选择警员', trigger: 'change' }
        ],
        guaranteeId: [
          { required: true, message: '请选择保证人', trigger: 'change' }
        ]
      },
      id: '',
      measuresType: '',
      caseStartTime: '',
      controlStatus: '',
      isImageUploading: false,
      isEnclosureUploading: false,
      isNeedGuarantor: false, // 是否需要保证人
      // imageUploadUrl: process.env.VUE_APP_BASE_API + 'api/pendingjudge/common/upload',// 上传的图片服务器地址
      // imageUploadUrl: process.env.VUE_APP_BASE_API.substring(0, process.env.VUE_APP_BASE_API.lastIndexOf('/')) + '/pendingjudge/common/upload', // 上传的图片服务器地址
      imageUploadUrl: 'http://119.3.10.67:8080' + '/pendingjudge/common/upload',
      type: '', // 1-新增 2-编辑
      lat: '', //纬度
      lng: '', //经度
      handleDepOptions: [],
      handleDepOptions2: [],
      selectTreeNodeLabel: '', // 执行单位树形选择器选中节点的名称
      selectTreeNodeLabel2: '' //办案单位
    }
  },
  created() {
    this.getSelectUnitTree()
    this.getUnitTree()
    console.log(process.env.VUE_APP_BASE_API)
    console.log(process.env.VUE_APP_BASE_API.substring(0, process.env.VUE_APP_BASE_API.lastIndexOf('/')))
  },
  mounted() {
    this.header.Authorization = localStorage.getItem('token')
    this.id = JSON.parse(this.$route.query.info).id
    if (this.$route.query.type) {
      this.type = this.$route.query.type
    }
    if (this.type === 1) { // 新增
      let infoData = JSON.parse(this.$route.query.info)
      this.info = infoData
      this.info.picture = infoData.picture && infoData.picture.url ? [infoData.picture] : []
      this.info.enclosure = infoData.enclosure && infoData.enclosure.url ? [infoData.enclosure] : []
      this.isNeedGuarantor = Boolean(infoData.guaranteeId)
      this.info.sex = this.info.sex != null ? this.info.sex : ''
      this.info.policeId = this.info.policeId ? this.info.policeId : ''
      this.info.measuresType = this.info.measuresType ? this.info.measuresType : ''
      this.info.controlStatus = this.info.controlStatus ? this.info.controlStatus : ''
      this.info.monitorLevel = this.info.monitorLevel ? this.info.monitorLevel : ''
      this.info.address = this.info.address ? this.info.address : ''
      // 保存措施状态和开始时间
      this.measuresType = this.info.measuresType
      this.caseStartTime = this.info.caseStartTime ? this.info.caseStartTime : ''
      this.controlStatus = this.info.controlStatus ? this.info.controlStatus : ''
      this.info.actionCompany = this.info.actionCompany ? this.info.actionCompany : null
      this.getMeasure(this.info.measuresType)
      this.selectTreeNodeLabel = this.info.companyName ? this.info.companyName : ''
      this.selectTreeNodeLabel2 = this.info.deptName ? this.info.deptName : ''
      this.info.handleDept = this.info.handleDept ? this.info.handleDept : null
      this.info.handleId = this.info.handleId ? this.info.handleId : ''
      this.info.caseName = this.info.caseName ? this.info.caseName : ''
      // 办案单位
      if (this.info.handleDept) {
        this.getHandlePoliceList(this.info.handleDept, 1)
      }
      // 执行单位
      if (this.info.actionCompany) {
        this.getHandlePoliceList(this.info.actionCompany, 0)
      }
    } else { // 编辑
      this.getSuspect()
    }
    this.getGuaranteeList()
    this.getMonitorLevelList()
  },
  methods: {
    // 获取监测等级
    getMonitorLevelList() {
      let params = {}
      getMonitorLevelList(params).then((res) => {
        this.monitorLevelOptions = res.rows.map((item) => {
          return {
            label: item.monitorLevel,
            value: item.id
          }
        })
      }).catch()
    },
     // 获取执行单位拉下框数据
    getSelectUnitTree() {
      let params = {
        unitNo: localStorage.getItem('deptNo')
      }
      getSelectUnitTree(params).then((res) => {
        if (res.code === 200) {
          this.handleDepOptions = res.data
        } else {
          this.$message({
            message: res.message,
            type: 'warning'
          })
        }
      }).catch((err) => {
        this.$message({
          message: err,
          type: 'warning'
        })
      })
    },
    // 获取执行单位拉下框数据
    getUnitTree() {
      let params = {
        unitNo: '',
        unitName: ''
      }
      getUnitTree(params).then((res) => {
        if (res.code === 200) {
          this.handleDepOptions2 = res.data
        } else {
          this.$message({
            message: res.message,
            type: 'warning'
          })
        }
      }).catch((err) => {
        this.$message({
          message: err,
          type: 'warning'
        })
      })
    },
    // 选择执行单位改变时
    selectTreeNode(node) {
      console.log(node, 876)
      this.selectTreeNodeLabel = node.label
      this.getHandlePoliceList(node.num, 0)
      this.info.policeId = ''
    },
    //选择办案单位改变时
    selectTreeNode2(node) {
      this.selectTreeNodeLabel2 = node.unitName
      this.getHandlePoliceList(node.unitNo, 1)
      this.info.handleId = ''
    },
    // 选择办案单位警员
    changeHandlePolice(val) {
      if (this.selectTreeNodeLabel2 || this.info.handleDept) {
        this.$set(this.info, 'handleId', val)
      } else {
        this.$message({
          type: 'warning',
          message: '请先选择办案单位'
        })
        this.info.handleId = ''
      }
    },
    normalizer(node) {
      if (node.children && !node.children.length) {
        delete node.children
      }
      return {
        id: node.num,
        label: node.label,
        children: node.children
      }
    },
    normalizer2(node) {
      if (node.children && !node.children.length) {
        delete node.children
      }
      return {
        id: node.unitNo,
        label: node.unitName,
        children: node.children
      }
    },
    // 获取担保人列表
     getGuaranteeList() {
      let params = {
        name: '',
        idCard: '',
        pageNum: '',
        pageSize: ''
      }
      getGuaranteeList(params).then((res) => {
        if (res.code === 200) {
          this.guarantorList = res.rows
        } else {
          this.$message({
            type: 'warning',
            message: res.message || res.msg
          })
        }
      }).catch((err) => {
        this.$message({
          type: 'warning',
          message: err
        })
      })
    },
    // 根据单位获取警员
    getHandlePoliceList(num, val) {
       let data = {
        deptNo: num
      }
      getPoliceByDept(data).then((res) => {
        if (res.code === 200) {
          if (val) { // 办案单位
            this.handlePoliceList = res.data
          } else {
            this.policeList = res.data
          }
        } else {
          this.$message({
            type: 'warning',
            message: res.message || res.msg
          })
        }
      }).catch((err) => {
        this.$message({
          type: 'warning',
          message: err
        })
      })
    },
    // 获取所有警员
    getPoliceList() {
      let data = {
      }
      getPoliceList(data).then((res) => {
        if (res.code === 200) {
          this.policeList = res.rows
        } else {
          this.$message({
            type: 'warning',
            message: res.message || res.msg
          })
        }
      }).catch((err) => {
        this.$message({
          type: 'warning',
          message: err
        })
      })
    },
    // 获取嫌疑人信息
    getSuspect() {
      let params = {
        id: this.id
      }
      getSuspect(params).then((res) => {
        if (res.code === 200) {
          this.info = res.data
          this.info.picture = res.data.picture && res.data.picture.url ? [res.data.picture] : []
          this.info.enclosure = res.data.enclosure && res.data.enclosure.url ? [res.data.enclosure] : []
          this.isNeedGuarantor = Boolean(res.data.guaranteeId)
          this.info.sex = this.info.sex != null ? this.info.sex : ''
          this.info.policeId = this.info.policeId ? this.info.policeId : ''
          // 保存测试状态和开始时间
          this.measuresType = this.info.measuresType
          this.caseStartTime = this.info.caseStartTime
          this.controlStatus = this.info.controlStatus
          this.getMeasure(this.info.measuresType)
          this.info.actionCompany = this.info.actionCompany ? this.info.actionCompany : null
          this.info.handleDept = this.info.handleDept ? this.info.handleDept : null
          this.info.handleId = this.info.handleId ? this.info.handleId : ''
          this.info.caseName = this.info.caseName ? this.info.caseName : ''
          this.selectTreeNodeLabel = this.info.companyName ? this.info.companyName : ''
          this.selectTreeNodeLabel2 = this.info.deptName ? this.info.deptName : ''
          // 办案单位
          if (this.info.handleDept) {
            this.getHandlePoliceList(this.info.handleDept, 1)
          }
          // 执行单位
          if (this.info.actionCompany) {
            this.getHandlePoliceList(this.info.actionCompany, 0)
          }
        } else {
          this.$message({
            type: 'warning',
            message: res.message || res.msg
          })
        }
      }).catch((err) => {
        this.$message({
          type: 'warning',
          message: err
        })
      })
    },
    getMeasure(val) {
      if (val) { // 取保候审
        if (this.type === 1) { // 新增
           this.statusOptions = [{
            label: '管控中',
            options: [{
              value: 0,
              label: '取保候审中'
            }, {
              value: 1,
              label: '移送审查'
            }]
          }]
        } else { // 编辑
          this.statusOptions = [{
            label: '管控中',
            options: [{
              value: 0,
              label: '取保候审中'
            }, {
              value: 1,
              label: '移送审查'
            }]
          }, {
            label: '管控解除',
            options: [{
              value: 2,
              label: '解除取保候审'
            }, {
              value: 3,
              label: '逮捕'
            }, {
              value: 4,
              label: '刑拘'
            }]
          }]
        }
      } else { // 监视居住
        if (this.type === 1) { // 新增
          this.statusOptions = [{
            label: '管控中',
            options: [{
              value: 0,
              label: '监视居住中'
            }, {
              value: 1,
              label: '移送审查'
            }]
          }]
        } else { // 编辑
          this.statusOptions = [{
            label: '管控中',
            options: [{
              value: 0,
              label: '监视居住中'
            }, {
              value: 1,
              label: '移送审查'
            }]
          }, {
            label: '管控解除',
            options: [{
              value: 2,
              label: '解除监视居住'
            }, {
              value: 3,
              label: '逮捕'
            }, {
              value: 4,
              label: '刑拘'
            }]
          }]
        }
      }
    },
    changeMeasureType(val) {
      this.getMeasure(val)
      if (val !== '' && this.measuresType !== '' && val !== this.measuresType) { // 当状态和初始状态不同时，默认展示当前时间
        // this.info.caseStartTime = formatDate(new Date().getTime())
        this.$set(this.info, 'caseStartTime', formatDate(new Date().getTime()))
        // 当切换措施类型时，管控状态的选中需要清空
        this.$set(this.info, 'controlStatus', '')
      } else { //相同时，保持原来的时间
        // this.info.caseStartTime = this.caseStartTime
        this.$set(this.info, 'caseStartTime', this.caseStartTime)
        this.$set(this.info, 'controlStatus', this.controlStatus)
      }
    },
    getParams() {
      let endTime
      if (this.info.measuresType) {
        endTime = formatDate(new Date(this.info.caseStartTime).getTime() + 12*30*24*60*60*1000)
      } else {
        endTime = formatDate(new Date(this.info.caseStartTime).getTime() + 6*30*24*60*60*1000)
      }
      let params = {
        actionCompany: this.info.actionCompany, // 执行单位
        companyName: this.selectTreeNodeLabel, // 执行单位名称
        address: this.info.address, // 地址
        caseCode: this.info.caseCode, // 案件编号
        caseName: this.info.caseName, // 案件名称
        caseStartTime: this.info.caseStartTime, // 执行开始时间
        caseEndTime: endTime, // 结束时间
        controlStatus: this.info.controlStatus, // 管控状态
        description: this.info.description, // 情况描述
        enclosure: this.info.enclosure &&  this.info.enclosure.length > 0 ? this.info.enclosure[0] : {}, // 附件上传
        guaranteeId: this.isNeedGuarantor ? this.info.guaranteeId : '', // 保证人
        id: this.id,
        idCard: this.info.idCard, // 身份证
        measuresType: this.info.measuresType, // 措施类型
        monitorLevel: this.info.monitorLevel, // 监测等级
        name: this.info.name, // 姓名
        phone: this.info.phone, // 绑定手机
        picture: this.info.picture && this.info.picture.length > 0 ? this.info.picture[0] : {}, // 上传照片
        policeId: this.info.policeId, // 警号
        realCheck: this.info.realCheck ? 1 : 0, // 是否实质性侦查
        sex: this.info.sex, // 性别
        latitude: this.lat, // 纬度
        longitude: this.lng, // 经度
        password: this.info.password ? this.info.password : '',
        handleDept: this.info.handleDept ? this.info.handleDept : '', // 办案单位编号
        deptName: this.selectTreeNodeLabel2 || '', // 办案单位名称
        handleId: this.info.handleId || '', // 办案警员的id
      }
      return params
    },
    // 提交
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = this.getParams()
          console.log(params, 987650)
          if (this.type === 1) { // 新增嫌疑人
            dealSuspect(params).then((res) => {
              console.log(res, 99977)
              if (res.code === 200) {
                this.$message({
                  message: '操作成功',
                  type: 'success'
                })
                this.$router.go(-1)
              } else {
                this.$message({
                  message: res.message || res.msg,
                  type: 'warning'
                })
              }
            }).catch((err) =>  {
              this.$message({
                type: 'warning',
                message: err
              })
            })
          } else { // 编辑嫌疑人
            updateSuspect(params).then((res) => {
              if (res.code === 200) {
                this.$message({
                  message: '修改成功',
                  type: 'success'
                })
                this.$router.go(-1)
              } else {
                this.$message({
                  message: res.message || res.msg,
                  type: 'warning'
                })
              }
            }).catch((err) => {
              this.$message({
                type: 'warning',
                message: err
              })
            })
          }
        } else {
          return false
        }
      })
    },
    saveLocation(val) {
      this.locationInfo = val
      this.info.address = this.locationInfo.address
      this.lat = this.locationInfo.point.lat // 纬度
      this.lng = this.locationInfo.point.lng // 经度
      this.$refs.info.validateField('address')
    },
    mapSearch() {
      this.mapSearchDialogVisible = true
    },
    updateShow(val) {
      this.mapSearchDialogVisible = val
    },
    back(formName) {
      this.$router.go(-1)
      this.$refs[formName].resetFields()
      this.info = {}
    },
    handleImageUploadProgress(event, file, fileList) {
      this.isImageUploading = true
    },
    handleEnclosureUploadProgress(event, file, fileList) {
      this.isEnclosureUploading = true
    },
    // 照片上传成功处理
    handlePhotoSuccess(response, file, fileList) {
      this.isImageUploading = false
      let obj = {
        name: file.name,
        // uid: file.uid,
        url: response.url,
        fileName: response.fileName
      }
      this.info.picture = [obj]
      this.$refs.info.validateField('picture')
    },
    handleEnclosureSuccess(response, file, fileList) {
      this.isEnclosureUploading = false
      let obj = {
        name: file.name,
        // uid: file.uid,
        url: response.url,
        fileName: response.fileName
      }
      this.info.enclosure = [obj]
    },
    // 照片上传
    beforeImageUpload(file) {
      const isImage = ['image/jpeg', 'image/png'].includes(file.type)
      console.log(isImage)
      if (!isImage) {
        this.$message.error('上传的文件只能是 “jpg” 或 “png”格式!')
      }
      const fileSize = file.size
      if (fileSize >= 10485760) {
        this.$message.error('上传的文件不能超过10M')
        return
      }
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        this.imgStream = reader.result
      }
      return isImage
    },
    // 附件上传
    beforeFileUpload(file) {
      const fileSize = file.size
      if (fileSize >= 10485760) {
        this.$message.error('上传的文件不能超过10M')
        return
      }
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        this.imgStream = reader.result
      }
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    handleRemovePicture(file, fileList) {
      this.info.picture = []
    },
    handleRemoveEnclosure(file, fileList) {
      this.info.enclosure = []
    }
  }
}

</script>

<style scoped>
.back {
  margin-left: 20px;
  display: inline-block;
}
.content-container {
  padding: 10px;
  background: white;
}
.label {
  text-align: right;
  width: 100px;
  display: inline-block;
}
.title {
  text-align: center;
  width: 100%;
  height: 45px;
  line-height: 45px;
  background: #2368A9 100%;
}
.footer-btn {
  width: 100%;
  margin: 0 auto;
  text-align: center;
}
.map {
  font-size: 20px;
  display: inline-block;
  margin-left: 10px;
  color: #409EFF;
}
</style>
