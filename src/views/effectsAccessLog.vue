<!--  -->
<template>
  <div>
    <div class="text-left ph20 pv10">
      随身物品柜管理/登记日志
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
          <el-form-item label="操作时间：">
            <el-date-picker
              size="small"
              v-model="form.date"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="柜号：">
            <el-input v-model="form.doorNo" size="small" placeholder="请输入柜号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="warning" size="small" icon="el-icon-refresh" @click="reset">重置</el-button>
            <el-button type="primary" size="small" icon="el-icon-search" @click="getRecordList" >搜索</el-button>
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
            label="操作时间"
            width="180"
            prop="createTime"
            align="center">
          </el-table-column>
          <el-table-column
            label="操作人"
            width="180"
            prop="handlerName"
            align="center">
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
            label="柜号"
            prop="doorNo"
            align="center">
          </el-table-column>
          <el-table-column
            label="状态"
            width="100"
            align="center">
            <template slot-scope="scope">
              {{scope.row.status == 1 ? '出柜' : '存柜'}}
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
  </div>
</template>

<script>
import { getRecordList } from '@/api/cabinet'
import { formatDate } from '@/utils/global'
export default {
  data () {
    return {
     form: {
      name: '',
      idCard: '',
      date: [],
      doorNo: ''
     },
     tableData: [],
     pageNum: 1,
     pageSize: 10,
     total: 0
    }
  },
  created() {
    this.getRecordList()
  },
  methods: {
    getRecordList() {
      let startTime = this.form.date[0] ? formatDate(this.form.date[0]) + ' 00:00:00' : ''
      let endTime = this.form.date[1] ? formatDate(this.form.date[1]) + ' 23:59:59' : ''
      let params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      let data = {
        cabinetType: 3,
        suspectName: this.form.name,
        identityCard: this.form.idCard,
        doorNo: this.form.doorNo,
        startTime: startTime,
        endTime: endTime
      }
      getRecordList(params, data).then((res) => {
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
        doorNo: ''
      }
      this.getRecordList()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getRecordList()
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this.getRecordList()
    }
  }
}

</script>

<style  scoped>
.el-form-item {
  margin-bottom: 0px;
}
</style>

