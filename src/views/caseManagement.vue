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
                  <span>人员姓名：</span>
                  <el-input v-model="searchObj.suspectName" size="small" placeholder="请输入人员姓名" style="width: 200px;margin-right: 20px;" ></el-input>
                </span>
                <span style="display: inline-block;margin-top: 10px;">
                  <span>身份证号：</span>
                  <el-input v-model="searchObj.identityCard" size="small" placeholder="请输入身份证号" style="width: 200px;margin-right: 20px;" ></el-input>
                </span>
                <span style="display: inline-block;margin-top: 10px;">
                  <span>查处中队：</span>
                  <el-select v-model="searchObj.discoverDept" clearable style="width: 200px;margin-right: 20px;" size="small" placeholder="请选择查获中队">
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
                  <!-- <el-input v-model="searchObj.discoverDept" size="small" placeholder="请输入查处中队" style="width: 200px;margin-right: 20px;" ></el-input> -->
                </span>
              </div>
              <div>
                <span style="display: inline-block;margin-top: 10px;">
                  <span>案件状态：</span>
                  <el-select v-model="searchObj.caseStatus" clearable style="width: 200px;margin-right: 20px;" size="small" placeholder="请选择案件状态">
                    <el-option  label="暂无" :value="3"></el-option>
                    <el-option  label="立案" :value="0"></el-option>
                    <el-option  label="破案" :value="1"></el-option>
                    <el-option  label="结案" :value="2"></el-option>
                  </el-select>
                </span>
                <span style="display: inline-block;margin-top: 10px;">
                  <span>时间范围：</span>
                  <el-date-picker
                    style="width:300px;margin-right: 20px;"
                    v-model="searchObj.time"
                    size="medium"
                    value-format="yyyy-MM-dd"
                    type="daterange"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
                </span>
                <span style="display: inline-block;margin-top: 10px;">
                 <el-button size="small" style="margin-right: 20px;" type="warning" icon="el-icon-refresh" @click="refresh()">重置</el-button>
                  <el-button size="small" type="primary" icon="el-icon-search" @click="initTableList()" style="margin-left: 0px;" >搜索</el-button>
                </span>
              </div>
              <!-- <span>腕带编号：</span>
              <el-input v-model="searchObj.tagCode" size="small" placeholder="请输入腕带编号" style="width: 200px;margin-right: 20px;" ></el-input>
              <span>基站编号：</span>
              <el-input v-model="searchObj.baseCode" size="small" placeholder="请输入基站编号" style="width: 200px;margin-right: 20px;" ></el-input> -->
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
                prop="accidentNo"
                label="事项编号"
                align="center"
                >
                </el-table-column>
                <el-table-column
                prop="suspectName"
                label="人员姓名"
                align="center"
                >
                </el-table-column>
                <el-table-column
                prop="identityCard"
                label="身份证号"
                align="center"
                >
                </el-table-column>
                <el-table-column
                prop="iotCard"
                label="人员性别"
                width="70"
                align="center"
                >
                <template slot-scope="scope">
                    <span v-show="scope.row.sex===0">女</span>
                    <span v-show="scope.row.sex===1">男</span>
                </template>
                </el-table-column>
                <el-table-column
                prop="driverCard"
                label="驾驶证号码"
                align="center"
                >
                <template slot-scope="scope">
                    <span >{{scope.row.driverCard?scope.row.driverCard:'——'}}</span>
                </template>
                </el-table-column>
                <el-table-column
                label="车辆类型"
                width="70"
                align="center"
                >
                <template slot-scope="scope">
                    <span v-show="scope.row.carType===0">小型汽车</span>
                    <span v-show="scope.row.carType===1">大型汽车</span>
                    <span v-show="scope.row.carType===2">摩托车</span>
                    <span v-show="scope.row.carType===3">电动车</span>
                    <span v-show="scope.row.carType===4">其他</span>
                </template>
                </el-table-column>
                <el-table-column
                prop="ethanolContent"
                label="血液乙醇含量"
                align="center"
                >
                </el-table-column>
                <el-table-column
                prop="discoverType"
                label="查处类型"
                width="70"
                align="center"
                >
                <template slot-scope="scope">
                    <span v-show="scope.row.discoverType===0">事故查获</span>
                    <span v-show="scope.row.discoverType===1">设卡查获</span>
                </template>
                </el-table-column>
                <el-table-column
                prop="discoverDept"
                label="查获中队"
                align="center"
                >
                </el-table-column>
                <el-table-column
                prop="discoverTime"
                label="查获时间"
                align="center"
                width="160"
                >
                </el-table-column>
                <el-table-column
                prop="caseStatus"
                label="案件状态"
                align="center"
                width="70"
                >
                 <template slot-scope="scope">
                    <span v-show="scope.row.caseStatus===null">暂无</span>
                    <span style="color:blue" @click="changecaseData(3,scope.row)" v-show="scope.row.caseStatus===0">立案</span>
                    <span style="color:blue" @click="changecaseData(3,scope.row)" v-show="scope.row.caseStatus===1">破案</span>
                    <span style="color:blue" @click="changecaseData(3,scope.row)" v-show="scope.row.caseStatus===2">结案</span>
                </template>
                </el-table-column>
                <el-table-column
                label="操作"
                align="center"
                width="250"
                >
                <template slot-scope="scope">
                    <el-button @click="changecaseData(1,scope.row)" v-show="scope.row.caseStatus===null" :disabled="scope.row.useStatus===0" type="primary" size="small">立案</el-button>
                    <el-button @click="changecaseData(2,scope.row)" v-show="scope.row.caseStatus===0 || scope.row.caseStatus===1 || scope.row.caseStatus===2" type="primary" size="small">编辑案件</el-button>
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
        <el-dialog :title="accident_type===1?'新增事项':'编辑事项'" width="700px" class="handle_dialog" :visible.sync="addDialogFormVisible">
        <el-form  :model="addruleForm" label-width="200px" :rules="addrules" ref="addruleForm" class="demo-ruleForm" style="padding-left:20px">
          <el-form-item label="人员姓名：" prop="suspectName">
            <el-input v-model="addruleForm.suspectName" placeholder="请输入人员姓名" style="width: 300px;" ></el-input>
          </el-form-item>
          <el-form-item label="身份证号：" prop="identityCard">
            <el-input v-model="addruleForm.identityCard" placeholder="请输入身份证号" style="width: 300px;" ></el-input>
          </el-form-item>
          <el-form-item label="人员性别：" >
            <el-radio-group v-model="addruleForm.sex">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="0">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="驾驶证号码：" >
            <el-input v-model="addruleForm.driverCard" placeholder="请输入驾驶证号码" style="width: 300px;" ></el-input>
          </el-form-item>
          <el-form-item label="车辆类型：" prop="carType">
            <el-select v-model="addruleForm.carType" clearable style="width: 300px;" size="small" placeholder="请选择车辆类型">
              <el-option  label="小型汽车" :value="0"></el-option>
              <el-option  label="大型汽车" :value="1"></el-option>
              <el-option  label="摩托车" :value="2"></el-option>
              <el-option  label="电动车" :value="3"></el-option>
              <el-option  label="其他" :value="4"></el-option>
            </el-select> 
          </el-form-item>
          <el-form-item label="血液乙醇含量(mg/100ml)：" >
            <el-input v-model="addruleForm.ethanolContent" placeholder="请输入血液乙醇含量" style="width: 300px;" ></el-input>
          </el-form-item>
          <el-form-item label="查处类型：" prop="discoverType">
            <el-select v-model="addruleForm.discoverType" clearable style="width: 300px;" size="small" placeholder="请选择查处类型">
              <el-option  label="事故查获" :value="0"></el-option>
              <el-option  label="设卡查获" :value="1"></el-option>
            </el-select> 
          </el-form-item>
          <el-form-item label="查获时间：" prop="discoverTime">
            <el-date-picker
            style="width:300px;"
            size="medium"
            v-model="addruleForm.discoverTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            placeholder="请选择查获时间">
          </el-date-picker>
          </el-form-item>
          <el-form-item label="查获中队：" prop="discoverDept">
            <el-select v-model="addruleForm.discoverDept" clearable style="width: 300px;" size="small" placeholder="请选择查获中队">
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
          <el-form-item label="简要案情：" prop="description">
            <el-input
              type="textarea"
              :autosize="{ minRows: 3, maxRows: 3}"
              resize='none'
              style="width: 300px;"
              v-model="addruleForm.description">
            </el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary"  @click="submitForm('addruleForm')" :loading="submitBtn">提交</el-button>
          <el-button type="primary" @click="addDialogFormVisible = false">取消</el-button>
        </div>
      </el-dialog>
      <!-- 新增结束 -->
         <!-- 弹窗 -->
      <el-dialog :title="case_type===1?'立案':(case_type===2?'编辑案件':'查看详情')" width="700px" class="handle_dialog" :visible.sync="caseDialogFormVisible">
        <div style="height:50px;text-align:center;font-size:18px;color:#fff" id="case_header">
          案件信息
        </div>
        <el-form  :model="editruleForm" label-width="200px" :rules="editrules" ref="editruleForm" class="demo-ruleForm" style="padding-left:20px">
          <el-form-item label="案件编号：" prop="caseNo">
            <el-input v-model="editruleForm.caseNo" v-show="case_type!==3" placeholder="请输入案件编号" :disabled="case_type===2" style="width: 300px;" ></el-input>
            <span v-show="case_type===3" v-text="editruleForm.caseNo"></span>
          </el-form-item>
          <el-form-item label="案件名称：" prop="caseName">
            <el-input v-model="editruleForm.caseName" v-show="case_type!==3" placeholder="请输入案件名称" style="width: 300px;" ></el-input>
            <span v-show="case_type===3" v-text="editruleForm.caseName"></span>
          </el-form-item>
          <el-form-item label="案件类型：" prop="caseType">
            <el-select v-model="editruleForm.caseType" v-show="case_type!==3" clearable style="width: 300px;" size="small" placeholder="请选择案件类型">
              <el-option  label="交通肇事" value="0"></el-option>
              <el-option  label="危险驾驶" value="1"></el-option>
            </el-select> 
            <span v-show="case_type===3" v-text="editruleForm.caseType==='0'?'交通肇事':'危险驾驶'"></span>
          </el-form-item>
          <el-form-item label="案件状态：" prop="caseStatus">
            <el-select v-model="editruleForm.caseStatus" v-show="case_type!==3" clearable style="width: 300px;" size="small" placeholder="请选择案件状态">
              <el-option  label="立案" value="0"></el-option>
              <el-option  label="破案" value="1"></el-option>
              <el-option  label="结案" value="2"></el-option>
            </el-select> 
            <span v-show="case_type===3" v-text="editruleForm.caseStatus==='0'?'立案':(editruleForm.caseStatus==='1'?'破案':'结案')"></span>
          </el-form-item>
          <el-form-item label="嫌疑人：" prop="suspectName">
            <el-input v-model="editruleForm.suspectName" v-show="case_type!==3" placeholder="请输入嫌疑人姓名" style="width: 300px;" ></el-input>
            <span v-show="case_type===3" v-text="editruleForm.suspectName"></span>
          </el-form-item>
          <el-form-item label="驾驶证状态：" prop="licenseStatus">
            <el-select v-model="editruleForm.licenseStatus" v-show="case_type!==3" clearable style="width: 300px;" size="small" placeholder="请选择驾驶证状态">
              <el-option  label="未吊销" value="0"></el-option>
              <el-option  label="吊销" value="1"></el-option>
              <el-option  label="无驾驶证" value="2" ></el-option>
            </el-select> 
            <span v-show="case_type===3" v-text="editruleForm.licenseStatus==='0'?'未吊销':(editruleForm.licenseStatus==='1'?'吊销':'无驾驶证')"></span>
          </el-form-item>
          <el-form-item label="主办人：" prop="sponsor">
            <el-input v-model="editruleForm.sponsor" v-show="case_type!==3" placeholder="请输入主办人姓名" style="width: 300px;" ></el-input>
            <span v-show="case_type===3" v-text="editruleForm.sponsor"></span>
          </el-form-item>
          <el-form-item label="立案时间：" prop="caseTime">
            <el-date-picker
            v-show="case_type!==3"
            style="width:300px;"
            size="medium"
            v-model="editruleForm.caseTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            placeholder="请选择立案时间">
          </el-date-picker>
            <span v-show="case_type===3" v-text="editruleForm.caseTime"></span>
          </el-form-item>
          <el-form-item label="破案时间：" >
            <el-date-picker
            v-show="case_type!==3"
            style="width:300px;"
            size="medium"
            value-format="yyyy-MM-dd HH:mm:ss"
            v-model="editruleForm.solveTime"
            type="datetime"
            placeholder="请选择破案时间">
          </el-date-picker>
            <span v-show="case_type===3" v-text="editruleForm.solveTime"></span>
          </el-form-item>
          <el-form-item label="结案时间：" >
            <el-date-picker
            v-show="case_type!==3"
            style="width:300px;"
            size="medium"
            value-format="yyyy-MM-dd HH:mm:ss"
            v-model="editruleForm.finishTime"
            type="datetime"
            placeholder="请选择结案时间">
          </el-date-picker>
            <span v-show="case_type===3" v-text="editruleForm.finishTime"></span>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="danger" v-show="case_type===2" @click="delecase()" >删除案件信息</el-button>
          <el-button type="primary" v-show="case_type!==3"  @click="submitForm('editruleForm')" >提交</el-button>
          <el-button type="primary" @click="caseDialogFormVisible = false">取消</el-button>
        </div>
      </el-dialog>
        
      </div>
  </div>
