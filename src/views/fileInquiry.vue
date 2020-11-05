<template>
  <div>
    <div class="text-left ph20 pv10">
      案卷柜管理/案件查询
    </div>
    <div class="bg-white">
      <!-- 查询 -->
      <div class="bg-white ph20 pv10">
        <el-form :inline="true" :model="form" class="demo-form-inline">
          <el-form-item label="案件编号：">
            <el-input v-model="form.caseNo" size="small" placeholder="请输入案件编号"></el-input>
          </el-form-item>
          <!-- <el-form-item label="案件类型：">
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
          </el-form-item> -->
          <el-form-item label="案件名称：">
            <el-input v-model="form.caseName" size="small" placeholder="请输入案件名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="warning" size="small" icon="el-icon-refresh" @click="reset">重置</el-button>
            <el-button type="primary" size="small" icon="el-icon-search" @click="queryFiles">搜索</el-button>
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
            <template slot-scope='scope'>
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
          </el-table-column>
          <el-table-column
            label="状态"
            align="center">
            <template slot-scope="scope">
              {{scope.row.storeStatus == 0 ? '待存' : scope.row.storeStatus == 1 ? '已存' : '取出'}}
            </template>
          </el-table-column> -->
          <el-table-column
            label="操作"
            align="center">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="toDetail(scope.row)">查看详情</el-button>
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
import { queryFiles } from '@/api/cabinet'
import { formatDate } from '@/utils/global'
export default {
  data () {
    return {
     form: {
        cabinetType: 1,
        caseName: '',
        caseNo: '',
        // caseType: '',
        // doorNo: '',
        // date: []
     },
     tableData: [],
     pageNum: 1,
     pageSize: 10,
     total: 0,
     options: [{label: '危险驾驶', value: 1},{label: '交通肇事', value: 0}]
    }
  },
  created() {
    this.queryFiles()
  },
  methods: {
    queryFiles() {
      // let startTime = this.form.date[0] ? formatDate(this.form.date[0]) + ' 00:00:00' : ''
      // let endTime = this.form.date[1] ? formatDate(this.form.date[1]) + ' 23:59:59' : ''
      let data = {
        cabinetType: 1,
        caseName: this.form.caseName,
        caseNo: this.form.caseNo,
        // caseType: this.form.caseType,
        // doorNo: this.form.doorNo,
        // startTime: startTime,
        // endTime: endTime
      }
      queryFiles(data).then((res) => {
        if (res.result) {
          this.total = res.total
          this.tableData = res.rows
        }
      }).catch()
    },
    toDetail(val) {
        this.$router.push({name: 'searchFileDetail', query: JSON.stringify(val)})
    },
    reset() {
      this.form = {
        cabinetType: 1,
        caseName: '',
        caseNo: '',
        caseType: '',
        doorNo: '',
        date: []
      }
      this.queryFiles()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.queryFiles()
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this.queryFiles()
    }
  }
}

</script>

<style  scoped>
.el-form-item {
  margin-bottom: 0px;
}
</style>