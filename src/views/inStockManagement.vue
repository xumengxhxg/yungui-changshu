<template>
  <div>
    <div class="text-left ph20 pv10">
      生物检材柜管理/在库管理
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
          <el-form-item label="案件状态：">
            <el-select v-model="form.caseStatus" size="small" placeholder="请选择案件状态">
              <el-option
                v-for="item in caseStatusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="柜号：">
            <el-input v-model="form.doorNo" size="small" placeholder="请输入柜号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="warning" size="small" icon="el-icon-refresh" @click="reset">重置</el-button>
            <el-button type="primary" size="small" icon="el-icon-search"  @click="getAccidentList">搜索</el-button>
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
            width="150"
            prop="suspectName"
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
            align="center">
            <template slot-scope="scope">
              {{scope.row.sex ? '男' : '女'}}
            </template>
          </el-table-column>
          <el-table-column
            label="驾驶证号码"
            prop="driverCard"
            align="center">
          </el-table-column>
          <el-table-column
            label="车辆类型"
            align="center">
            <template slot-scope="scope">
              {{scope.row.carType == 0 ? '小型汽车' : scope.row.carType == 1 ? '大型汽车' : scope.row.carType == 2 ? '摩托车' : scope.row.carType == 3 ? '电动车' : '其他'}}
            </template>
          </el-table-column>
          <el-table-column
            label="血液乙醇含量（mg/100ml）"
            prop="ethanolContent"
            align="center"
            width="100">
          </el-table-column>
          <el-table-column
            label="查处类型"
            align="center">
            <template slot-scope="scope">
              {{scope.row.discoverType ? '设卡查获' : '事故查获'}}
            </template>
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
            label="案件状态"
            align="center">
            <template slot-scope="scope">
              {{scope.row.caseStatus == 0 ? '立案' : scope.row.caseStatus == 1 ? '破案' : scope.row.caseStatus == 2 ? '结案' : '暂无'}}
            </template>
          </el-table-column>
          <el-table-column
            label="柜号"
            prop="doorNo"
            align="center">
          </el-table-column>
          <el-table-column
            label="操作"
            align="center">
            <template slot-scope="scope">
              <el-button type='text' @click="achieveBarcode(scope.row.accidentNo)">
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
import { getAccidentList, achieveBarcode } from '@/api/cabinet'
import { formatDate, download } from '@/utils/global'
export default {
  data () {
    return {
     form: {
       suspectName: '',
       identityCard: '',
       discoverDept: '',
       caseStatus: '',
       date: [],
       doorNo: ''
     },
     tableData: [],
     pageNum: 1,
     pageSize: 10,
     total: 0,
     options: [],
     caseStatusOptions: [
       {value: 0, label: '立案'},
       {value: 1, label: '破案'},
       {value: 2, label: '结案'},
       {value: 3, label: '暂无'}
     ]
    }
  },
  created() {
    this.getAccidentList()
  },
  methods: {
    getAccidentList() {
      let startTime = this.form.date[0] ? formatDate(this.form.date[0]) + ' 00:00:00' : ''
      let endTime = this.form.date[1] ? formatDate(this.form.date[1]) + ' 23:59:59' : ''
      let data = {
        cabinetType: 0,
        caseStatus: this.form.caseStatus,
        discoverDept: this.form.discoverDept,
        doorNo: this.form.doorNo,
        identityCard: this.form.identityCard,
        startTime: startTime,
        endTime: endTime,
        suspectName: this.form.suspectName,
        storeStatus: 1
      }
      getAccidentList(data).then((res) => {
        if (res.result) {
          this.tableData = res.rows
          this.total = res.total
        }
      }).catch()
    },
    // 打印条形码
    achieveBarcode(val) {
      let data = {
        ajbh: val
      }
      achieveBarcode(data).then((res) => {
        download('条形码.png', res)
      }).catch()
    },
    reset() {
      this.form = {
        suspectName: '',
        identityCard: '',
        discoverDept: '',
        caseStatus: '',
        date: [],
        doorNo: ''
      }
      this.getAccidentList()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getAccidentList()
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this.getAccidentList()
    }
  }
}

</script>

<style  scoped>
.el-form-item {
  margin-bottom: 0px;
}
</style>