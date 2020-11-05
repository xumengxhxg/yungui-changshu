<template>
  <div>
    <div class="text-left ph20 pv10">
      案卷柜管理/在库管理
    </div>
    <div class="bg-white">
      <!-- 查询 -->
      <div class="bg-white ph20 pv10">
        <el-form :inline="true" :model="form" class="demo-form-inline">
          <!-- <el-form-item label="案件编号：">
            <el-input v-model="form.caseNo" size="small" placeholder="请输入案件编号"></el-input>
          </el-form-item>
          <el-form-item label="案件类型：">
            <el-select v-model="form.caseType" size="small" placeholder="请选择案件类型">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="立案时间：">
            <el-date-picker
              size="small"
              v-model="form.date"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="案件名称：">
            <el-input v-model="form.caseName" size="small" placeholder="请输入案件姓名"></el-input>
          </el-form-item>
          <el-form-item label="柜号：">
            <el-input v-model="form.doorNo" size="small" placeholder="请输入柜号"></el-input>
          </el-form-item> -->
          <el-form-item label="案件编号：">
           <el-input v-model="form.caseNo" size="small" placeholder="请输入案件编号"></el-input>
          </el-form-item>
          <el-form-item label="案件名称：">
            <el-input v-model="form.caseName" size="small" placeholder="请输入案件名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="warning" size="small" icon="el-icon-refresh" @click="reset">重置</el-button>
            <el-button type="primary" size="small" icon="el-icon-search" @click="getCaseList" >搜索</el-button>
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
            label="案件名称"
            width="180"
            prop="caseName"
            align="center">
          </el-table-column>
          <el-table-column
            label="案件编号"
            prop="caseNo"
            align="center">
          </el-table-column>
          <!-- <el-table-column
            label="案件类型"
            width="100"
            align="center">
            <template slot-scope="scope">
              {{scope.row.caseType ? '危险驾驶' : '交通肇事'}}
            </template>
          </el-table-column>
          <el-table-column
            label="嫌疑人"
            prop="suspectName"
            align="center">
          </el-table-column>
          <el-table-column
            label="案件状态"
            align="center">
            <template slot-scope="scope">
              {{scope.row.caseStatus == 0 ? '立案' : scope.row.caseStatus == 1 ? '破案' : scope.row.caseStatus == 2 ? '结案' : '暂无'}}
            </template>
          </el-table-column>
          <el-table-column
            label="驾驶证状态"
            align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.licenseStatus == 0">未吊销</span>
              <span v-else-if="scope.row.licenseStatus == 1">吊销</span>
              <span v-else>无驾驶证</span>
            </template>
          </el-table-column> -->
          <el-table-column
            label="主办人"
            prop="sponsor"
            align="center">
          </el-table-column>
           <el-table-column
            label="协办人"
            prop="cosponsor"
            align="center">
          </el-table-column>
          <!-- <el-table-column
            label="立案时间"
            width="150"
            prop="caseTime"
            align="center">
          </el-table-column> -->
          <el-table-column
            label="柜号"
            prop="doorNo"
            align="center">
          </el-table-column>
          <el-table-column
            label="操作"
            align="center">
            <template slot-scope="scope">
              <el-button type='text' @click="achieveBarcode(scope.row.caseNo)">
                <i style="font-size: 25px" class="el-icon-printer"></i>
              </el-button>
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
import { getCaseList, achieveBarcode2 } from '@/api/cabinet'
import { formatDate, download } from '@/utils/global'
export default {
  data () {
    return {
     form: {
      caseNo: '',
      // caseType: '',
      // date: [],
      caseName: '',
      // doorNo: ''
     },
     tableData: [],
     pageNum: 1,
     pageSize: 10,
     total: 0,
     options: [{label: '危险驾驶', value: 1},{label: '交通肇事', value: 0}]
    }
  },
  created() {
    this.getCaseList()
  },
  methods: {
    achieveBarcode(val) {
      let data = {
        ajbh: val
      }
      achieveBarcode2(data).then((res) => {
        download('条形码.png', res)
      }).catch()
    },
    getCaseList() {
      // let startTime = this.form.date[0] ? formatDate(this.form.date[0]) + ' 00:00:00' : ''
      // let endTime = this.form.date[1] ? formatDate(this.form.date[1]) + ' 23:59:59' : ''
      let data = {
        caseNo: this.form.caseNo,
        // caseType: this.form.caseType,
        // startTime: startTime,
        // endTime: endTime,
        caseName: this.form.caseName,
        // doorNo: this.form.doorNo,
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
        caseNo: '',
        caseType: '',
        date: [],
        caseName: '',
        doorNo: ''
      }
      this.getCaseList()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getCaseList()
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this.getCaseList()
    }
  }
}

</script>

<style  scoped>
.el-form-item {
  margin-bottom: 0px;
}
</style>