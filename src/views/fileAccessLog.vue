<template>
  <div>
    <div class="text-left ph20 pv10">
      案卷柜管理/存取日志
    </div>
    <div class="bg-white">
      <!-- 查询 -->
      <div class="bg-white ph20 pv10">
        <el-form :inline="true" :model="form" class="demo-form-inline">
          <el-form-item label="案件编号：">
            <el-input v-model="form.caseNo" size="small" placeholder="请输入案件编号"></el-input>
          </el-form-item>
          <el-form-item label="案件名称：">
            <el-input v-model="form.caseName" size="small" placeholder="请输入案件姓名"></el-input>
          </el-form-item>
          <!-- <el-form-item label="查询时间段：">
            <el-date-picker
              size="small"
              v-model="form.date"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="承办民警：">
            <el-input v-model="form.sponsor" size="small" placeholder="请输入承办民警"></el-input>
          </el-form-item>
          <el-form-item label="柜号：">
            <el-input v-model="form.doorNo" size="small" placeholder="请输入柜号"></el-input>
          </el-form-item> -->
          <el-form-item>
            <el-button type="warning" size="small" icon="el-icon-refresh" @click="reset">重置</el-button>
            <el-button type="primary" size="small" icon="el-icon-search" @click="getRecordList">搜索</el-button>
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
            prop="createTime"
            width="150">
          </el-table-column>
          <el-table-column
            label="操作人"
            prop="handlerName"
            width="150">
          </el-table-column>
          <el-table-column
            label="案件编号"
            width="180"
            prop="caseNo"
            align="center">
          </el-table-column>
          <el-table-column
            label="案件名称"
            prop="caseName"
            align="center">
          </el-table-column>
          <el-table-column
            label="柜号"
            prop="doorNo"
            width="100"
            align="center">
          </el-table-column>
          <el-table-column
            label="主办人"
            prop="sponsor"
            width="100"
            align="center">
          </el-table-column>
          <el-table-column
            label="协办人"
            prop="cosponsor"
            width="100"
            align="center">
          </el-table-column>
          <el-table-column
            label="状态"
            align="center">
            <template slot-scope="scope">
              <el-button v-if="scope.row.status" size="mini" type="danger" plain>出柜</el-button>
              <el-button v-else size="mini"  type="success" plain>入柜</el-button>
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
        cabinetType: 1,
        caseName: '',
        caseNo: '',
        // sponsor: '',
        // doorNo: '',
        // date: [new Date(), new Date()]
     },
     tableData: [],
     pageNum: 1,
     pageSize: 10,
     total: 0,
     options: []
    }
  },
  created() {
    this.getRecordList()
  },
  methods: {
    getRecordList() {
      //  let startTime = this.form.date[0] ? formatDate(this.form.date[0]) + ' 00:00:00' : ''
      // let endTime = this.form.date[1] ? formatDate(this.form.date[1]) + ' 23:59:59' : ''
      let params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      let data = {
        cabinetType: 1,
        // suspectName: this.form.suspectName,
        // identityCard: this.form.identityCard,
        caseName: this.form.caseName,
        caseNo: this.form.caseNo,
        // doorNo: this.form.doorNo,
        // startTime: startTime,
        // endTime: endTime,
        // sponsor: this.form.sponsor
      }
      getRecordList(params, data).then((res) => {
        if (res.result) {
          this.tableData = res.rows
          this.total = res.total
        }
      }).catch()
    },
    reset() {
      this.form = {
        cabinetType: 1,
        caseName: '',
        caseNo: '',
        sponsor: '',
        doorNo: '',
        date: []
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