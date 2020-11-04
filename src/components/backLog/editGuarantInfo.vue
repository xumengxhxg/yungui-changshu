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
            <div class="title">
              基本信息
            </div>
            <el-row :gutter="20" class="pt20">
              <el-col :span="12">
                <el-form-item label="姓名：" prop="name">
                  <el-input v-model="info.name"></el-input>
                </el-form-item>
                <el-form-item label="绑定手机：" prop="phone" >
                  <el-input v-model="info.phone"></el-input>
                </el-form-item>
                <el-form-item label="性别：" prop="sex" >
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
              </el-col>
              <el-col :span="12">
                <el-form-item label="身份证号：" prop="idNum" >
                  <el-input v-model="info.idNum"></el-input>
                </el-form-item>
                <el-form-item label="地址：" prop="address" >
                  <el-input v-model="info.address" class="d-in-block" style="width: 90%" disabled></el-input>
                  <i class="el-icon-location-information map" @click="mapSearch"></i>
                </el-form-item>
              <!-- <el-form-item label="照片上传：" prop='picture'>
                <el-upload
                  ref="permitUpload"
                  accept=".jpg, .png, .JPG, .PNG, .pdf"
                  :action="imageUploadUrl"
                  :headers='header'
                  show-file-list
                  :file-list="info.picture"
                  multiple
                  :disabled="isImageUploading"
                  :on-progress="handleImageUploadProgress"
                  :on-success="handleImageSuccess"
                  :before-upload="beforeImageUpload"
                  :on-remove="handleRemove"
                >
                  <el-button size="small" type="primary" style="display: inline-block">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip ml10" style="display: inline-block">提示：仅允许上传 “jpg” 或 “png”格式文件！且最多不能超过10MB</div>
                </el-upload>
              </el-form-item> -->
              </el-col>
            </el-row>
            <!-- 基本信息结束 -->
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
import { getSelectUnitTree } from '@/api/policeStation'
import { dealGuarantee } from '@/api/backLog'
import MapSearch from '@/components/backLog/mapSearch'
import { updateGuarantee, getGuaranteeById } from '@/api/guarantorManagement'
export default {
  components: {
    MapSearch,
    Treeselect
  },
  data () {
    return {
      header:{},
      id: '',
      info: {
        name: '',
        phone: '',
        sex: '',
        actionCompany: '',
        idNum: '',
        address: '',
        // picture: []
      }, // 信息
      mapSearchDialogVisible: false, // 地图搜索
      locationInfo: {}, // 位置信息
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
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
        idNum: [
          { required: true, message: '请输入身份证号', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入地址', trigger: 'blur' }
        ]
        // picture: [
        //   { required: true, message: '请上传照片', trigger: 'change' }
        // ]
      },
      // imageUploadUrl: process.env.VUE_APP_BASE_API + 'api/pendingjudge/common/upload', // 上传的图片服务器地址
      //  imageUploadUrl: process.env.VUE_APP_BASE_API.substring(0, process.env.VUE_APP_BASE_API.lastIndexOf('/')) + '/pendingjudge/common/upload', // 上传的图片服务器地址
       imageUploadUrl: 'http://119.3.10.67:8080' + '/pendingjudge/common/upload',
       isImageUploading: false,
       type: '',
       handleDepOptions: [],
       selectTreeNodeLabel: ''
    }
  },
  created() {
    this.getSelectUnitTree()
  },
  mounted() {
    this.header.Authorization = localStorage.getItem('token')
    this.id = JSON.parse(this.$route.query.info).id
    this.type = this.$route.query.type
    if (this.type === 1) {
      let infoData = JSON.parse(this.$route.query.info)
      // this.info = this.infoData
      this.info.name = infoData.name
      this.info.phone = infoData.phone
      this.info.idNum = infoData.idCard
      this.info.address = infoData.address
      this.info.sex = infoData.sex && infoData.sex != null ? infoData.sex : ''
      // this.info.picture = infoData.picture ? [infoData.picture] : []
      this.info.actionCompany = infoData.actionCompany
      this.info.password = infoData.password
      this.selectTreeNodeLabel = infoData.companyName ? infoData.companyName : ''
    } else {
      this.getGuaranteeById()
    }
  },
  methods: {
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
    normalizer(node) {
      // console.log(node)
      if (node.children && !node.children.length) {
        delete node.children
      }
      return {
        id: node.num,
        label: node.label,
        children: node.children
      }
    },
    selectTreeNode(node) {
      this.selectTreeNodeLabel = node.label
    },
    getGuaranteeById() {
      let params = {
        id: this.id
      }
      getGuaranteeById(params).then((res) => {
        if (res.code === 200) {
          this.info.name = res.data.name
          this.info.phone = res.data.phone
          this.info.idNum = res.data.idCard
          this.info.address = res.data.address
          this.info.sex = res.data.sex
          // this.info.picture = res.data.picture ? [res.data.picture] : []
          this.info.actionCompany = res.data.actionCompany
          this.selectTreeNodeLabel = res.data.companyName
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
    getParams() {
      let params = {
        actionCompany: this.info.actionCompany, // 执行单位
        companyName: this.selectTreeNodeLabel,
        address: this.info.address, // 地址
        id: this.id,
        idCard: this.info.idNum, // 身份证
        name: this.info.name, // 姓名
        phone: this.info.phone, // 绑定手机
        // picture: this.info.picture[0] || '', // 上传照片
        sex: this.info.sex, // 性别
        password: this.info.password
      }
      return params
    },
    updateGuarantee() {
      let data = this.getParams()
      updateGuarantee(data).then((res) => {
        if (res.code === 200) {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.$router.go(-1)
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
    dealGuarantee() {
      let data = this.getParams()
      dealGuarantee(data).then((res) => {
        if (res.code === 200) {
          this.$message({
            message: '操作成功',
            type: 'success'
          })
          this.$router.go(-1)
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
    // 提交
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.type === 1) {
            this.dealGuarantee()
          } else {
            this.updateGuarantee()
          }
        } else {
          return false
        }
      })
    },
    handleImageUploadProgress(event, file, fileList) {
      this.isImageUploading = true
    },
    handleImageSuccess(response, file, fileList) {
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
    // 照片上传
    beforeImageUpload(file) {
      console.log(file)
      const isImage = ['image/jpeg', 'image/png'].includes(file.type)
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
    handleRemove(file, fileList) {
    },
    saveLocation(val) {
      this.locationInfo = val
      this.info.address = this.locationInfo.address
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
    handleRemove(file, fileList) {
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
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
