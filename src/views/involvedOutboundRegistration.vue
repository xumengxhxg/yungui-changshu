<!-- 涉案财物管理-出库登记 -->
<!--  -->
<template>
  <div>
    <div class="text-left ph20 pv10">
      涉案财物柜管理-出库管理
    </div>
    <div class="bg-white">
      <!-- 查询 -->
      <div class="bg-white ph20 pv10">
        <el-form :inline="true" :model="form" class="demo-form-inline">
           <el-form-item label="案件编号：">
           <el-input v-model="form.caseNo" size="small" placeholder="请输入案件编号"></el-input>
          </el-form-item>
          <el-form-item label="案件名称：">
            <el-input v-model="form.caseName" size="small" placeholder="请输入案件名称"></el-input>
          </el-form-item>
          <!-- <el-form-item label="人员姓名：">
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
          </el-form-item> -->
          <el-form-item>
            <el-button type="warning" size="small" icon="el-icon-refresh" @click="reset" >重置</el-button>
            <el-button type="primary" size="small" icon="el-icon-search" @click="getAccidentList">搜索</el-button>
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
            style="width: 100%"
            size='small'
            :data="tableData">
              <el-table-column
                    label="序号"
                    width="55">
                    <template slot-scope="scope">
                      {{pageSize*(pageNum - 1) + scope.$index + 1}}
                    </template>
                </el-table-column>
               <el-table-column
                    label="案件编号"
                    prop="caseNo"
                    width="120"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="案件名称"
                    prop="caseName"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="主办人"
                    prop="sponsor"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="协办人"
                    width="90"
                    prop="cosponsor"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="操作"
                    align="center"
                    width="160">
                    <template slot-scope="scope">
                      <el-button type="primary" size="mini" @click="register(scope.row.accidentNo, true, scope.row.id)">登记全部</el-button>
                    </template>
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
        <div v-show="isShow" class="pull-left p20" style="width: 40%; box-sizing: border-box;background: #ededed">
          <div>案件内涉案财物（<span>{{propertyTotal}}</span>）</div>
          <el-table
            class="p10 mt10"
            size='small'
            :data="property"
            style="width: 100%">
            <el-table-column
                label="序号"
                width="55">
                <template slot-scope="scope">
                  {{scope.$index + 1}}
                </template>
            </el-table-column>
            <el-table-column
                label="物品编号"
                prop="itemNo"
                width="180"
                align="center">
            </el-table-column>
            <el-table-column
                label="物品名称"
                prop="itemName"
                align="center">
            </el-table-column>
            <el-table-column
                label="数量"
                width="100"
                prop="itemCount"
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
                label="操作"
                align="center">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini"  @click="register(scope.row.id, false, '')">登记</el-button>
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
import { getAccidentList, getProperty, haveStoredList } from '@/api/cabinet'
import { formatDate } from '@/utils/global'
export default {
  data () {
    return {
        form: {
            caseName: '',
            caseNo: ''
        },
        tableData: [],
        pageNum: 1,
        pageSize: 10,
        total: 0,
        isShow: true,
        property: [],
        propertyTotal: 0,
        watchPicture: '',
        dialogVisible: false
    }
  },
  created() {
    this.getAccidentList()
    setTimeout(() => {
      this.getProperty(this.tableData && this.tableData[0] ? this.tableData[0] : '')
    }, 700)
  },
  methods: {
    watch(val) {
      this.dialogVisible = true
      this.watchPicture = val
    },
    getAccidentList() {
      // let startTime = this.form.date[0] ? formatDate(this.form.date[0]) + ' 00:00:00' : ''
      // let endTime = this.form.date[1] ? formatDate(this.form.date[1]) + ' 23:59:59' : ''
      let data = {
        // suspectName: this.form.suspectName,
        // identityCard: this.form.identityCard,
        // startTime: startTime,
        // endTime: endTime,
        itemStatus: 2,
        caseName: this.form.caseName,
        caseNo: this.form.caseNo,
      }
      let params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      haveStoredList(data, params).then((res) => {
        if (res.result) {
          this.tableData = res.rows
          this.total = res.total
          if (res.rows && res.rows[0]) {
            this.getProperty(res.rows && res.rows[0] ? res.rows[0] : '')
          } else {
            this.property = []
            this.propertyTotal = 0
          }
        }
      }).catch()
    },
    reset() {
      this.form = {
         suspectName: '',
        identityCard: '',
        date: []
      }
      this.getAccidentList()
    },
    // 点击表格行
    rowClick(val) {
      this.getProperty(val)
    },
    // 获取涉案财物列表
    getProperty(row) {
     let data = {
        // search: row.identityCard,
        inventoryId: row.id,
        itemStatus: 2// 存储状态(0入库、1在库、2出库)
      }
      getProperty(data).then((res) => {
        if (res.result) {
          this.property = res.rows
          this.propertyTotal = res.total
        }
      }).catch()
    },
    // 登记
    register(val, val2, val3) {
      this.$router.push({
        name: 'takeOutPicture',
        query: {
          id: val,
          isAll: val2,
          inventoryId: val3
        }
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getAccidentList()
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this.getAccidentList()
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
</style>

