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
            label="嫌疑人"
            width="180"
            prop="caseName"
            align="center">
          </el-table-column>
          <el-table-column
            label="身份证号"
            prop="caseNo"
            align="center">
          </el-table-column>
          <el-table-column
            label="随身物品详情"
            width="100"
            align="center">
            <template slot-scope="scope">
              {{scope.row.caseType ? '危险驾驶' : '交通肇事'}}
            </template>
          </el-table-column>
          <el-table-column
            label="存入时间"
            prop="suspectName"
            align="center">
          </el-table-column>
          <el-table-column
            label="取出时间"
            align="center">
            <template slot-scope="scope">
              {{scope.row.caseStatus == 0 ? '立案' : scope.row.caseStatus == 1 ? '破案' : scope.row.caseStatus == 2 ? '结案' : '暂无'}}
            </template>
          </el-table-column>
          <el-table-column
            label="物品状态"
            align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.licenseStatus == 0">未吊销</span>
              <span v-else-if="scope.row.licenseStatus == 1">吊销</span>
              <span v-else>无驾驶证</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center">
            <template slot-scope="scope">
              <el-button type="text">编辑</el-button>
              <el-button type="text">删除</el-button>
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
import { getCaseList } from '@/api/cabinet'
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
     options: [{label: '出库', value: 1},{label: '在库', value: 0}]
    }
  },
  created() {
    this.getCaseList()
  },
  methods: {
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
    },
    handleSizeChange(val) {
      this.pageSize = val
    },
    handleCurrentChange(val) {
      this.pageNum = val
    }
  }
}

</script>

<style  scoped>
.el-form-item {
  margin-bottom: 0px;
}
</style>
