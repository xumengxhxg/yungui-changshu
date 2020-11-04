<!-- 取出照片 -->
<template>
  <div class="bg-white p20" style="height: 100%;box-sizing: border-box">

    <div style="border: 1px solid #409eff; width: 100%;height: 100%">
      <div class="triangle-topleft" style="position: absolute">
        <span class="triangle-text">登记</span>
      </div>
      <div style="text-align: center;position: relative; top: 30%">
        <div class="register">
          <div class="mb10">取出物品照片：</div>
          <el-upload
            list-type="picture-card"
            ref="permitUpload"
            :headers='header'
            :action="imageUploadUrl"
            :file-list='fileList'
            :disabled="isUploading"
            :on-progress="handleUploadProgress"
            :on-success="handleSuccess"
            :before-upload="beforeFileUpload"
            :on-remove="handleRemove"
          >
          <i slot="default" class="el-icon-plus" style="position: relative; top: -20px"></i>
          </el-upload>
          <div class="mt10" style="font-size: 12px">只支持jpg/png格式</div>
        </div>
        <el-button style="width: 200px; margin-top: 30px" type="primary" @click="updateItemsStatus">登记</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { updateItemsStatus } from '@/api/cabinet'
export default {
  data () {
    return {
      header: {},
      // imageUploadUrl: 'http://119.3.10.67:8080' + '/cloudcabinet/common/upload',
      imageUploadUrl: process.env.VUE_APP_BASE_API + '/cloudcabinet/common/upload',
      fileList: [],
      isUploading: false,
      id: '',
      isAll: false,
      inventoryId: ''
    }
  },
  mounted() {
    this.isAll = this.$route.query.isAll
    this.id = this.$route.query.id
    this.inventoryId = this.$route.query.inventoryId
    this.header.Authorization = localStorage.getItem('token')
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
      this.fileList = [obj]
    },
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
    handleRemove(file, fileList) {
      // this.isUploading = false
      // this.propertyItem.fileList = []
    },
    updateItemsStatus() {
      this.$confirm('确认取出吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let data = {
          accidentNo: this.isAll ? this.id : '', // 登记全部时要传
          fetchPicture: this.fileList[0].url,
          inventoryId: this.isAll ? this.inventoryId : '', // 登记全部要传
          id: this.isAll ? '' : this.id // 登记单个时要传
        }
        updateItemsStatus(data).then((res) => {
          if (res.result) {
            this.$message.success('登记成功')
            setTimeout(() => {
              this.$router.go(-1)
            }, 1000)
          }
        }).catch()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })      
      })
    }
  }
}

</script>

<style lang='less' scoped>
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
#files {
  opacity: 0;
  position: absolute;
  left: 10px;
  height: 40px;
  width: 100px;
}
</style>
