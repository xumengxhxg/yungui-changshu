<!-- 我的待办 -->
<template>
  <div >
      <div class="text-left ph20 pv10">
        预警管理/业务告警
      </div>
      <div  class="bg-white ph20 pv10">
          <div style="padding: 0 24px 20px;font-size: 14px;border-bottom: 1px solid #eee;">
            <span style="display: inline-block;margin-top: 10px;">
              <span style="display: inline-block;margin-top: 10px;">
                <span>报警类型：</span>
                <el-select v-model="searchObj.warningType" clearable style="width: 200px;margin-right: 20px;" size="small" placeholder="请选择">
                  <!-- <el-option
                    v-for="item in indexTypeList"
                    :key="item.value"
                    :label="item.lable"
                    :value="item.value">
                  </el-option> -->
                  <el-option label="未结案预警" :value="2">未结案预警</el-option>
                  <el-option label="未吊销预警" :value="3">未吊销预警</el-option>
                </el-select>
              </span>
              <span style="display: inline-block;margin-top: 10px;">
                <span>时间：</span>
                <el-date-picker
                 size="small"
                  style="width: 300px;margin-right: 20px;"
                  v-model="searchObj.time"
                  type="daterange"
                  value-format="yyyy-MM-dd"
                  range-separator="-"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </span>
              <span style="display: inline-block;margin-top: 10px;">
                <el-button size="small" type="warning" style="margin-right: 10px;" icon="el-icon-refresh" @click="refresh()">重置</el-button>
                <el-button size="small" type="primary" icon="el-icon-search" @click="initTableList()" style="margin-left: 0px;" >搜索</el-button>
              </span>
            </span>
            <div style="display: flex;justify-content:space-between;margin-top: 15px;">
              <span>
                 <el-button size="small" type="success" icon="el-icon-success" @click="changeData(1)"  style="margin-right: 15px;">批量处理</el-button>
                 <el-button size="small" type="warning" icon="el-icon-success" @click="changeAllStatus()"  style="margin-right: 15px;">一键处理</el-button>
              </span>
              <span>
                <span style="margin-right: 15px;vertical-align: top;">
                  <el-button-group>
                    <el-button size="small" :type="searchObj.dealStatus===0?'primary':''"   @click="getSuspect(0)"  >未处理</el-button>  
                    <el-button size="small" :type="searchObj.dealStatus===1?'primary':''"   @click="getSuspect(1)"  >已处理</el-button>
                  </el-button-group>
                 </span>
              </span>
            </div>
              <div style="clear: both;"></div>
        </div>
        <div style="padding: 10px 24px;">
          
            <el-table
                size="small"
                @selection-change="selectionTr"
                :data="tableObj.records"
                style="width: 100%">
                <el-table-column
                type="selection"
                align="center"
                width="55">
                </el-table-column>
                <el-table-column
                label="序号"
                align="center"
                type="index"
                :index="(index)=>{ return (searchObj.pageNum-1)*searchObj.pageSize+index+1}"
                >
                </el-table-column>
                
                <el-table-column
                prop="dealStatusStr"
                align="center"
                label="报警类型"
                >
                <template slot-scope="scope">
                  <span v-if="scope.row.warningType===2" >未结案预警</span>
                  <span v-else >未吊销预警</span>
              </template>
                </el-table-column>
                <el-table-column
                prop="createTime"
                align="center"
                label="报警时间"
                >
                </el-table-column>
               <el-table-column
                prop="warningDetail"
                align="center"
                label="报警详情"
                >
                </el-table-column>
                <el-table-column
                v-if="searchObj.dealStatus!==1"
                prop="createTime"
                align="center"
                label="操作"
                >
                 <template slot-scope="scope">
                  <el-button @click="changeData(2,scope.row)"  type="primary" size="small">处理</el-button>
                 </template>
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
                    :page-size="tableObj.limit"
                    :total="tableObj.total">
                </el-pagination>
            </div>
            <div style="clear: both;"></div>
        </div>
        
        <!-- 弹窗 -->
      <el-dialog title="处理" width="500px" class="handle_dialog" :visible.sync="dialogFormVisible">
        <el-form  :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
          <el-form-item label="处理结果:" prop="result">
            <!-- <el-input v-model="form.name" autocomplete="off"></el-input> -->
            <el-input
              type="textarea"
              :autosize="{ minRows: 3, maxRows: 3}"
              resize='none'
              v-model="ruleForm.result">
            </el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary"  @click="submitForm('ruleForm')" :loading="submitBtn">提交</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">复原</el-button>
        </div>
      </el-dialog>
      </div>
  </div>
