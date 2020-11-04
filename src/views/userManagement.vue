<!-- 我的待办 -->
<template>
  <div >
      <div class="text-left ph20 pv10">
        用户管理
      </div>
      <div  class="bg-white ph20 pv10">
          <div style="padding: 0 24px 20px;font-size: 14px;border-bottom: 1px solid #eee;">
            <span style="display: inline-block;margin-top: 10px;">
              <span>
                <span>姓名：</span>
                <el-input
                    size="small"
                    v-model="searchObj.name"
                    style="width: 200px;margin-right: 20px;"
                    clearable>
                </el-input>
              </span>
              <span style="display: inline-block;margin-top: 10px;">
                <span>警号：</span>
                 <el-input
                    size="small"
                    v-model="searchObj.policeCode"
                    style="width: 200px;margin-right: 20px;"
                    clearable>
                </el-input>
              </span>
              <span style="display: inline-block;margin-top: 10px;">
                <span>手机号：</span>
                <el-input
                    size="small"
                    v-model="searchObj.phone"
                    style="width: 200px;margin-right: 20px;"
                    clearable>
                </el-input>
              </span>
              <span style="display: inline-block;margin-top: 10px;">
                <el-button size="small" type="warning" style="margin-right: 10px;" icon="el-icon-refresh" @click="refresh()">重置</el-button>
                <el-button size="small" type="primary" icon="el-icon-search" @click="initTableList()" style="margin-left: 0px;" >搜索</el-button>
              </span>
            </span>
            <div style="display: flex;justify-content:space-between;margin-top: 15px;">
              <span>
                 <el-button size="small" type="warning"  @click="deleteData(1)"  style="margin-right: 15px;">批量删除</el-button>
                 <el-upload
                 style="display:inline-block"
                 :headers="headers"
                  :action="action"
                   :on-success="handleSuccess"
                  :show-file-list="false"
                  :before-upload="handleBeforeUpload"
                  >
                 <el-button size="small" type="success"    style="margin-right: 15px;">导入警员</el-button>
                </el-upload>
                 <el-button size="small" type="success"  @click="downexcel()"  style="margin-right: 15px;">下载模板</el-button>
                 <el-button size="small" type="success"  @click="addPeople(1)"  style="margin-right: 15px;">添加警员</el-button>
              </span>
              <span>
                
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
                prop="name"
                align="center"
                label="姓名"
                >
                </el-table-column>
                
                <el-table-column
                prop="policeCode"
                align="center"
                label="警号"
                >
                </el-table-column>
                <el-table-column
                prop="phone"
                align="center"
                label="绑定手机"
                >
                </el-table-column>
                <el-table-column
                label="操作"
                align="center"
                >
                <template slot-scope="scope">
                    <el-button @click="addPeople(2,scope.row,true)"  type="primary" size="small">查看</el-button>
                    <el-button @click="addPeople(2,scope.row)"  type="success" size="small">编辑</el-button>
                    <el-button @click="deleteData(2,scope.row)"  type="error" size="small">删除</el-button>
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
      </div>
  </div>
