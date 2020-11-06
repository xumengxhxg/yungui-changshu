<!-- 入库登记 -->
<template>
  <div>
    <div class="text-left ph20 pv10">
      随身物品柜管理/入库登记
    </div>
    <div class="bg-white top-container p20" >
      <div style="border:1px solid rgb(64, 158, 255); width: 100%">
        <div class="triangle-topleft" style="position: absolute">
          <span class="triangle-text">登记</span>
        </div>
        <div class="right-container pv20" style="wisth: 80%; margin: 0 auto">
          <el-form :inline="true"  class="demo-form-inline">
            <el-form-item label="嫌疑人：">
              <el-input v-model="suspect" size="small" placeholder="嫌疑人"></el-input>
            </el-form-item>
            <el-form-item label="身份证：">
              <el-input v-model="idCard" size="small" placeholder="身份证"></el-input>
            </el-form-item>
          </el-form>
          <i class="el-icon-circle-plus" style="color: #409EFF" @click="addEffects(0)"></i>
          <el-table
            size='small'
            :data="tableData"
            style="width: 100%;">
            <el-table-column
              prop="name"
              label="物品名称">
            </el-table-column>
            <el-table-column
              prop="num"
              label="物品数量"
              width="180">
            </el-table-column>
            <el-table-column
              label="操作"
              width="180">
              <template slot-scope="scope">
                <el-button type="text" @click="editEffects(scope.row, scope.$index)">编辑</el-button>
                <el-button type="text" @click="deleteEffectsInRegister(scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="mt20 clearfix">
            <div class="pull-left">图片上传：</div>
            <div>
              <!-- <el-upload
                class="pull-left ph20"
                action="#"
                :file-list='pictureUpload'
                list-type="picture-card"
                :auto-upload="false"
                :on-success="handleSuccess"
                :on-change="reChangeImg" >
                  <i slot="default" class="el-icon-plus" style="position: relative; top: -20px"></i>
              </el-upload> -->
                <el-upload
                  list-type="picture-card"
                  ref="permitUpload"
                  :headers='header'
                  :action="imageUploadUrl"
                  :file-list='pictureUpload'
                  :disabled="isUploading"
                  :on-progress="handleUploadProgress"
                  :on-success="handleSuccess"
                  :before-upload="beforeFileUpload"
                  :on-remove="handleRemove"
                >
                <i slot="default" class="el-icon-plus" style="position: relative; top: -20px"></i>
                </el-upload>
            </div>
          </div>
          <div class="mt20">
            <el-input placeholder="点击选择柜门" v-model="selectDoorNo" style="width: 500px;" @focus="selectCabinet">
              <template slot="prepend">分配柜门</template>
            </el-input>
          </div>
          <div class="mt40" style="text-align: center">
            <el-button type='primary' style="width: 200px"  @click="register">登记</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-white p20">
      <!-- 待存列表 -->
      <div style="text-align: center">待存列表</div>
      <div style="width: 80%; margin: 0 auto">
        <el-table
          :data="storelist">
          <el-table-column
            prop="suspectName"
            label="嫌疑人"
            width="180">
          </el-table-column>
          <el-table-column
            prop="identityCard"
            label="身份证"
            width="180">
          </el-table-column>
          <el-table-column
            label="柜号"
            prop="doorNo"
            align="center">
          </el-table-column>
          <el-table-column
            label="存入图片">
            <template slot-scope="scope">
              <el-button type="text" @click="outPicture(scope.row.storePicture)" >存入照片</el-button>
            </template>
          </el-table-column>
          <el-table-column
            label="随身物品">
            <template slot-scope="scope">
              <el-button type="text" @click="effectsManagementFn(scope.row.id)">物品列表管理</el-button>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width='200'>
            <template slot-scope="scope">
              <el-button type="text" @click="addEffects(1, scope.row.id)">新增随身物品</el-button>
              <el-button type="text" @click="editSuspect(scope.row)">编辑</el-button>
              <el-button type="text" @click="deleteSuspect(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="clearfix pt20">
          <el-pagination
            class="pull-right"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageNum"
            :page-sizes="[5, 10]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
      </div>
      
    </div>
    
    <!-- 物品新增编辑 -->
     <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="30%">
      <el-form :model="effectsInfo" label-width="80px">
        <el-form-item label="物品名称：" >
          <el-input v-model="effectsInfo.name" autocomplete="off" size="small"></el-input>
        </el-form-item>
        <el-form-item label="物品数量：" >
          <el-input-number size="small" v-model="effectsInfo.num" :min="0"></el-input-number>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </span>
    </el-dialog>
    <!--物品列表管理 -->
    <el-dialog
      title="物品列表管理"
      :visible.sync="listDialogVisible"
      width="30%">
      <el-table
        size='small'
        :data="effectsList"
        style="width: 100%;">
        <el-table-column
          prop="itemName"
          label="物品名称">
        </el-table-column>
        <el-table-column
          prop="itemCount"
          label="物品数量"
          width="180">
        </el-table-column>
        <el-table-column
          label="操作"
          width="120">
          <template slot-scope="scope">
            <el-button type="text" @click="deleteEffects(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="cancel">取 消</el-button> -->
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑嫌疑人 -->
    <el-dialog
      title="编辑"
      :visible.sync="suspectDialogVisible"
      width="30%">
       <el-form :model="suspectInfo" label-width="100px">
        <el-form-item label="嫌疑人姓名：" >
          <el-input v-model="suspectInfo.name" autocomplete="off" size="small"></el-input>
        </el-form-item>
        <el-form-item label="嫌疑人身份证：" >
          <el-input v-model="suspectInfo.idCard" autocomplete="off" size="small"></el-input>
        </el-form-item>
        <el-form-item label="图片上传：" >
          <!-- <el-upload
            class="pull-left ph20"
            action="#"
            :file-list='suspectInfo.pictureUpload'
            list-type="picture-card"
            :auto-upload="false"
            :on-success="handleSuccess"
            :on-change="changeImg" >
              <i slot="default" class="el-icon-plus" style="position: relative; top: -20px"></i>
          </el-upload> -->
          <el-upload
            list-type="picture-card"
            ref="permitUpload"
            :headers='header'
            :action="imageUploadUrl"
            :file-list='suspectInfo.pictureUpload'
            :disabled="isUploading"
            :on-progress="handleUploadProgress"
            :on-success="handleSuccess2"
            :before-upload="beforeFileUpload"
            :on-remove="handleRemove"
          >
          <i slot="default" class="el-icon-plus" style="position: relative; top: -20px"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelEditSuspect">取 消</el-button>
        <el-button type="primary" @click="saveEditSuspect">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 图片 -->
     <el-dialog
      title="照片"
      :visible.sync="pictureDialogVisible"
      width="30%">
      <img :src="picture" alt="" style="width: 100%">
    </el-dialog>
    <div v-if="selectCabinetDialogVisible">
      <select-cabinet :dialogVisible='selectCabinetDialogVisible' @update='updateCabinetDialogVisible' @selectCabinet='selectDoor'></select-cabinet>
    </div>
  </div>
