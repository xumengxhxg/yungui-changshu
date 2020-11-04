<!-- 操作日志 -->
<template>
  <div >
      <div class="text-left ph20 pv10">
        系统安全日志
      </div>
      <div  class="bg-white ph20 pv10">
          <div style="padding: 0 24px 20px;font-size: 14px;border-bottom: 1px solid #eee;">
            <span>
              <span>操作时间：</span>
              <el-date-picker
                style="width:300px;margin-right: 20px;"
                v-model="searchObj.time"
                size="small"
                type="daterange"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
                </el-date-picker>
              <span>操作人：</span>
              <el-input
                  size="small"
                  placeholder="请输入操作人"
                  v-model="searchObj.userName"
                  style="width: 200px;margin-right: 20px;"
                  clearable>
              </el-input>
              <el-button size="small" style="margin-right: 20px;" @click="refresh()" type="warning" icon="el-icon-refresh">重置</el-button>
              <el-button size="small" type="primary" icon="el-icon-search" @click="initTableList()" style="margin-left: 0px;" >搜索</el-button>
            </span>
          <div style="margin-top: 15px;">
            <el-button size="small" type="danger" icon="el-icon-delete" @click="clearLog()"  style="margin-right: 20px;">清空日志</el-button>
            <!-- <el-button size="small" type="primary" icon="el-icon-download" @click="exportLog()"  style="margin-right: 20px">导出日志</el-button> -->
            <div ></div>
          </div>
        </div>
        <div style="padding: 10px 24px;">
            
            <el-table
                size="small"
                :data="tableObj.records"
                style="width: 100%">
                <el-table-column
                label="序号"
                align="center"
                type="index"
                :index="(index)=>{return (searchObj.pageNum-1)*searchObj.pageSize+index+1}"
                >
                </el-table-column>
                <el-table-column
                prop="operName"
                align="center"
                label="登录状态"
                >
                <template slot-scope="scope">
                    <span v-show="scope.row.status==='0'">成功</span>
                    <span v-show="scope.row.status==='1'">失败</span>
                </template>
                </el-table-column>
                <el-table-column
                prop="userName"
                align="center"
                label="用户名"
                >
                </el-table-column>
                <el-table-column
                prop="loginTime"
                align="center"
                label="记录时间"
                >
                </el-table-column>
                <el-table-column
                prop="ipaddr"
                align="center"
                label="ip地址"
                >
                </el-table-column>
            </el-table>
            <div style="float: right;margin-top: 15px;">
                <el-pagination
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :page-sizes="[10, 20, 30, 40]"
                    layout="total, prev, pager, next, sizes"
                    :current-page="tableObj.pageNum"
                    :page-size="tableObj.pageSize"
                    :total="tableObj.total">
                </el-pagination>
            </div>
            <div style="clear: both;"></div>
        </div>
      </div>
  </div>
</template>
<script>
import { loginloglist,loginlogclean } from '@/api/systemLog'
import { formatDate } from '@/utils/global'
export default {
  data(){
      return {
          searchObj:{
              time:[],//操作时间
              operName:'',//操作人
              pageNum:1,//当前页码
              pageSize:10,//当前pageseze
          },
          // type:1,//判断添加还是修改
          tableObj:{
              total:0,//数据总条数
              records:[],//table数据
              records: [],
              pageNum:1,//当前页码
              pageSize:10,//
          }
      }
  },
  mounted() {
      this.searchObj.time=[formatDate(new Date()),formatDate(new Date())]
      this.initTableList() //初始化table
  },
  methods: {
      initTableList(){ //初始化table
        if(this.searchObj.time){
          this.searchObj.startTime=this.searchObj.time[0]+" 00:00:00"
          this.searchObj.endTime=this.searchObj.time[1]+" 23:59:59"
        }else{
          this.searchObj.startTime=''
          this.searchObj.endTime=''
        }
          // delete this.searchObj.time
          let params=this.$public.deepClone(this.searchObj);
          params.time=[]
          loginloglist(params).then((res) => {
          if(res.result){
            this.tableObj.records = res.rows;
            this.tableObj.total = res.total;
          }else{
            this.tableObj.records = [];
            this.tableObj.total = 0;
            window_warning(res.msg)
          }
        }).catch()
      },
      refresh(){ //重置
          this.searchObj.time=[formatDate(new Date()),formatDate(new Date())]
          this.searchObj.userName='',//操作人
          this.initTableList() //初始化table
      },
      handleSizeChange(value){ //改变pagesize
         this.searchObj.pageSize=value
         this.initTableList()
      },
      handleCurrentChange(value){ //改变当前页
          this.searchObj.pageNum=value
          this.initTableList()
      },
      exportLog(){ //导出日志

      },
      clearLog(){ //清空日志
        this.$confirm('确认清空日志吗?', '提示',{
            type: 'warning'
        }).then((res)=>{
          loginlogclean().then(res=>{
          if(res.result){
            this.$message.success('清空成功');   
            this.initTableList()

          }else{
            window_warning(res.msg)
          }
        }).catch()
        }).catch()
        

      }
  },
}
</script>
<style  scoped>

</style>