</template>
<script>
// import { getWaringList,dealWarning,getEarlyWaringDropdown,updateclickProcess  } from '@/api/monitor'
import { getAll,dealWarning,dealAllWarning } from '@/api/cloudCabinetAlarm'
import { formatDate,formatDate2} from '@/utils/global'
export default {
  data(){
      return {
          searchObj:{
              cabinetType:'',//报警云柜
              warningType:'',//报警类型
              pageNum:1,//当前页码
              flag:1,
              pageSize:10,//当前pageseze
              dealStatus:0,//嫌疑人切换情况
              time:[formatDate(((new Date()).getTime()-1000*60*60*24*90)),formatDate((new Date()).getTime())],
          },
          indexTime:'',//获取table数据之后的当前时间
          btn_case:false,//嫌疑人切换情况
          indexTypeList:[],//下拉框类
          tableListTr:[],//table表头下拉
          tableTr:[],//table被选中的表头展示数据
          typelist:[],//类型选择list
          dialogFormVisible:false,//弹窗默认隐藏
          ruleForm:{
            result:'',//处理结果
          },
          indexObj:'',//当前选中行
          selectTr:[],//当前选中多行id集合
          tableObj:{
              total:0,//数据总条数
              records:[],//table数据
              records: [],
              offset:1,//当前页码
              limit:10,//
          },
          submitBtn:false, //弹出框提交按钮
          rules: {
            result: [
                  { required: true, message: '请输入处理结果', trigger: 'blur' },
              ]
          }
          
      }
  },
  mounted() {
      // this.searchObj.time=[formatDate2(((new Date()).getTime()-1000*60*60*24*90)),formatDate2((new Date()).getTime())]
      setTimeout(()=>{
       this.initTableList() //初始化table
      },200)
  },
  methods: {
      changeData(num,obj){ 
        var ids=[];
        var dealcase=false;
        if(num===2){
              this.indexObj=obj;
              if(this.indexObj.dealStatus){
                dealcase=true
                return false;
              }else{
                ids.push(obj.id)
              }
          }else{
              if(this.selectTr.length<1){
                this.$message.warning('请先选择数据');
                return false;
              }
              this.selectTr.forEach(item=>{
                    ids.push(item.id);
                    if(item.dealStatus){
                    dealcase=true;
                  }
                })
              
          }   
          if(dealcase){
                  window_warning('选中的数据中存在已处理的数据，请先去除已处理的数据')
                  return false;
                }
              this.$confirm('确认处理选中的数据?', '提示',{
                    type: 'warning'
                }).then(()=>{
                    dealWarning(ids,1).then(res=>{
                        if(res.result){
                            this.$message.success('处理成功')
                            this.initTableList()
                        }else{
                            window_warning(res.msg)
                        }
                    }).catch()
                }).catch() 
      },
      // tableTrChange(val){
      //   var arr=[]
      //     if(val.length>0){
      //       if(this.tableListTr.length>0){
      //       this.tableListTr.forEach(item=>{
      //          if(val.some(it=>{return it===item.value})){
      //           arr.push(item)
      //          }
      //       })
      //     }
      //     }
      //   //   console.log(arr)
      //     this.indexTypeList=arr
      //  },
      initTableList(){ //初始化table
          this.searchObj.startTime=this.searchObj.time[0]?this.searchObj.time[0]+" 00:00:00":'';
          this.searchObj.endTime=this.searchObj.time[1]?this.searchObj.time[1]+" 00:00:00":'';
          let params=this.$public.deepClone(this.searchObj);
          params.time=[]
          getAll(params).then((res) => {
          if(res.result){
            if(res.rows){
            if(res.rows.length>0){
                res.rows.forEach(item=>{
                    item.monitorTypeStr=(typeof(item.monitorType)==='number')?item.monitorTypeStr:item.pendingTypeStr;
                    item.dealStatusStr=item.dealStatus===0?'未处理':'已处理';
                    item.createTime=formatDate2(item.createTime);
                })
            }
          this.indexTime=formatDate2(new Date()); //获取当前时间
          }
          this.tableObj.records = res.rows
          this.tableObj.total = res.total
          }
        }).catch()
      },
      refresh(){ //重置
          this.searchObj.cabinetType='',//柜子类型
          this.searchObj.warningType='',//报警类型
          this.searchObj.time=[formatDate2(((new Date()).getTime()-1000*60*60*24*90)),formatDate2((new Date()).getTime())],//报警类型
          this.searchObj.dealStatus=0,//处理状态
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
      selectionTr(selection){ //table checkbox发生变化时
        this.selectTr=selection
      },
      submitForm(formName) {
          this.$refs[formName].validate((valid) => {
              if (valid) {
                var data={
                        dealStatus:1,
                        dealResult:this.ruleForm.result,
                        ids:[this.indexObj.id]
                    }
                    dealWarning(data).then(res=>{
                        if(res.result){
                            this.initTableList()
                            this.$message.success('操作成功')
                            this.dialogFormVisible=false
                        }else{
                            window_warning(res.message)
                        }
                    })
              } else {
              this.submitBtn=true
              setTimeout(() => {
              this.submitBtn=false
              }, 500);
              return false;
              }
          });
      },
      resetForm(formName) {
       this.$refs[formName].resetFields();
      },
      getSuspect(num){
          this.searchObj.dealStatus=num;
          this.initTableList()
        },
        changeAllStatus(){ //一键处理

          this.$confirm('确认一键处理选中的数据?', '提示',{
                    type: 'warning'
                }).then(()=>{

                  // this.searchObj.startTime=this.searchObj.time[0]?this.searchObj.time[0]:'';
                  // this.searchObj.endTime=this.searchObj.time[1]?this.searchObj.time[1]:'';
                  // var obj=this.searchObj;
                  // obj.indexTime=this.indexTime;
                  var obj={
                    flag:1
                  }
                  dealAllWarning(obj).then(res=>{
                    if(res.result){
                    this.$message.success('数据处理成功');
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