</template>

<script>
import { checkIn, toBeStoredList, getPersonalItemList, getProperty, updateSuspect, addPersonalItem, removePersonalItemCheck, removeCheck } from '@/api/cabinet'
import selectCabinet from '@/components/effectsManagement/selectCabinet'
export default {
  components: {
    selectCabinet
  },
  data () {
    return {
      header: {},
      title: '',
      suspect: '',
      idCard: '',
      tableData: [],
      storelist: [],
      dialogVisible: false,
      listDialogVisible: false,
      suspectDialogVisible: false,
      pictureDialogVisible: false,
      effectsInfo: {
        name: '',
        num: 0
      },
      suspectInfo: {
        name: '',
        idCard: '',
        pictureUpload: []
      },
      currentIndex: '',
      selectCabinetDialogVisible: false,
      selectDoorNo: '',
      effectsList: [{name: 'hhh'}],
      addEffectType: 0,
      pageNum: 1,
      pageSize: 5,
      total: 0,
      currentId: '',
      currentId2: '',
      currentId3: '',
      pictureUpload: [],
      imageUploadUrl: process.env.VUE_APP_BASE_API + '/cloudcabinet/common/upload',
      isUploading: false,
      picture: ''
    }
  },
  created() {
    this.header.Authorization = localStorage.getItem('token')
    // this.toBeStoredList()
    this.getPersonalItemList()
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
        this.pictureUpload = [obj]
        // this.currentEditProperty.storePicture = response.url
      }
    },
    handleSuccess2(response, file, fileList) {
      this.isUploading = false
      let obj = {
        name: file.name,
        url: response.url,
        fileName: response.fileName
      }
      // 编辑财物时修改图片上传
      if (!this.isShowEditBtn && !this.isAddProperty) {
        this.suspectInfo.pictureUpload = [obj]
        // this.currentEditProperty.storePicture = response.url
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

    outPicture(val) {
      this.picture = val
      this.pictureDialogVisible = true
    },
    changeImg(file) {
      this.getBase64(file.raw).then(res => {
        console.log(res, 888)
        this.suspectInfo.pictureUpload = [{url: res}]
      })
    },
    reChangeImg(file) {
      this.getBase64(file.raw).then(res => {
        console.log(res, 888)
        this.pictureUpload = [{url: res}]
      })
    },
    // 图片内容转base64
    getBase64(file) {
      return new Promise(function(resolve, reject) {
        let reader = new FileReader()
        let imgResult = ""
        reader.readAsDataURL(file)
        reader.onload = function() {
          imgResult = reader.result
        }
        reader.onerror = function(error) {
          reject(error)
        }
        reader.onloadend = function() {
          resolve(imgResult)
        }
      })
    },
    // 待存列表
    getPersonalItemList() {
      let data = {
        cabinetType: 3,
        itemStatus: 0
      }
      getPersonalItemList(data).then((res) => {
        if (res.result) {
          this.storelist = res.rows
          this.total = res.total
        }
      })
    },
    getProperty(id) {
      let data = {
        inventoryId: id,
        itemStatus: 0,
        cabinetType: 3
      }
      getProperty(data).then((res) => {
        if (res.result) {
          this.effectsList = res.rows
        }
      }).catch()
    },
    addEffects(val, id) {
      this.title = '添加随身物品'
      this.effectsInfo = {name: '', num: 0}
      this.dialogVisible = true
      this.addEffectType = val
      if (id) {
        this.currentId2 = id
      }
      
    },
    cancel() {
      this.dialogVisible = false
    },
    save() {
      if (!this.addEffectType) {
        if (this.title == '添加随身物品') {
          this.tableData.push(this.effectsInfo)
        } else {
          this.tableData[this.currentIndex] = this.effectsInfo
        }
        this.dialogVisible = false
        this.currentIndex = ''
      } else {
        let data = {
          items: [
            {
              inventoryId: this.currentId2,
              itemName: this.effectsInfo.name,
              itemCount: this.effectsInfo.num
            }
          ]
        }
        addPersonalItem(data).then((res) => {
          if (res.result) {
            this.dialogVisible = false
             this.$message({
              type: 'success',
              message: '新增成功!'
            })
          }
        }).catch()
      }
    },
    editEffects(row, index) {
      this.title = '编辑随身物品'
      this.dialogVisible = true
      this.effectsInfo = {name: row.name, num: row.num}
      this.currentIndex = index
    },
    // 删除登记之前的物品
    deleteEffectsInRegister(index) {
      this.$confirm('是否确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tableData.splice(index, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })       
      })
    },
    updateCabinetDialogVisible(val) {
      this.selectCabinetDialogVisible = val
    },
    // 选择柜号
    selectDoor(val) {
      this.selectDoorNo = val
    },
    selectCabinet() {
      this.selectCabinetDialogVisible = true
    },
    register() {
      if (!this.suspect || !this.idCard || !this.tableData.length || !this.selectDoorNo) {
        this.$message({
          message: '请完善登记信息',
          type: 'warning'
        })
        return
      }
      const h = this.$createElement;
      this.$msgbox({
        title: '',
        message: h('p', null, [
          h('p', null, [
            h('i', {class: 'el-icon-success', style: 'color: #67C23A; font-size: 18px'}),
            h('span', {style: 'display: inline-block; margin-left: 10px'}, '确认要登记这条信息吗？')
          ]),
          h('p', { style: 'color: #777; font-size: 12px; padding-left: 20px;margin-top: 5px' }, '您确认要登记这条信息吗？')
        ]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            this.tableData.map((item) => {
              item.itemCount = item.num
              item.itemName = item.name
            })
            this.tableData.forEach((item) => {
              delete item.num
              delete item.name
            })
            let data = {
              cabinetType: 3,
              // doorNo: this.doorNo,
              eventNo: this.idCard,
              name: this.suspect,
              doorNo: this.selectDoorNo,
              inventoryAttacheDTOs: this.tableData,
              storePicture: this.pictureUpload[0].url
            }
            checkIn(data).then((res) => {
              if (res.result) {
                this.$message({
                  message: res.msg,
                  type: 'success'
                })
                this.getPersonalItemList()
                done()
                this.suspect = ''
                this.idCard = ''
                this.tableData = []
                this.selectDoorNo = ''
                this.pictureUpload = []
              } else {
                this.$message({
                  message: res.msg,
                  type: 'warning'
                })
                done()
              }
            }).catch()
          } else {
            done()
          }
        }
      }).then()
    },
    // toBeStoredList() {
    //   let params = {
    //     pageNum: this.pageNum,
    //     pageSize: this.pageSize,
    //     cabinetType: 3,
    //     storeStatus: 0 // 0待存，1已存，2取出，3部分在存
    //   }
    //   toBeStoredList(params).then((res) => {
    //     if (res.result) {
    //       this.storeList = res.rows
    //       this.total = res.total
    //     }
    //   }).catch()
    // },
    effectsManagementFn(id) {
      this.listDialogVisible = true
      this.getProperty(id)
      this.currentId3 = id
    },
    // 删除待办列表嫌疑人
    deleteSuspect(id) {
      this.$confirm('是否确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        removeCheck(id).then((res) => {
          if (res.result) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getPersonalItemList()
          }
          
        }).catch()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })       
      })
    },
    // 编辑待办列表嫌疑人
    editSuspect(item) {
      this.suspectDialogVisible = true
      this.suspectInfo = {
        name: item.suspectName,
        idCard: item.identityCard,
        pictureUpload: [{url: item.storePicture}]
      }
      this.currentId = item.id
    },
    // 保存嫌疑人编辑信息
    saveEditSuspect() {
      let data = {
        cabinetType: 3,
        eventNo: this.suspectInfo.idCard,
        id: this.currentId,
        name: this.suspectInfo.name,
        storePicture: this.suspectInfo.pictureUpload[0].url
      }
      updateSuspect(data).then((res) => {
        if (res.result) {
          this.$message({
            type: 'success',
            message: '编辑成功!'
          })
          this.suspectDialogVisible = false
          this.getPersonalItemList()
        }
      }).catch()
    },
    // 取消保存嫌疑人编辑信息
    cancelEditSuspect() {
      this.suspectDialogVisible = false
    },
    // 删除物品列表管理的某个物品
    deleteEffects(id) {
      this.$confirm('是否确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        removePersonalItemCheck(id).then((res) => {
          if (res.result) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getProperty(this.currentId3)
          }
        }).catch()
        
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })       
      })
    },
    confirm() {
      this.listDialogVisible = false
      this.getPersonalItemList()
    },
     handleSizeChange(val) {
      this.pageSize = val
      this.getPersonalItemList()
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this.getPersonalItemList()
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
    width: 50%;
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
