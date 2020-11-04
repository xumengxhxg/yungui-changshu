<!-- 我的待办 -->
<template>
  <div >
      <div class="text-left ph20 pv10">
        用户管理
      </div>
      <div style="background-color:#fff;padding:20px 20% 100px">
           <el-steps :active="stepsActive" v-show="type===1">
          <el-step title="基本信息" ></el-step>
          <el-step title="身份信息绑定" ></el-step>
          <el-step title="权限分配" ></el-step>
        </el-steps>
        <!-- 修改内容 -->
        <el-tabs v-model="tabsActive" @tab-click="handleClick" v-show="type===2">
          <el-tab-pane label="用户管理" name="1"></el-tab-pane>
          <el-tab-pane label="配置管理" name="2"></el-tab-pane>
          <el-tab-pane label="角色管理" name="3"></el-tab-pane>
        </el-tabs>

        <!-- 警员信息主体内容开始 -->
        <div>
          <!-- 步骤1开始 -->
           <el-form v-show="stepsActive===1 || tabsActive==='1'"  :model="ruleForm" label-width="80px" :rules="rules" ref="ruleForm" class="demo-ruleForm" style="padding-left:20px;margin:40px 250px;display:inline-block">
          <el-form-item label="姓名：" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入姓名" :disabled="bool" style="width: 300px;" ></el-input>
          </el-form-item>
          <el-form-item label="警号：" prop="policeCode">
            <el-input v-model="ruleForm.policeCode" placeholder="请输入警号" :disabled="bool" style="width: 300px;" ></el-input>
          </el-form-item>
          <el-form-item label="手机号："  prop="phone">
            <el-input v-model="ruleForm.phone" placeholder="请输入手机号" :disabled="bool" style="width: 300px;" ></el-input>
          </el-form-item>
          <el-form-item label="用户头像：" >
            <el-upload
              class="avatar-uploader userManagement"
              :headers="headers"
              :action="action"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="ruleForm.avatar" :src="ruleForm.avatar" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="密码：" prop="password1">
            <el-input v-model="ruleForm.password1" :disabled="bool" :placeholder="type===1?'请输入密码':''" style="width: 300px;" ></el-input> <br><span v-show="type!==1" style="color:red">如无需修改密码请留空</span>
          </el-form-item>
          <el-form-item label="确认密码：" prop="password2">
            <el-input v-model="ruleForm.password2" :disabled="bool" :placeholder="type===1?'请输入密码':''" style="width: 300px;" ></el-input>
          </el-form-item>
        </el-form>
          <!-- 步骤1结束 -->
          <!-- 步骤二开始  -->
          <div v-show="stepsActive===2 || tabsActive==='2'">
            <el-tag
             style="display:flex;justify-content:space-between;"
              class="box-card"
              v-show="tagshow"
              type="warning">
              <span>温馨提示！每个用户最多可录入五个指纹信息,请先将手指放在仪器上，再点击录入指纹</span>
              <i class="el-icon-circle-close" @click="tagshow=false"></i>
            </el-tag>
            <!-- 指纹card开始 -->
            <el-card class="box-card" style="margin-top:20px;">
              <div slot="header" class="clearfix">
                <span>指纹录入</span>
              </div>
              <!-- 指纹框开始 -->
              <div class="fingerprintgroup">
                <div v-for="(item,key) in ruleForm.attaches" :key="key"  class="fingerprintItem">
                   <div class="fingerprintinfo">
                     <div>
                       <img :src="item.src?item.src:require('../assets/public_img/指纹.png')" class="fingerprintimg" alt="">
                     </div>
                     <div class="fingerprintname">
                       <div style="height:30%">指纹{{key+1}}</div>
                     </div>
                   </div>
                   <div class="fingerprintOper">
                     <div style="color:blue;border-top:1px solid #ccc;border-right:1px solid #ccc;" @click="addfingerprint(item,key)">重新录入</div>
                     <div style="color:red;border-top:1px solid #ccc;" @click="delefingerprint(item,key)">删除</div>
                   </div>
                </div>
                <div class="fingerprintItem" style="text-align:center;padding-top:5%" @click="addfingerprint()">
                   <div><i class="el-icon-plus"></i>录入指纹</div>
                </div>
              </div>
              <!-- 指纹框结束 -->
            </el-card>
            <!-- 指纹card开始 -->

            <!-- 人脸card开始 -->
            <el-card class="box-card" style="margin-top:20px;" v-show="false">
              <div slot="header" class="clearfix">
                <span>人脸录入</span>
              </div>
              <!-- 人脸录入开始 -->
              <div class="fingerprintgroup">
                <div v-for="(item,key) in faceArr" :key="key"  class="fingerprintItem">
                   <div class="fingerprintinfo">
                     <div>
                       <img src="../assets/public_img/指纹.png" class="fingerprintimg" alt="">
                     </div>
                     <div class="fingerprintname">
                       <div style="height:30%">132</div>
                     </div>
                   </div>
                   <div class="fingerprintOper">
                     <div style="color:blue;border-top:1px solid #ccc;border-right:1px solid #ccc;">重新录入</div>
                     <div style="color:red;border-top:1px solid #ccc;">删除</div>
                   </div>
                </div>
                <div class="fingerprintItem" style="text-align:center;padding-top:5%" @click="addface()">
                   <div><i class="el-icon-plus"></i>录入人脸</div>
                </div>
              </div>
              <!-- 人脸录入结束 -->
            </el-card>
            <!-- 人脸card开始 -->
             
              <!-- 卡片card开始 -->
            <el-card class="box-card" style="margin-top:20px;" v-show="false">
              <div slot="header" class="clearfix">
                <span>卡片录入</span>
              </div>
              <!-- 卡片录入开始 -->
              <div class="fingerprintgroup">
                <div v-for="(item,key) in cardArr" :key="key"  class="fingerprintItem">
                   <div class="fingerprintinfo">
                     <div>
                       <img src="../assets/public_img/指纹.png" class="fingerprintimg" alt="">
                     </div>
                     <div class="fingerprintname">
                       <div style="height:30%">132</div>
                     </div>
                   </div>
                   <div class="fingerprintOper">
                     <div style="color:blue;border-top:1px solid #ccc;border-right:1px solid #ccc;">重新录入</div>
                     <div style="color:red;border-top:1px solid #ccc;">删除</div>
                   </div>
                </div>
                <div class="fingerprintItem" style="text-align:center;padding-top:5%" @click="addface()">
                   <div><i class="el-icon-plus"></i>录入卡片</div>
                </div>
              </div>
              <!-- 卡片录入结束 -->
            </el-card>
            <!-- 卡片开始 -->
          </div>
          <!-- 步骤二结束 -->

           <!-- 步骤三开始  -->
          <div v-show="stepsActive===3 || tabsActive==='3'">
            <div class="cabinet_group">
                <div style="margin:5px;position:relative" @click="changepower(-1)">
                  <div style="height:20%;line-height:20%;padding:0">
                    <div class="cabinet_text" >后台</div>
                    <div class="cabinet_text" style="text-align:center;color:blue;width:20%;"><i v-show="power.system" class="el-icon-check"></i></div>
                  </div>
                  <div style="height:50%;width:40%;margin:0% 30%;">
                    <img style="height:100%;width:100%;" src="../assets/public_img/电脑 (1).png" alt="">
                  </div>
                  <div style="position:absolute;width:0;height:0;border-bottom:60px solid #FD3C5F; border-left:60px solid #fff;bottom:0;right:0;"></div>
                  <i class="el-icon-s-custom" style="position:absolute;color:#fff;font-size:40px;bottom:0;right:0"></i>
                </div>
                <div  @click="changepower(0)">
                  <div style="height:20%;line-height:20%;padding:0">
                    <div class="cabinet_text" >生物检材柜</div>
                    <div class="cabinet_text" style="text-align:center;color:blue;width:20%;"><i v-show="power.swjcg" class="el-icon-check"></i></div>
                  </div>
                  <div style="height:50%;width:40%;margin:0% 30%;">
                    <img style="height:100%;width:100%;" src="../assets/public_img/冰箱.png" alt="">
                  </div>
                </div>
                <div  @click="changepower(1)">
                  <div style="height:20%;line-height:20%;padding:0">
                    <div class="cabinet_text" >案卷柜</div>
                    <div class="cabinet_text" style="text-align:center;color:blue;width:20%;"><i v-show="power.ajg" class="el-icon-check"></i></div>
                  </div>
                  <div style="height:50%;width:40%;margin:0% 30%;">
                    <img style="height:100%;width:100%;" src="../assets/public_img/柜子 (1).png" alt="">
                  </div>
                </div>
                <div  @click="changepower(2)">
                  <div style="height:20%;line-height:20%;padding:0">
                    <div class="cabinet_text" >涉案财物柜</div>
                    <div class="cabinet_text" style="text-align:center;color:blue;width:20%;"><i v-show="power.sacwg" class="el-icon-check"></i></div>
                  </div>
                  <div style="height:50%;width:40%;margin:0% 30%;">
                    <img style="height:100%;width:100%;" src="../assets/public_img/柜子.png" alt="">
                  </div>
                </div>
            </div>
              
          </div>
          <!-- 步骤三结束 -->
        </div>
        <!-- 警员主体内容信息结束 -->

        <div style="text-align:center">
          <el-button type="primary" v-show="type===1 &&stepsActive > 1 && stepsActive <4 " @click="Backsteps(1)" >上一步</el-button>
          <el-button type="primary" v-show="type===1 && stepsActive < 3" @click="Gosteps(1)" >下一步</el-button>
          <el-button type="primary" v-show="type===1 && stepsActive === 3" @click="submitForm(3,'ruleForm')" >确认提交</el-button>
          <el-button type="primary" v-show="type===2 && tabsActive !== '2'" @click="submitForm(3,'ruleForm',true)" :disabled="bool">提交修改</el-button>
          <el-button type="primary" v-show="tabsActive !== '2'" @click="go_user_page()">取消</el-button>
          <el-button type="primary" v-show="tabsActive === '2'" @click="go_user_page()">关闭</el-button>
        </div>
      </div>
      </div>
  <!-- </div> -->
