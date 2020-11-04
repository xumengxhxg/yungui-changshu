<!-- 案件管理 -->
<template>
  <div >
      <div class="text-left ph20 pv10">
        案件管理
      </div>
      <div  class="bg-white ph20 pv10">
          <div style="padding: 0 24px 20px;font-size: 14px;border-bottom: 1px solid #eee;">
            <div>
              <div>
                <span style="display: inline-block;margin-top: 10px;">
                  <span>案件名称：</span>
                  <el-input v-model="searchObj.caseName" size="small" placeholder="请输入案件名称" style="width: 200px;margin-right: 20px;" ></el-input>
                </span>
                <span style="display: inline-block;margin-top: 10px;">
                  <span>案件编号：</span>
                  <el-input v-model="searchObj.caseNo" size="small" placeholder="请输入案件编号" style="width: 200px;margin-right: 20px;" ></el-input>
                </span>
                <span style="display: inline-block;margin-top: 10px;">
                  <span>主办人：</span>
                  <el-input v-model="searchObj.sponsor" size="small" placeholder="请输入主办人" style="width: 200px;margin-right: 20px;" ></el-input>
                </span>
                <span style="display: inline-block;margin-top: 10px;">
                 <el-button size="small" style="margin-right: 20px;" type="warning" icon="el-icon-refresh" @click="refresh()">重置</el-button>
                  <el-button size="small" type="primary" icon="el-icon-search" @click="initTableList()" style="margin-left: 0px;" >搜索</el-button>
                </span>
              </div>
              </div>
            <div style="margin-top: 15px;">
              <el-button size="small" type="danger" icon="el-icon-delete"  @click="deleteData(2)"  style="margin-right: 15px;margin-left: 10px;">批量删除</el-button>
              <el-button size="small" type="primary" icon="el-icon-plus" @click="changebaseData(1)"  style="margin-right: 15px;">添加</el-button>
              <div ></div>
            </div>
        </div>
        <div style="padding: 10px 24px;">
            
            <el-table
                size="small"
                @selection-change="selectionTr"
                :data="tableObj.records"
                style="width: 100%">
                <el-table-column
                type="selection"
                width="55">
                </el-table-column>
                <el-table-column
                label="序号"
                align="center"
                type="index"
                :index="(index)=>{return (searchObj.pageNum-1)*searchObj.pageSize+index+1}"
                >
                </el-table-column>
                <el-table-column
                prop="caseName"
                label="案件名称"
                align="center"
                >
                </el-table-column>
                <el-table-column
                prop="caseNo"
                label="案件编号"
                align="center"
                >
                </el-table-column>
                <el-table-column
                prop="sponsor"
                label="主办人"
                align="center"
                >
                </el-table-column>
                <el-table-column
                prop="cosponsor"
                label="协办人"
                width="70"
                align="center"
                >
                
                </el-table-column>
               
                <el-table-column
                label="操作"
                align="center"
                width="250"
                >
                <template slot-scope="scope">
                   <el-button @click="changebaseData(2,scope.row)" :disabled="scope.row.useStatus===0" type="success" size="small">修改</el-button>
                    <el-button @click="deleteData(1,scope.row)" :disabled="scope.row.useStatus===0" type="danger" size="small">删除</el-button>
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
                    :current-page="searchObj.pageNum"
                    :page-size="searchObj.pageSize"
                    :total="tableObj.total">
                </el-pagination>
            </div>
            <div style="clear: both;"></div>
        </div>
        <!-- 新增开始 -->
        <el-dialog :title="accident_type===1?'新增案件':'编辑案件'" width="700px" class="handle_dialog" :visible.sync="addDialogFormVisible">
        <el-form  :model="addruleForm" label-width="200px" :rules="addrules" ref="addruleForm" class="demo-ruleForm" style="padding-left:20px">
          <el-form-item label="案件编号：" prop="caseNo">
            <el-input v-model="addruleForm.caseNo" placeholder="请输入案件编号" style="width: 300px;" ></el-input>
          </el-form-item>
          <el-form-item label="案件名称：" prop="caseName">
            <el-input v-model="addruleForm.caseName" placeholder="请输入案件名称" style="width: 300px;" ></el-input>
          </el-form-item>
          <el-form-item label="主办人：" prop="sponsor">
              <el-input v-model="addruleForm.sponsor" placeholder="请输入主办人" style="width: 300px;" ></el-input>
          </el-form-item>
          <el-form-item label="协办人：" >
            <el-input v-model="addruleForm.cosponsor" placeholder="请输入协办人" style="width: 300px;" ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary"  @click="submitForm('addruleForm')" :loading="submitBtn">提交</el-button>
          <el-button type="primary" @click="addDialogFormVisible = false">取消</el-button>
        </div>
      </el-dialog>
      <!-- 新增结束 -->
        
        
      </div>
  </div>
