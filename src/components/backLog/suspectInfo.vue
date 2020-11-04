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
          <el-form :model="info"  ref="info" label-width="150px">
            <!-- 基本信息开始 -->
            <div class="title" style="color: #fff">
              基本信息
            </div>
            <el-row :gutter="20" class="pt20">
              <el-col :span="12">
                <el-form-item label="姓名：" prop="name" >
                  {{info.name || '-'}}
                </el-form-item>
                <el-form-item label="绑定手机：" prop="phone" >
                  {{info.phone || '-'}}
                </el-form-item>
                <el-form-item label="性别：" prop="sex">
                  {{info.sex === 1 ? '男' : '女'}}
                </el-form-item>
                <el-form-item label="执行单位：" prop="actionCompany" >
                  <!-- {{info.actionCompany || '-'}} -->
                  {{info.companyName || '-'}}
                </el-form-item>
                <el-form-item label="执行单位警员：" prop="policeId" v-if="$route.query.type !== 'guarantor'" >
                  {{info.policeName || '-'}}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="身份证号：" prop="idCard">
                  {{info.idCard || '-'}}
                </el-form-item>
                <el-form-item label="地址：" prop="address" >
                  {{info.address || '-'}}
                </el-form-item>
               <el-form-item label="照片上传：" prop='photo' v-if="$route.query.type !== 'guarantor'">
                <el-button type="text" @click="watch(info.picture)">查看</el-button>
              </el-form-item>
              </el-col>
            </el-row>
            <!-- 基本信息结束 -->
            <div v-if="$route.query.type !== 'guarantor'">
              <!-- 涉案信息开始 -->
              <div class="title" style="color: #fff">
                涉案信息
              </div>
              <el-row :gutter="20" class="pt20">
                <el-col :span="12">
                  <el-form-item label="案件编号：" prop="caseCode" >
                    {{info.caseCode || '-'}}
                  </el-form-item>
                  <el-form-item label="案件名称：" prop="caseCode" >
                    {{info.caseName || '-'}}
                  </el-form-item>
                  <el-form-item label="执行开始时间：" prop="caseStartTime">
                    {{info.caseStartTime.slice(0, 10) || '-'}}
                  </el-form-item>
                  <el-form-item label="管控状态：" prop="controlStatus" >
                    {{getControlStatusText()}}
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="措施类型：" prop="measuresType" >
                    {{info.measuresType === 1 ? '取保候审' : '监视居住' || '-'}}
                  </el-form-item>
                  <el-form-item label="是否实质性侦查：" prop="realCheck" v-if="info.measuresType === 1">
                    {{info.realCheck === 1 ? '是' : '否'}}
                  </el-form-item>
                  <el-form-item label="监测等级：" prop="monitorLevel" >
                    {{info.monitorLevel === 0 ? '普通' : info.monitorLevel === 1 ? '有前科' : '有重大疾病' || '-'}}
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="情况描述：">
                {{info.description || '-'}}
              </el-form-item>
              <el-form-item label="附件上传：">
                <div class="copyBox">
                  <!-- <el-button class="ml10" type="text" size="medium"
                    v-clipboard:copy="info.enclosure.url"
                    v-clipboard:success="onCopy"
                    v-clipboard:error="onError">点击复制</el-button> -->
                    <el-button type="text" :disabled="!info.enclosure.url" @click="watchEnclosure(info.enclosure.url)">查看附件</el-button>
                </div>
              </el-form-item>
              <!-- 涉案信息结束 -->
              <!-- 人员绑定开始 -->
              <div class="title" style="color: #fff">
                人员绑定
              </div>
              <el-row :gutter="20" class="pt20">
                <el-col :span="12">
                  <el-form-item label="是否需要保证人：">
                    {{info.guaranteeId ? '是' : '否'}}
                  </el-form-item>
                </el-col>
                <el-col :span="12" v-if="info.guaranteeId">
                  <el-form-item label="保证人：" >
                    {{info.guaranteeName || ''}}
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="办案单位：" prop="policeId" >
                    {{info.deptName || '-'}}
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="办案单位警员：">
                    {{info.handleName || '-'}}
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- 人员绑定结束 -->
            </div>
          </el-form>
        </div>
      </div>
      <div class="footer-btn">
        <el-button type='primary' plain style="width: 200px" @click="back('info')">返回</el-button>
      </div>
    </div>
    <el-dialog
      title="预览"
      :visible.sync="dialogVisible"
      width="30%">
      <div>
        <img :src="watchPicture" alt="" style="width: 100%">
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getSuspect } from '@/api/suspectManagement'
import { getGuaranteeById } from '@/api/guarantorManagement'
export default {
  data () {
    return {
      info: {
        name: '',
        phone: '',
        sex: '',
        actionCompany: '',
        idCard: '',
        address: '',
        photo: [],
        caseCode: '',
        caseStartTime: '',
        controlStatus: '',
        measuresType: '',
        realCheck: '',
        monitorLevel: '',
        description: '',
        enclosure: [],
        policeId: '',
        isNeedGuarantor: '',
        guaranteeId: ''
      }, // 信息
      statusOptions: [],
      id: '',
      dialogVisible: false,
      watchPicture: '',
      isImageUploading: false
    }
  },
  created() {
    this.id = JSON.parse(this.$route.query.info).id
    if (this.$route.query.type === 'suspector') {
      this.getSuspect()
      this.getControlStatusText()
    } else if (this.$route.query.type === 'guarantor') {
      this.getGuaranteeById()
    }
  },
  mounted() {
  },
  methods: {
    onCopy() {
      this.$message.success('复制成功!')
    },
    onError() {
      this.$message.error('复制失败!')
    },
    watchEnclosure(val) {
      window.open(val)
    },
    watch(val) {
      this.dialogVisible = true
      this.watchPicture = val.url
    },
    // 获取嫌疑人信息
    getSuspect() {
      let params = {
        id: this.id
      }
      getSuspect(params).then((res) => {
        if (res.code === 200) {
          this.info = res.data
          this.info.isNeedGuarantor = Boolean(res.data.guaranteeId)
        } else {
          this.$message({
            message: res.message || res.msg,
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
    // 获取保证人信息
    getGuaranteeById() {
      let params = {
        id: this.id
      }
      getGuaranteeById(params).then((res) => {
        if (res.code === 200) {
          this.info = res.data
          this.info.photo = res.data.photo ? [res.data.photo] : []
        } else {
          this.$message({
            message: res.message || res.msg,
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
    // 获取
    getControlStatusText() {
      if (this.info.measuresType) {
        switch (this.info.controlStatus) {
          case 0 : this.info.controlStatus = '取保候审中'; break
          case 1 : this.info.controlStatus = '移送审查'; break
          case 2 : this.info.controlStatus = '解除取保候审'; break
          case 3 : this.info.controlStatus = '逮捕'; break
          case 4 : this.info.controlStatus = '刑拘'; break
        }
      } else {
        switch (this.info.controlStatus) {
          case 0 : this.info.controlStatus = '监视居住中'; break
          case 1 : this.info.controlStatus = '移送审查'; break
          case 2 : this.info.controlStatus = '解除监视居住'; break
          case 3 : this.info.controlStatus = '逮捕'; break
          case 4 : this.info.controlStatus = '刑拘'; break
        }
      }
      return this.info.controlStatus
    },
    back(formName) {
      this.$router.go(-1)
      this.$refs[formName].resetFields()
      this.info = {}
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