</template>
<script>
import { addUserInfo,batchDeleteUser,deleteUserAttacheInfo,getPoliceDetail,getUserInfo,importData,downloadExcel } from '@/api/userManagement'
import { formatDate2,download} from '@/utils/global'
export default {
  data(){
      return {
          headers:{
            Authorization:localStorage.getItem('token')
          },
          searchObj:{
              name:'',//人员姓名
              policeCode:'',//警号
              phone:'',//手机号
              pageNum:1,//当前页码
              pageSize:10,//当前pageseze
          },
          action:this.axios.publicPath+"/cloudcabinet/userInfo/importData",//文件上传时基础路径
          indexTime:'',//获取table数据之后的当前时间
          btn_case:false,//嫌疑人切换情况
          indexTypeList:[],//下拉框类
          tableListTr:[],//table表头下拉
          tableTr:[],//table被选中的表头展示数据
          typelist:[],//类型选择list
          type:1,//1是添加。2是编辑
      
          indexObj:'',//当前选中行
          selectTr:[],//当前选中多行id集合
          tableObj:{
              total:0,//数据总条数
              records:[],//table数据
              records: [],
              offset:1,//当前页码
              limit:10,//
          },
         
      }
  },
  mounted() {
    console.log(this.axios.publicPath+"/cloudcabinet/userInfo/importData")
       if(this.$route.query.type){
           this.searchObj.dealStatus='0'
        }
      // this.searchObj.time=[formatDate2(((new Date()).getTime()-1000*60*60*24*90)),formatDate2((new Date()).getTime())]
      setTimeout(()=>{
       this.initTableList() //初始化table
      },200)
  },
  methods: {
     handleSuccess(res, file) { //图片上传
        if(res.result){
           this.$message.success('上传成功');
           this.initTableList() //初始化table
        }else{
          window_warning(res.msg)
        }
      },
      handleBeforeUpload(file) { //图片上传前格式及大小检查
       
      },
      deleteData(num,obj){ //添加、修改
        var data={
          delete:'batch',
          ids:[]
        }
        if(num===1){
            if(this.selectTr.length>0){
               this.selectTr.forEach(item=>{
                 data.ids.push(item.id)
               })
            }else{
              window_warning('请先选择要删除的数据！')
            }
        }else{
          data.ids.push(obj.id)
        }
         this.$confirm('确认删除选中的用户吗?', '提示',{
                        type: 'warning'
                    }).then(()=>{
                    console.log(data)
                    batchDeleteUser(data).then(res=>{
                    if(res.result){
                      this.$message.success('删除成功');
                        this.initTableList()
                    }else{
                      window_warning(res.msg)
                    }
                    }).catch()
                }).catch()
      },
      downexcel(){
         downloadExcel().then(res=>{
            window.location.href = this.axios.publicPath + '/cloudcabinet/userInfo/download' 
         }).catch()
      },
      handleClick(){ //编辑时警员tabs

      },
      tableTrChange(val){
        var arr=[]
          if(val.length>0){
            if(this.tableListTr.length>0){
            this.tableListTr.forEach(item=>{
               if(val.some(it=>{return it===item.value})){
                arr.push(item)
               }
            })
          }
          }
        //   console.log(arr)
          this.indexTypeList=arr
       },
      initTableList(){ //初始化table
        getUserInfo(this.searchObj).then(res=>{
          if(res.result){
              this.tableObj.records=res.rows;
              this.tableObj.total=res.total
          }else{
            window_warning(res.msg)
          }
        }).catch()
        },
        importExcel(){

        },
        addPeople(num,obj,bool){
          if(num===1){
            this.$router.push({path:'/policeManagement',query:{type:1}})
          }else{
            this.$router.push({path:'/policeManagement',query:{type:2,id:obj.id,bool:bool}})
          }
        },
        refresh(){ //重置
            this.searchObj={
              name:'',//人员姓名
              policeCode:'',//警号
              phone:'',//手机号
              pageNum:1,//当前页码
              pageSize:10,//当前pageseze
          },
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
                        // dealWarning(data).then(res=>{
                        //     if(res.code===200){
                        //         this.initTableList()
                        //         this.$message.success('操作成功')
                        //     }else{
                        //         window_warning(res.message)
                        //     }
                        // })
                        this.stepsActive+=1
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
        
        changeAllStatus(){ //一键处理

            this.$confirm('确认一键处理选中的数据?', '提示',{
                        type: 'warning'
                    }).then(()=>{

                    this.searchObj.startTime=this.searchObj.time[0]?this.searchObj.time[0]:'';
                    this.searchObj.endTime=this.searchObj.time[1]?this.searchObj.time[1]:'';
                    var obj=this.searchObj;
                    obj.indexTime=this.indexTime;
                    updateclickProcess(obj).then(res=>{
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
*{
  box-sizing: border-box;
}
 .avatar-uploader .el-upload {
    border: 1px dashed #ccc;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 78px;
    height: 78px;
    line-height: 78px;
    text-align: center;
  }
  .avatar {
    width: 78px;
    height: 78px;
    display: block;
  }
  .fingerprintgroup{
   /* margin: 3%; */
   width: 94%;
   height: 120px;

  }
  .fingerprintItem{
    display: inline-block;
   vertical-align: top;
    width: 23%;
    height: 100%;
   border: 1px solid #ccc;
   margin-right: 2%;
  }
  .fingerprintinfo{
    width: 100%;
    height: 70%;
  }
  .fingerprintinfo>div{
    width: 50%;
    height: 100%;
    display: inline-block;
    vertical-align: top;
  }
  .fingerprintimg{
    width: 70%;
    height: 70%;
    margin: 15%;
  }
  .fingerprintname{
    padding: 15%;
  }
  .fingerprintOper{
    width: 100%;
    height: 30%;
  }
  .fingerprintOper>div{
    display: inline-block;
    width: 50%;
    height: 100%;
    text-align: center;
    padding-top: 3%;
  }
</style>