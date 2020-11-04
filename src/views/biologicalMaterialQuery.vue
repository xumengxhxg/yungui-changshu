<template>
  <div>
    <div class="text-left ph20 pv10">
      生物检材柜管理/生物检材查询
    </div>
    <div class="bg-white">
      <!-- 查询 -->
      <div class="bg-white ph20 pv10">
        <el-form :inline="true" :model="form" class="demo-form-inline">
          <el-form-item label="人员姓名：">
            <el-input v-model="form.suspectName" size="small" placeholder="请输入人员姓名"></el-input>
          </el-form-item>
          <el-form-item label="身份证号：">
            <el-input v-model="form.identityCard" size="small" placeholder="请输入身份证号"></el-input>
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
         <el-form-item label="查处中队：">
            <el-select v-model="form.discoverDept" clearable  size="small" placeholder="请选择查获中队">
              <el-option  label="狮山中队" value="狮山中队"></el-option>
              <el-option  label="枫桥中队" value="枫桥中队"></el-option>
              <el-option  label="横塘中队" value="横塘中队"></el-option>
              <el-option  label="浒关开发区中队" value="浒关开发区中队"></el-option>
              <el-option  label="浒关中队" value="浒关中队"></el-option>
              <el-option  label="通安中队" value="通安中队"></el-option>
              <el-option  label="镇湖中队" value="镇湖中队"></el-option>
              <el-option  label="科技城中队" value="科技城中队"></el-option>
              <el-option  label="东渚中队" value="东渚中队"></el-option>
            </el-select> 
          </el-form-item>
          <el-form-item label="血样状态：">
            <el-select size="small" v-model="form.storeStatus" placeholder="请选择血样状态">
              <el-option
                v-for="item in storeStatusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="warning" size="small" icon="el-icon-refresh" @click="reset">重置</el-button>
            <el-button type="primary" size="small" icon="el-icon-search" @click="queryProperty">搜索</el-button>
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
            width="50">
            <template slot-scope="scope">
              {{pageSize*(pageNum - 1) + scope.$index + 1}}
            </template>
          </el-table-column>
          <el-table-column
            label="人员姓名"
            prop="suspectName"
            width="180"
            align="center">
          </el-table-column>
          <el-table-column
            label="身份证号"
            align="center"
            prop="identityCard">
          </el-table-column>
          <el-table-column
            label="查处类型"
            width="100"
            align="center">
            <template slot-scope="scope">
              <!-- 0事故查获、1设卡查获 -->
              {{scope.row.discoverType ? '设卡查获' : '事故查获'}}
            </template>
          </el-table-column>
          <el-table-column
            label="查处中队"
            prop='discoverDept'
            align="center">
          </el-table-column>
          <el-table-column
            label="查获时间"
            prop="discoverTime"
            align="center">
          </el-table-column>
          <el-table-column
            label="血样状态"
            align="center">
            <template slot-scope="scope">
              {{scope.row.storeStatus == 0 ? '待存' : scope.row.storeStatus == 1 ? '已存' : scope.row.storeStatus == 2 ? '取出' : '部分在存'}}
            </template>
          </el-table-column>
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
import { formatDate, rTime } from '@/utils/global'
import { queryProperty } from '@/api/cabinet'
export default {
  data () {
    return {
     form: {
       suspectName: '',
       identityCard: '',
       date: [],
       discoverDept: '',
       storeStatus: ''
     },
     tableData: [],
     pageNum: 1,
     pageSize: 10,
     total: 0,
     options: [],
     storeStatusOptions: [
      {
        value: 0,
        label: '待存'
      }, {
        value: 1,
        label: '已存'
      }, {
        value: 2,
        label: '取出'
      }
    ]
    }
  },
  created() {
    this.queryProperty()
  },
  mounted() {
  },
  methods: {
    queryProperty() {
      let params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      let startTime = this.form.date[0] ? formatDate(this.form.date[0]) + ' 00:00:00' : ''
      let endTime = this.form.date[1] ? formatDate(this.form.date[1]) + ' 23:59:59' : ''
      let data = {
        cabinetType: 0,
        discoverDept: this.form.discoverDept, // 查处中队
        identityCard: this.form.identityCard, // 身份证号
        storeStatus: this.form.storeStatus, // 血样状态
        suspectName: this.form.suspectName, // 人员姓名
        startTime: startTime,
        endTime: endTime
      }
      queryProperty(params, data).then((res) => {
        if (res.result) {
          this.tableData = res.rows
          this.total = res.total
        }
      }).catch()
    },
    toDetail(row) {
      this.$router.push({
        name: 'searchDetail',
        query: JSON.stringify(row)
      })
    },
    reset() {
      this.form = {
        suspectName: '',
        identityCard: '',
        date: [],
        discoverDept: '',
        storeStatus: ''
      },
      this.queryProperty()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.queryProperty()
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this.queryProperty()
    }
  }
}

</script>

<style  scoped>
.el-form-item {
  margin-bottom: 0px;
}
</style>