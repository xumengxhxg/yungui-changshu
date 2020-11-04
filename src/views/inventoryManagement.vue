<template>
  <div>
    <div class="text-left ph20 pv10">
      生物检材柜管理/盘点管理
    </div>
    <div class="bg-white">
      <!-- 查询 -->
      <div class="bg-white ph20 pv10">
        <el-form :inline="true" :model="form" class="demo-form-inline">
          <el-form-item label="人员姓名：">
            <el-input v-model="form.suspectName" size="small" placeholder="请输入人员姓名"></el-input>
          </el-form-item>
          <el-form-item label="身份证号：">
            <el-input v-model="form.cardNo" size="small" placeholder="请输入身份证号"></el-input>
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
          <el-form-item label="查获时间：">
            <el-date-picker
              size="small"
              v-model="form.date"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="状态：">
            <el-select size="small" v-model="form.status" placeholder="请选择">
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
            <el-button type="primary" size="small" icon="el-icon-search" @click="search">搜索</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="p20">
        <el-row>
          <el-col :span="8">
            <div class="clearfix" style="padding-left: 70px">
              <div class="pull-left" style="width: 70px; height: 70px; background: #58A3F7; border-radius: 5px">
                <i class="el-icon-s-grid" style="color: #fff; font-size: 40px;width: 70px; height: 70px; line-height: 70px; text-align: center"></i>
              </div>
              <div class="pull-left ml10">
                <div style="height: 35px; padding-top: 10px">已结案</div>
                <div style="font-size: 20px; font-weight: 600">{{count[0]}}</div>
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="clearfix" style="padding-left: 70px">
              <div class="pull-left" style="width: 70px; height: 70px; background: #52C1F5; border-radius: 5px">
                <i class="el-icon-s-release" style="color: #fff; font-size: 40px;width: 70px; height: 70px; line-height: 70px; text-align: center"></i>
              </div>
              <div class="pull-left ml10">
                <div style="height: 35px; padding-top: 10px">即将过期</div>
                <div style="font-size: 20px; font-weight: 600">{{count[1]}}</div>
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="clearfix" style="padding-left: 70px">
              <div class="pull-left" style="width: 70px; height: 70px; background: #FB6260; border-radius: 5px">
                <i class="el-icon-s-marketing" style="color: #fff; font-size: 40px;width: 70px; height: 70px; line-height: 70px; text-align: center"></i>
              </div>
              <div class="pull-left ml10">
                <div style="height: 35px; padding-top: 10px">已过期</div>
                <div style="font-size: 20px; font-weight: 600">{{count[2]}}</div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <!-- 列表 -->
      <div class="p20 bg-white border-top-ed">
        <div class="clearfix mb10">
          <el-button class="pull-right" style="margin-left: 10px" icon="el-icon-download" size="small" type="success" @click="inventoryManagementExport(1)">导出(.xls格式)</el-button>
          <el-button class="pull-right"  icon="el-icon-download" size="small" type="success" @click="inventoryManagementExport(2)">导出(.xlsx格式)</el-button>
        </div>
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
            prop="identityCard"
            align="center">
          </el-table-column>
          <el-table-column
            label="人员性别"
            width="100"
            prop="sexStr"
            align="center">
          </el-table-column>
          <el-table-column
            label="驾驶证号码"
            prop="driverCard"
            align="center">
          </el-table-column>
          <el-table-column
            label="车辆类型"
            align="center"
            prop="carTypeStr">
          </el-table-column>
          <el-table-column
            label="血液乙醇含量（mg/100ml）"
            prop="ethanolContent"
            align="center">
          </el-table-column>
          <el-table-column
            label="查处类型"
            align="center"
            prop="discoverTypeStr">
          </el-table-column>
          <el-table-column
            label="查获中队"
            prop="discoverDept"
            align="center">
          </el-table-column>
          <el-table-column
            label="查获时间"
            width="150"
            prop="discoverTime"
            align="center">
          </el-table-column>
          <el-table-column
            label="状态"
            prop="caseStatusStr"
            align="center">
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
import { formatDate, download } from '@/utils/global'
import { inventoryManagement, inventoryManagementCount, inventoryManagementExport } from '@/api/cabinet'
export default {
  data () {
    return {
     form: {
       suspectName: '',
       cardNo: '',
       sponsor: '',
       status: '',
       date: []
     },
     tableData: [],
     pageNum: 1,
     pageSize: 10,
     total: 0,
     options: [{label: '已结案', value: '已结案'}, {label: '即将过期', value: '即将过期'}, {label: '已过期', value: '已过期'},],
     count: {}
    }
  },
  created() {
    this.inventoryManagement()
    this.inventoryManagementCount()
  },
  methods: {
    // 盘点管理列表
    inventoryManagement() {
      let startTime = this.form.date[0] ? formatDate(this.form.date[0]) + ' 00:00:00' : ''
      let endTime = this.form.date[1] ? formatDate(this.form.date[1]) + ' 23:59:59' : ''
      let data = {
        startTime: startTime,
        endTime: endTime,
        cardNo: this.form.cardNo,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        discoverDept: this.form.discoverDept,
        status: this.form.status,
        suspectName: this.form.suspectName
      }
      inventoryManagement(data).then((res) => {
        if (res.result) {
          this.tableData = res.rows
          this.total = res.total
        }
      }).catch()
    },
    // 盘点管理数量
    inventoryManagementCount() {
      let startTime = this.form.date[0] ? formatDate(this.form.date[0]) + ' 00:00:00' : ''
      let endTime = this.form.date[1] ? formatDate(this.form.date[1]) + ' 23:59:59' : ''
      let data = {
        startTime: startTime,
        endTime: endTime,
        cardNo: this.form.cardNo,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        sponsor: this.form.sponsor,
        status: this.form.status,
        suspectName: this.form.suspectName
      }
      inventoryManagementCount(data).then((res) => {
        if (res.result) {
          this.count = res.data
        }
      }).catch()
    },
    // 导出
    inventoryManagementExport(val) {
      let startTime = this.form.date[0] ? formatDate(this.form.date[0]) + ' 00:00:00' : ''
      let endTime = this.form.date[1] ? formatDate(this.form.date[1]) + ' 23:59:59' : ''
      let data = {
        startTime: startTime,
        endTime: endTime,
        cardNo: this.form.cardNo,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        sponsor: this.form.sponsor,
        status: this.form.status,
        suspectName: this.form.suspectName,
        excelFile: val == 1 ? '2003' : '2007'
      }
      inventoryManagementExport(data).then((res) => {
        if (val == 1) {
          download('盘点管理.xls', res)
        } else {
          download('盘点管理.xlsx', res)
        }
      }).catch()
    },
    search() {
      this.inventoryManagement()
      this.inventoryManagementCount()
    },
    reset() {
      this.form = {
        suspectName: '',
        cardNo: '',
        sponsor: '',
        status: '',
        date: []
      }
      this.inventoryManagement()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.inventoryManagement()
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this.inventoryManagement()
    }
  }
}

</script>

<style  scoped>
.el-form-item {
  margin-bottom: 0px;
}
</style>