</template>
<script>
import { getAccidentList,deleteAccident,getCaseDetail,updateAccident,addAccident,addCase,updateCase,deleteCase } from '@/api/caseManagement'
export default {
  data(){
      return {
          searchObj:{
              suspectName:'',//人员姓名：
              identityCard:'',//身份证号：
              discoverDept:'',//查处中队：
              caseStatus:'',
              time:[],
              pageNum:1,//当前页码
              pageSize:10,//当前pageseze
          },
          tableObj:{
              total:0,//数据总条数
              records:[],//table数据
              records: [],
              offset:1,//当前页码
              limit:10,//
          },
          selectTr:[],//选中的数据
          addDialogFormVisible:false,//弹窗默认状态
          caseDialogFormVisible:false,//弹窗默认状态
          accident_type:1,// 事故1添加  还是 2修改
          case_type:1,//案件1添加  还是 2修改
          addruleForm: {
            suspectName: '',//人员姓名
            identityCard: '',//身份证号
            sex:1,//默认为男
            driverCard:'',//驾驶证号码
            carType:'',//车辆类型
            ethanolContent:'',//血液乙醇含量(mg/100ml)
            discoverType:'',//查处类型：
            discoverTime:'',//查获时间
            discoverDept:'',//查获中队
            description:'',//简要案情
            // useStatus:1,
            // iotCard:''
          },
          submitBtn:false,
          addrules: {
            suspectName: [
                  { required: true, message: '请输入人员姓名', trigger: 'blur' },
              ],
            identityCard: [
                { required: true, message: '请输入身份证号', trigger: 'blur' }
              ],
            // driverCard: [
            //     { required: true, message: '请输入驾驶证号码', trigger: 'blur' }
            //   ],
            carType: [
                { required: true, message: '请选择车辆类型', trigger: 'blur' }
              ],
            // ethanolContent: [
            //     { required: true, message: '请输入血液乙醇含量', trigger: 'blur' }
            //   ],
            discoverType: [
                { required: true, message: '请输入查处类型', trigger: 'blur' }
              ],
            discoverTime: [
                { required: true, message: '请选择查获时间', trigger: 'blur' }
              ],
            discoverDept: [
                { required: true, message: '请输入查获中队', trigger: 'blur' }
              ],
            description: [
                { required: true, message: '请输入简要案情', trigger: 'blur' }
              ]
            },

          editruleForm: { //修改对象
          },
          editrules: {
            caseNo: [
                  { required: true, message: '请输入案件编号', trigger: 'blur' },
              ],
            caseName: [
                  { required: true, message: '请输入案件名称', trigger: 'blur' }
              ],
            caseType: [
                { required: true, message: '请选择案件类型', trigger: 'blur' }
              ],
            caseStatus: [
                { required: true, message: '请选择案件状态', trigger: 'blur' }
              ],
            suspectName: [
                { required: true, message: '请输入嫌疑人', trigger: 'blur' }
              ],
            licenseStatus: [
                { required: true, message: '请选择驾驶证状态', trigger: 'blur' }
              ],
            sponsor: [
                { required: true, message: '请输入主办人', trigger: 'blur' }
              ],
            caseTime: [
                { required: true, message: '请输入立案时间', trigger: 'blur' }
              ]
            }
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
            suspectName: '',//人员姓名
            identityCard: '',//身份证号
            sex:1,//默认为男
            driverCard:'',//驾驶证号码
            carType:'',//车辆类型
            ethanolContent:'',//血液乙醇含量(mg/100ml)
            discoverType:'',//查处类型：
            discoverTime:'',//查获时间
            discoverDept:'',//查获中队
            description:'',//简要案情
          }
          this.$nextTick(()=>{
          this.$refs.addruleForm.resetFields(); 
        })
       }
       this.addDialogFormVisible=true;
      },
      changecaseData(num,obj){
       
         this.case_type=num;
        if(num===1){
          this.editruleForm=this.$public.deepClone(obj);
          // this.$nextTick(()=>{
          //   this.$refs.editruleForm.resetFields(); 
          // })
          this.caseDialogFormVisible=true;
        }else{
          var data={
           id:obj.caseId
         }
         getCaseDetail(data).then(res=>{
           if(res.result){
            this.editruleForm=res.data;
            if(num===2){
              this.editruleForm.accidentId=obj.id
            }
            this.editruleForm.caseType=''+this.editruleForm.caseType;
            this.editruleForm.caseStatus=''+this.editruleForm.caseStatus;
            this.editruleForm.licenseStatus=''+this.editruleForm.licenseStatus;
            this.editruleForm.finishTime=this.editruleForm.finishTime==="1900-01-01 00:00:00"?null:this.editruleForm.finishTime;
            this.editruleForm.solveTime=this.editruleForm.solveTime==="1900-01-01 00:00:00"?null:this.editruleForm.solveTime;
            this.caseDialogFormVisible=true;
           }else{
             window_warning(res.msg)
           }
         }).catch()
        }
         
        

      },
      delecase(){ //删除案件信息
       this.$confirm('确认删除案件信息?', '提示',{
            type: 'warning'
        }).then((res)=>{
          var ids=[this.editruleForm.id]
         deleteCase(ids).then(res=>{
           if(res.result){
             this.$message.success('删除案件信息成功');
             this.caseDialogFormVisible = false;
          this.initTableList();
           }else{
             window_warning(res.msg)
           }
         }).catch()
        }).catch()
      
      },
      initTableList(){ //初始化table
          if(this.searchObj.time.length>0){
            this.searchObj.startTime=this.searchObj.time[0]+" 00:00:00"
            this.searchObj.endTime=this.searchObj.time[1]+" 23:59:59"
          }else{
            this.searchObj.startTime=''
            this.searchObj.endTime=''
          }
          console.log(this.searchObj);
          let params=this.$public.deepClone(this.searchObj);
          params.time=[]
         
          getAccidentList(params).then((res) => {
          if(res.result){
             if(res.rows.length>0){
              res.rows.forEach(item=>{
                item.status=item.useStatus?'未使用':'使用'
              })
             }
             this.tableObj.records=res.rows
             this.tableObj.total=res.total
          }else{
            window_warning(res.msg)
          }
        }).catch()
      },
      refresh(){
          this.searchObj={
              suspectName:'',//人员姓名：
              identityCard:'',//身份证号：
              discoverDept:'',//查处中队：
              caseStatus:'',
              time:[],
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
                if(this.addDialogFormVisible){ //事故弹出框
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
                }else if(this.caseDialogFormVisible){ //案件弹出框
                  if(this.case_type===1){
                    this.editruleForm.accidentId=this.editruleForm.id
                    addCase(this.editruleForm).then((res) => {
                    if(res.result){
                        this.initTableList();
                        this.$message.success('立案成功');
                        this.caseDialogFormVisible=false;
                    }else{
                      window_warning(res.msg);
                    }
                    })
                  }else{
                    updateCase(this.editruleForm).then(res=>{
                      if(res.result){
                          this.initTableList()
                          this.$message.success('修改成功');
                          this.caseDialogFormVisible=false;
                      }else{
                        window_warning(res.msg);
                        }
                    })
                  }
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
