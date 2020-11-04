<!-- 涉案财物管理-涉案财物查询 -->
<!--  -->
<template>
  <div>
    <div class="text-left ph20 pv10">
      涉案财物柜管理-涉案财物查询
    </div>
    <div class="bg-white">
      <!-- 查询 -->
      <div class="bg-white ph20 pv10">
        <el-form :inline="true" :model="form" class="demo-form-inline">
          <el-form-item label="人员姓名：">
           <el-input v-model="form.suspectName" size="small" placeholder="请输入人员姓名"></el-input>
          </el-form-item>
          <el-form-item label="身份证号">
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
          <el-form-item>
            <el-button type="warning" size="small" icon="el-icon-refresh" @click="reset">重置</el-button>
            <el-button type="primary" size="small" icon="el-icon-search" @click="queryProperty">搜索</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="ph20 clearfix">
        <el-switch class="pull-right" v-model="isShow" active-color="#13ce66" active-text="展开" inactive-text="收起">
        </el-switch>
      </div>
      <!-- 列表 -->
      <div class="p20 mt20 bg-white border-top-ed clearfix">
        <div :style="isShow ? 'width: 60%' : 'width: 100%'" class="pull-left p10" style="box-sizing: border-box">
          <el-table
          ref="multipleTable"
            highlight-current-row
            @row-click='rowClick'
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
                width="120"
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
            </el-table>
            <el-pagination
            class="pull-left mt20"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageNum"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
            </el-pagination>
        </div>
        <div v-show="isShow" class="pull-left p20" style="width: 40%;height: 500px; box-sizing: border-box;background: #ededed;position: relative; overflow: auto">
          <div>案件内涉案财物（<span>{{propertyTotal}}</span>）</div>
          <el-table
            class="p10 mt10 property-table"
            size='small'
            :data="property"
            style="width: 100%;">
            <el-table-column
                label="序号"
                width="50">
                <template slot-scope="scope">
                  {{scope.$index + 1}}
                </template>
            </el-table-column>
            <el-table-column
                label="物品编号"
                prop="itemNo"
                width="150"
                align="center">
            </el-table-column>
            <el-table-column
                label="物品名称"
                prop="itemName"
                align="center">
            </el-table-column>
            <el-table-column
                label="数量"
                prop="itemCount"
                width="90"
                align="center">
            </el-table-column>
            <el-table-column
                label="存入照片"
                prop="fetchPicture"
                align="center">
                <template slot-scope="scope">
                    <el-button type="text" @click="watch(scope.row.storePicture)">查看详情</el-button>
                </template>
            </el-table-column>
            <el-table-column
                label="取出照片"
                align="center">
                <template slot-scope="scope">
                    <el-button type="text" @click="watch(scope.row.fetchPicture)">查看详情</el-button>
                </template>
            </el-table-column>
            <el-table-column
                label="操作"
                align="center"
                width="130">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini"  @click="toDetail(scope.row)">查看详情</el-button>
                </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <!-- 查看照片 -->
    <el-dialog
      title="查看"
      :visible.sync="dialogVisible"
      width="30%">
      <div>
        <img v-if="watchPicture" :src="watchPicture" alt="" style="width: 100%">
        <div v-else style="text-align: center">暂无照片</div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { queryProperty, getProperty } from '@/api/cabinet'
import { formatDate } from '@/utils/global'
export default {
  data () {
    return {
        form: {
          suspectName: '',
          identityCard: '',
          date: []
        },
        tableData: [],
        pageNum: 1,
        pageSize: 10,
        total: 0,
        isShow: true,
        property: [],
        propertyTotal: 0,
        selectRow: {},
        watchPicture: '',
        dialogVisible: false
    }
  },
  created() {
    this.queryProperty()
    setTimeout(() => {
      this.getProperty(this.tableData[0])
    }, 500)
  },
  methods: {
    watch(val) {
      this.dialogVisible = true
      this.watchPicture = val
    },
     queryProperty() {
      let startTime = this.form.date[0] ? formatDate(this.form.date[0]) + ' 00:00:00' : ''
      let endTime = this.form.date[1] ? formatDate(this.form.date[1]) + ' 23:59:59' : ''
      let params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      let data = {
        cabinetType: 2,
        identityCard: this.form.identityCard, // 身份证号
        suspectName: this.form.suspectName, // 人员姓名
        startTime: startTime,
        endTime: endTime
      }
      queryProperty(params, data).then((res) => {
        if (res.result) {
          this.tableData = res.rows
          this.total = res.total
          if (res.rows && res.rows[0]) {
            this.getProperty(res.rows[0])
          } else {
            this.property = []
            this.propertyTotal = 0
          }
        }
      }).catch()
    },
    // 点击表格行
    rowClick(val) {
      this.selectRow = val
      this.getProperty(val)
    },
    // 获取涉案财物列表
    getProperty(row) {
     let data = {
        // search: row.identityCard
        // search: row.accidentNo,
        inventoryId: row.inventoryId,
      }
      getProperty(data).then((res) => {
        if (res.result) {
          this.property = res.rows
          this.propertyTotal = res.total
        }
      }).catch()
    },
    // 登记
    toDetail(row) {
      let newRow = {}
      if (this.selectRow.accidentNo) {
        newRow = Object.assign(row, this.selectRow)
      } else {
        newRow = Object.assign(row, this.tableData[0])
      }
        this.$router.push({
          name: 'searchPropertyDetail',
          query: JSON.stringify(newRow)
        })
    },
    reset() {
      this.form = {
        suspectName: '',
        identityCard: '',
        date: []
      }
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
  },
  watch: {
    tableData() {
      this.$nextTick(()=>{
        this.$refs.multipleTable.setCurrentRow(this.tableData[0])
      })
    }
  }
}

</script>

<style lang='less' scoped>
.el-form-item {
    margin-bottom: 0px;
}
.property-table.el-table {
  position: absolute;
  min-width: 800px;
  overflow: auto;
}
</style>