</template>
<script>
import { addUserInfo,batchDeleteUser,deleteUserAttacheInfo,getPoliceDetail,getUserInfo,importData,updateBasicUserInfo,updateUserAttacheInfo,updateUserPermits } from '@/api/userManagement'
import { formatDate2} from '@/utils/global'
export default {
  data(){
      return {
          headers:{
            Authorization:localStorage.getItem('token')
          },
          type:1,//1是添加。2是编辑
          stepsActive:1,//进度条步骤
          tabsActive:'1',//tabs状态
          tagshow:true,//步骤二的提示语
          // fingerprintArr:[{},{}],//指纹数组对象
          faceArr:[],//人脸数组对象
          cardArr:[],//卡片数组对象
          action:process.env.VUE_APP_BASE_API+"/cloudcabinet/common/upload",//图片上传时基础路径
          ruleForm:{
            name:'',//姓名
            policeCode:'',//警号
            phone:'',//手机号
            avatar:'',//头像
            password:'',//密码
            permits:[],//柜子权限
            attaches:[],//指纹
          },
          power:{
            system:false,
            swjcg:false,
            ajg:false,
            sacwg:false,
          },
          editObj0:{},//当前修改对象
          editObj1:{},//当前修改对象
          editObj2:{},//当前修改对象
          rules:{
            name: [
                  { required: true, message: '请输入姓名', trigger: 'blur' },
              ],
            policeCode: [
                { required: true, message: '请输入警号', trigger: 'blur' },
            ],
          },
          //指纹开始
          width:0,//指纹条件
          
		      FPDEVICE_URL:"http://127.0.0.1:8867",
          FPDEVICE_TIMEOUT : 1000, 
          xmlHttp:"",
          featureStr:"",//指纹标识

          //查看
          bool:false,
          fingerprintobj:{},//指纹对象
          fingerprintIndex:0,//指纹索引
      }
  },
  mounted() {
       if(this.$route.query.type){
           if(this.$route.query.type===1 || this.$route.query.type==='1'){
             this.type=1;
             this.stepsActive=1;//进度条步骤
             this.tabsActive='';//tabs状态
           }else{
               this.type=2;
               this.stepsActive=0;//进度条步骤
               this.tabsActive='1';//tabs状态
               var data={
                 id:this.$route.query.id
               }
               getPoliceDetail(data).then(res=>{
                 if(res.result){
                     res.data.id=this.$route.query.id
                     this.ruleForm=res.data;
                     this.editObj0=this.$public.deepClone(res.data);
                     this.editObj1=this.$public.deepClone(res.data);
                     this.editObj2=this.$public.deepClone(res.data);
                     for(var i=0;i<res.data.permits.length;i++){
                       this.changepower(res.data.permits[i].permitType)
                     }
               this.bool=this.$route.query.bool==='true'?true:false
                 }else{
                   window_warning(res.msg)
                 }
               }).catch()
           }
        }  

      setTimeout(()=>{
      },200)
  },
  methods: {
    addface(){
      this.$message.warning('功能暂未接入');
      return false
    },
      changepower(num){
         if(this.bool){
          this.$message.error('查看状态下，不能修改权限');
          return false
        }
        if(num===-1){
         this.power.system = !this.power.system;
         if(this.power.system){ //系统权限
           this.power.swjcg=true;
           this.power.ajg=true;
           this.power.sacwg=true;
         }
        }else if(num===0){ //生物检材柜权限
           if(this.power.system){
           this.power.swjcg=true;
         }else{
           this.power.swjcg=!this.power.swjcg;
         }
        }else if(num===1){ //案卷柜权限
           if(this.power.system){
           this.power.ajg=true;
         }else{
           this.power.ajg=!this.power.ajg;
         }
        }else if(num===2){ //案卷柜权限
           if(this.power.system){
           this.power.sacwg=true;
         }else{
           this.power.sacwg=!this.power.sacwg;
         }
        }
      },
      handleAvatarSuccess(res, file) { //图片上传
      if(res.result){
        this.ruleForm.avatar = res.url;
      }else{
        window_warning(res.msg)
      }
      },
      beforeAvatarUpload(file) { //图片上传前格式及大小检查
        // console.log(file)
        const isJPG = file.type === 'image/jpg' || file.type === 'image/png' || file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 500;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 500kb!');
        }
        return isJPG && isLt2M;
      },
      addfingerprint(obj,index){
        if(this.bool){
          this.$message.error('查看状态下，不能录入指纹');
          return false
        }
        console.log(obj)
        if(obj){
          this.fingerprintobj=obj;
          this.fingerprintIndex=index+1
        }else{
          this.fingerprintobj={};
          this.fingerprintIndex=0
        }
        this.witch = 0;
        // console.log(this.fingerprintIndex,Boolean(this.fingerprintIndex))
        if(!Boolean(this.fingerprintIndex)){
          if(this.ruleForm.attaches.length>4 && !index){
         window_warning('用户最多只能录入五个指纹');
         return false;
        }
        }
        this.getimage1 (0);
      },
      getimage1 (colors) 
          {
            this.xmlHttp = new XMLHttpRequest();
            this.xmlHttp.open("POST", this.FPDEVICE_URL, true);
            this.xmlHttp.onreadystatechange= this.back_getimage(); 
            var data; 
            var qulity = 60;
            // var checks = document.getElementById("vehicle").checked;
              data = "send{getimgae,0,"+qulity+",1}";//send(命令码,颜色,质量,缓存区)  命令码:getimage  颜色:0-3 质量:0-100  缓冲区:1-2
            this.xmlHttp.send(data); 
          },
      back_getimage(){	
        setTimeout(()=>{
          if(this.xmlHttp.status == 200 && this.xmlHttp.readyState == 4)
        {
          var getstr =  this.xmlHttp.responseText;
          var strarr = getstr.split("|");
          if(strarr.length == 4)
          {
            var ret = strarr[0];
            var qulity = strarr[1];
            var bmpbase = strarr[2];
            var fpcharbase = strarr[3];
            if(ret==="1"){
              if(Boolean(this.fingerprintIndex)){ //               指纹重新录入
              // console.log(this.fingerprintIndex)
              console.log(this.ruleForm.attaches)
                var data_1=this.ruleForm.attaches[this.fingerprintIndex-1]
                data_1.feature=fpcharbase;
                // this.ruleForm.attaches[this.fingerprintIndex-1].src=bmpbase
                // console.log(data_1)
                updateUserAttacheInfo(data_1).then(res=>{
                  if(res.result){
                  //  this.ruleForm.attaches.push(data)
                   this.$message.success('指纹重新录入成功');
                    var data_x={
                        id:this.$route.query.id
                      }
                   getPoliceDetail(data_x).then(res=>{
                    if(res.result){
                        res.data.id=this.$route.query.id
                        this.ruleForm=res.data;
                        
                        }else{
                          window_warning(res.msg)
                        }
                      }).catch()
                  }else{
                    window_warning('指纹录入失败,请重试')
                  }
                }).catch()
                console.log(this.$route.query.id)
                if(this.$route.query.id){
                     var data_x={
                        id:this.$route.query.id
                      }
                  getPoliceDetail(data_x).then(res=>{
                    if(res.result){
                        res.data.id=this.$route.query.id
                        this.ruleForm=res.data;
                        for(var i=0;i<res.data.permits.length;i++){
                          this.changepower(res.data.permits[i].permitType)
                            }
                      this.bool=this.$route.query.bool==='true'?true:false
                        }else{
                          window_warning(res.msg)
                        }
                      }).catch()

                }else{
                  
                }
                
              }else{                                                           //添加指纹
                 if(this.$route.query.type===1 || this.$route.query.type==='1'){
                this.$message.success('指纹录入成功');
                var  leng=this.ruleForm.attaches.length
                this.ruleForm.attaches.push({})
                this.ruleForm.attaches[leng].feature=fpcharbase;
                // this.ruleForm.attaches[leng].src=bmpbase;
                this.ruleForm.attaches[leng].name="指纹"+(leng+1)
              }else{
                console.log(this.editObj1)
                var data={
                  policeId:Number(this.editObj1.id),
                  type:0,
                  // src:bmpbase,
                  feature:fpcharbase
                }
                updateUserAttacheInfo(data).then(res=>{
                  if(res.result){
                   this.ruleForm.attaches.push(data)
                   this.$message.success('指纹添加成功');
                   var data_x={
                        id:this.$route.query.id
                      }
                   getPoliceDetail(data_x).then(res=>{
                    if(res.result){
                        res.data.id=this.$route.query.id
                        this.ruleForm=res.data;
                        
                        }else{
                          window_warning(res.msg)
                        }
                      }).catch()
                  }else{
                    window_warning('指纹录入失败,请重试')
                  }
                }).catch()
                
              }
              }
              
              
            }else{
              this.$message.error('指纹录入失败,请先将手指放在仪器上，再点击录入指纹')
            }
          }
          else 
          { 
            this.$message.error('指纹录入失败')
          }
        }
        else 
          this.$message.error('未知错误')
        },1000)
        // return false;		
        
      } ,
      delefingerprint(obj,index){
        this.$confirm('确认删除当前指纹吗?', '提示',{
              type: 'warning'
          }).then(()=>{
            if(obj.id){
              var data={
                attacheId:obj.id
              }
              deleteUserAttacheInfo(data).then(res=>{
                if(res.result){
                  this.$message.success('指纹删除成功')
                }else{
                  window_warning(res.msg)
                }
              }).catch()
            }
            
        this.ruleForm.attaches.splice(index,1)
      }).catch()
      },
      Backsteps(){
          this.stepsActive-=1
      },
      Gosteps(){
        var formName=''
        if(this.stepsActive===1){
          formName='ruleForm';
          this.rules.password1=[
                  { required: true, message: '请输入密码', trigger: 'blur' },
              ]
          this.rules.password2=[
                  { required: true, message: '请输入确认密码', trigger: 'blur' },
              ]
          if(this.ruleForm.password1 && this.ruleForm.password2 && this.ruleForm.password1 != this.ruleForm.password2){
                    window_warning('两次密码输入不一致，请从新输入!');
                    return false;
                  }
        }
        if(this.tabsActive==='1'){
          formName='ruleForm';
        }
        if(formName){
                 this.$refs[formName].validate((valid) => {
                if (valid) {
                this.stepsActive+=1
                        
                } else {
                // this.submitBtn=true
                // setTimeout(() => {
                // }, 500);
                return false;
                }
            });
            }else{
                this.stepsActive+=1
            }
      },
      handleClick(){ //编辑时警员tabs

      },
     
        selectionTr(selection){ //table checkbox发生变化时
            this.selectTr=selection
        },
        submitForm(num,formName,bool) {
           if(bool){ //修改提交
              if(this.tabsActive==='1'){ //修改提交基本信息1
                if(this.ruleForm.password1 && this.ruleForm.password2 && this.ruleForm.password1 != this.ruleForm.password2){
                    window_warning('两次密码输入不一致，请从新输入!');
                    return false;
                  }
                 this.editObj0.name=this.ruleForm.name;
                 this.editObj0.policeCode=this.ruleForm.policeCode;
                 this.editObj0.phone=this.ruleForm.phone;
                 this.editObj0.avatar=this.ruleForm.avatar;
                 this.editObj0.password=this.ruleForm.password1;
                 updateBasicUserInfo(this.editObj0).then(res=>{
                   if(res.result){
                    this.$message.success('基本信息修改成功')
                   }else{
                     window_warning(res.msg)
                   }
                 }).catch()
              }else if(this.tabsActive==='2'){ //指纹
                // this.editObj1.attaches=this.ruleForm.attaches;
                // updateUserAttacheInfo(this.editObj0).then(res=>{
                //    if(res.result){
                //     this.$message.success('基本信息修改成功')
                //    }else{
                //      window_warning(res.msg)
                //    }
                //  }).catch()

              }else if(this.tabsActive==='3'){ //权限
                  this.editObj2.permits=[];
                  if(this.power.system){
                    this.editObj2.permits.push({
                      permitType:-1
                    })
                  }
                  if(this.power.swjcg){
                    this.editObj2.permits.push({
                      permitType:0
                    })
                  }
                  if(this.power.ajg){
                    this.editObj2.permits.push({
                      permitType:1
                    })
                  }
                  if(this.power.sacwg){
                    this.editObj2.permits.push({
                      permitType:2
                    })
                  }
                  updateUserPermits(this.editObj2).then(res=>{
                    if(res.result){
                       this.$message.success('权限修改成功')
                    }else{
                      window_warning(res.msg)
                    }
                  }).catch()
              }
           }else{
             if(!this.ruleForm.password1 || !this.ruleForm.password2){
                window_warning('请输入密码和确认密码')
             }
              if(this.ruleForm.password1 != this.ruleForm.password2){
              window_warning('两次密码输入不一致，请从新输入!');
              return false;
            }
            this.ruleForm.password=this.ruleForm.password1
            if(this.power.system){
              this.ruleForm.permits.push({
                permitType:-1
              })
            }
            if(this.power.swjcg){
              this.ruleForm.permits.push({
                permitType:0
              })
            }
            if(this.power.ajg){
              this.ruleForm.permits.push({
                permitType:1
              })
            }
            if(this.power.sacwg){
              this.ruleForm.permits.push({
                permitType:2
              })
            }
            if(formName){
                 this.$refs[formName].validate((valid) => {
                if (valid) {
                        addUserInfo(this.ruleForm).then(res=>{
                            if(res.result){
                                this.$router.push({path:'/userManagement'})
                                this.$message.success('操作成功')
                            }else{
                                window_warning(res.message)
                            }
                        })
                } else {
                // this.submitBtn=true
                // setTimeout(() => {
                // }, 500);
                return false;
                }
            });
            }else{
                this.stepsActive+=1
            }
           }
           
        },
        resetForm(formName) {
        this.$refs[formName].resetFields();
        },
        go_user_page(){
            this.$router.push({path:'/userManagement'})
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
   height: 300px;

  }
  .fingerprintItem{
    display: inline-block;
   vertical-align: top;
    width: 28%;
    height: 48%;
   border: 1px solid #ccc;
   margin-right: 2%;
   margin-top: 1%;
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
  .cabinet_group{
      width: 100%;
      height: 200px;
      margin: 10% 0;
      display: flex;
      justify-content:space-between;
  }
  .cabinet_group>div{
      width: 20%;
      height: 100%;
      /* background-color: #409EFF; */
      margin:5px;
      border: 1px solid #50ACF5;
      padding-top: 10px;
      border-radius: 10px;
      overflow: hidden;
    
  }
  .cabinet_text{
      display: inline-block;
      width:80%;
      height: 100%;
      line-height: 100%;
      background-color: #fff;
      vertical-align: top;
      
  }
</style>