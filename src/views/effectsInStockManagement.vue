<!--  -->
<template>
  <div>
    <div class="text-left ph20 pv10">
      随身物品柜管理
    </div>
    <div class="bg-white">
      <!-- 查询 -->
      <div class="bg-white ph20 pv10">
        <el-form :inline="true" :model="form" class="demo-form-inline">
          <el-form-item label="嫌疑人：">
            <el-input v-model="form.name" size="small" placeholder="请输入嫌疑人姓名"></el-input>
          </el-form-item>
          <el-form-item label="身份证号：">
            <el-input v-model="form.idCard" size="small" placeholder="请输入身份证号"></el-input>
          </el-form-item>
          <el-form-item label="时间范围：">
            <el-date-picker
              size="small"
              v-model="form.date"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="物品状态：">
            <el-select v-model="form.status" size="small" placeholder="请选择物品状态">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="warning" size="small" icon="el-icon-refresh" @click="reset">重置</el-button>
            <el-button type="primary" size="small" icon="el-icon-search" @click="getPersonalItemList" >搜索</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 列表 -->
      <div class="p20 bg-white border-top-ed">
        <el-table
          size='small'
          :data="tableData"
          style="width: 100%">
          <el-table-column
            label="序号"
            width="55">
            <template slot-scope="scope">
              {{pageSize*(pageNum - 1) + scope.$index + 1}}
            </template>
          </el-table-column>
          <el-table-column
            label="嫌疑人"
            width="180"
            prop="suspectName"
            align="center">
          </el-table-column>
          <el-table-column
            label="身份证号"
            prop="identityCard"
            align="center">
          </el-table-column>
          <el-table-column
            label="随身物品详情"
            width="100"
            align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="effectsManagementFn(scope.row.id)">物品列表查询</el-button>
            </template>
          </el-table-column>
          <el-table-column
            label="存入时间"
            prop="storeTime"
            align="center">
            <template slot-scope="scope">
              {{scope.row.storeTime == '1900-01-01 00:00:00' ? '-' : scope.row.storeTime}}
            </template>
          </el-table-column>
          <el-table-column
            label="取出时间"
            prop="fetchTime"
            align="center">
            <template slot-scope="scope">
              {{scope.row.storeTime == '1900-01-01 00:00:00' ? '-' : scope.row.fetchTime}}
            </template>
          </el-table-column>
           <el-table-column
            label="柜号"
            prop="doorNo"
            align="center">
          </el-table-column>
          <el-table-column
            label="物品状态"
            align="center">
            <template slot-scope="scope">
              {{scope.row.storeStatus == 0 ? '待存' : scope.row.storeStatus == 1 ? '已出' : scope.row.storeStatus == 2 ? '取出' : ''}}
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="editSuspect(scope.row)">编辑</el-button>
              <el-button v-if="scope.row.storeStatus != 1" type="text" @click="remove(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="clearfix pt20">
          <el-pagination
            class="pull-right"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageNum"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
    <el-dialog
      title="物品列表管理"
      :visible.sync="listDialogVisible"
      width="30%">
      <el-table
        size='small'
        :data="effectsList"
        style="width: 100%;">
         <el-table-column
          label="序号"
          width="55">
          <template slot-scope="scope">
            {{pageSize*(pageNum - 1) + scope.$index + 1}}
          </template>
        </el-table-column>
        <el-table-column
          prop="itemName"
          label="物品名称">
        </el-table-column>
        <el-table-column
          prop="itemCount"
          label="物品数量"
          width="180">
        </el-table-column>
        <!-- <el-table-column
          label="操作"
          width="120">
          <template slot-scope="scope">
            <el-button type="text" @click="deleteEffects">删除</el-button>
          </template>
        </el-table-column> -->
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
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelEditSuspect">取 消</el-button>
        <el-button type="primary" @click="saveEditSuspect">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getCaseList, getPersonalItemList, getProperty, updateSuspect, removePersonalItemCheck2, removeCheck } from '@/api/cabinet'
import { formatDate } from '@/utils/global'
export default {
  data () {
    return {
     form: {
      name: '',
      idCard: '',
      date: [],
      status: ''
     },
     tableData: [],
     pageNum: 1,
     pageSize: 10,
     total: 0,
     listDialogVisible: false,
     suspectDialogVisible: false,
     effectsList: [],
     suspectInfo: {
        name: '',
        idCard: ''
      },
     options: [{label: '待存', value: 0},{label: '已存', value: 1}, {label: '取出', value: 2}]
    }
  },
  created() {
    // this.getCaseList()
    this.getPersonalItemList()
  },
  methods: {
    remove(id) {
      this.$confirm('是否确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        removeCheck(id).then(() => {
          removePersonalItemCheck2(id).then((res) => {
            if (res.result) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.getPersonalItemList()
            }
          }).catch()
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
        idCard: item.identityCard
      }
      this.currentId = item.id
    },
    // 保存嫌疑人编辑信息
    saveEditSuspect() {
      let data = {
        cabinetType: 3,
        eventNo: this.suspectInfo.idCard,
        id: this.currentId,
        name: this.suspectInfo.name
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
    effectsManagementFn(id) {
      this.listDialogVisible = true
      this.getProperty(id)
    },
     getProperty(id) {
      let data = {
        inventoryId: id,
        itemStatus: 0
      }
      getProperty(data).then((res) => {
        if (res.result) {
          this.effectsList = res.rows
        }
      }).catch()
    },
    getPersonalItemList() {
      let data = {
        cabinetType: 3,
        endTime: this.form.date[0] ? formatDate(this.form.date[0]) + ' 00:00:00' : '',
        startTime:  this.form.date[1] ? formatDate(this.form.date[1]) + ' 23:59:59' : '',
        suspectName: this.form.name,
        identityCard: this.form.idCard,
        storeStatus: this.form.status
        // itemStatus: 0
      }
      getPersonalItemList(data).then((res) => {
        if (res.result) {
          this.tableData = res.rows
          this.total = res.total
        }
      }).catch() 
    },
    getCaseList() {
      let startTime = this.form.date[0] ? formatDate(this.form.date[0]) + ' 00:00:00' : ''
      let endTime = this.form.date[1] ? formatDate(this.form.date[1]) + ' 23:59:59' : ''
      let data = {
        caseNo: this.form.caseNo,
        caseType: this.form.caseType,
        startTime: startTime,
        endTime: endTime,
        caseName: this.form.caseName,
        doorNo: this.form.doorNo,
        storeStatus: 1
      }
      getCaseList(data).then((res) => {
        if (res.result) {
          this.tableData = res.rows
          this.total = res.total
        }
      }).catch()
    },
    reset() {
      this.form= {
        name: '',
        idCard: '',
        date: [],
        status: ''
      }
      this.getPersonalItemList()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getPersonalItemList()
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this.getPersonalItemList()
    },
     confirm() {
      this.listDialogVisible = false
    }
  }
}

</script>

<style  scoped>
.el-form-item {
  margin-bottom: 0px;
}
</style>