</template>
<script>
import { getAccidentList,deleteAccident,getCaseDetail,updateAccident,addAccident,addCase,updateCase,deleteCase } from '@/api/caseManagement'
export default {
  data(){
      return {
          searchObj:{
              caseName:'',
              caseNo:'',
              sponsor:'',
              pageNum:1,//当前页码
              pageSize:10,//当前pageseze
          },
          tableObj:{
              total:0,//数据总条数
              records:[],//table数据
              offset:1,//当前页码
              limit:10,//
          },
          selectTr:[],//选中的数据
          addDialogFormVisible:false,//弹窗默认状态
          accident_type:1,// 事故1添加  还是 2修改
          case_type:1,//案件1添加  还是 2修改
          addruleForm: {
            caseName: '',
            caseNo: '',
            sponsor:'',
            cosponsor:'',
           
          },
          submitBtn:false,
          addrules: {
            caseName: [
                  { required: true, message: '请输入案件名称', trigger: 'blur' },
              ],
            caseNo: [
                { required: true, message: '请输入案件编号', trigger: 'blur' }
              ],
            sponsor: [
                { required: true, message: '请输入主办人', trigger: 'blur' }
              ],
            
            },

          
      }
  },
  mounted() {
      this.initTableList() //初始化table
  },

  methods: {
      changebaseData(num, obj){ //事故添加、修改
       this.accident_type=num;
       
        if(num===2){
          this.addruleForm=this.$public.deepClone(obj)
       }else{
          this.addruleForm= {
            caseName: '',
            caseNo: '',
            sponsor:'',
            cosponsor:'',
          }
          this.$nextTick(()=>{
          this.$refs.addruleForm.resetFields(); 
        })
       }
       this.addDialogFormVisible=true;
      },

      initTableList(){ //初始化table
          getAccidentList(params).then((res) => {
          if(res.result){
             this.tableObj.records=res.rows
             this.tableObj.total=res.total
          }else{
            window_warning(res.msg)
          }
        }).catch()
      },
      refresh(){
          this.searchObj={
              caseName:'',
              caseNo:'',
              sponsor:'',
              cosponsor:'',
              pageNum:1,//当前页码
              pageSize:10,//当前pageseze
          },
          this.initTableList()
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
      deleteData(num,obj){ //删除
        var ids=[]
        if(num===1){
         ids.push(obj.id);
         this.$confirm('确认删除选中的数据?', '提示',{
            type: 'warning'
        }).then((res)=>{
          // var obj={
          //   ids:ids
          // }
          // console.log(delTags())
          deleteAccident(ids).then(res=>{
          if(res.result){
            this.$message.success('删除成功');
            this.searchObj.pageNum=1;
             this.initTableList() //初始化table

          }else{
            window_warning(res.msg)
          }
        }).catch()
        }).catch()
        }else{
          if(this.selectTr.length<1){
            this.$message.warning('请先选择数据');
            return false;
          }else{
            this.selectTr.forEach(item => {
              ids.push(item.id)
            });
            this.$confirm('确认删除选中的数据?', '提示',{
            type: 'warning'
        }).then((res)=>{
          // var obj={
          //   ids:ids
          // }
          // console.log(delTags())
          deleteAccident(ids).then(res=>{
          if(res.result){
            this.$message.success('删除成功');
            this.searchObj.pageNum=1;
             this.initTableList() //初始化table

          }else{
            window_warning(res.msg)
          }
        }).catch()
        }).catch()
          }
        }
        
        
        },
      submitForm(formName) {
          this.$refs[formName].validate((valid) => {
              if (valid) {
                // this.ruleForm.useStatus=1
                  if(this.accident_type===1){
                    addAccident(this.addruleForm).then((res) => {
                    if(res.result){
                        this.initTableList();
                        this.$message.success('添加成功');
                        this.addDialogFormVisible=false;
                    }else{
                      window_warning(res.msg);
                    }
                    })
                  }else{
                    updateAccident(this.addruleForm).then(res=>{
                      if(res.result){
                          this.initTableList()
                          this.$message.success('修改成功');
                          this.addDialogFormVisible=false;
                      }else{
                        window_warning(res.msg);
                        }
                    })
                  }
                
                
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
  },
}
</script>
<style  scoped>
 #case_header{
  background: url(../assets/img/case_header.png) no-repeat;
  background-size: 100% 100%;
 }
</style>
