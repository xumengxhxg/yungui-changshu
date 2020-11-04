<template>
    <div>
        <div class="text-left ph20 pv10">
            系统设置
        </div>
        <div class="bg-white ph20 pv10">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            
            <!-- 案卷柜 -->
            <el-tab-pane label="案卷柜" name="third">
                 <div>
                    <span style="display: inline-block;margin-top: 10px;width:50%">
                        <span style="display:inline-block;width:200px;text-align:right;font-size:15px;">ip网口：</span>
                        <el-input v-model="indexObj2.ipPort" size="small"  placeholder="ip网口" style="width: 240px;margin-right: 20px;" ></el-input>
                    </span>
                    <span style="display: inline-block;margin-top: 10px;width:50%">
                        <span style="display:inline-block;width:200px;text-align:right;font-size:15px;">柜门分配方式：</span>
                        <el-radio v-model="indexObj2.distributionType" label="1">管理员设置</el-radio>
                        <el-radio v-model="indexObj2.distributionType" label="2">系统自动分配</el-radio>
                    </span>
                </div>
                <div>
                    <span style="display: inline-block;margin-top: 10px;width:50%">
                        <span style="display:inline-block;width:200px;text-align:right;font-size:15px;">主副柜数量：</span>
                        <el-input-number v-model="indexObj2.mainNum"  size="small"  label="主柜数量"></el-input-number> 主 
                        <el-input-number v-model="indexObj2.viceNum"  size="small"  label="副柜数量"></el-input-number> 副
                    </span>
                    <span style="display: inline-block;margin-top: 10px;width:50%">
                        <span style="display:inline-block;width:200px;text-align:right;font-size:15px;">主柜柜格数量：</span>
                        <el-input-number v-model="indexObj2.mainLattice"  size="small"  label="主柜柜格数量"></el-input-number> 
                    </span>
                </div>
                <div>
                    <span style="display: inline-block;margin-top: 10px;width:50%">
                        <span style="display:inline-block;width:200px;text-align:right;font-size:15px;">副柜柜格数量：</span>
                        <el-input-number v-model="indexObj2.viceLattice"  size="small"  label="副柜柜格数量"></el-input-number> 
                    </span>
                    <span style="display: inline-block;margin-top: 10px;width:50%">
                        <span style="display:inline-block;width:200px;text-align:right;font-size:15px;">每个柜格存放案卷数量：</span>
                        <el-input-number v-model="indexObj2.latticeCapacity" size="small"  label="每个柜格存放生物检材数量"></el-input-number> 
                    </span>
                </div>
                
                <div style="text-align:center;margin-top:50px;">
                     <el-button size="small" style="display:inline-block;margin:0 auto" @click="submit(1)"> 提 交 </el-button>
                </div>
            </el-tab-pane>
        </el-tabs>
        </div>
    </div>
</template>
<script>
import { getBaseSet,updateBaseSet } from '@/api/systemSettings'
export default {
    data(){
        return {
             activeName: 'third',
           
             indexObj2:{
                 cabinetType:1,
                 ipPort:"",//ip
                 distributionType:'1',//柜门分配方式
                 mainNum:0,//主柜数量
                 viceNum:0,//副柜数量
                 mainLattice:0,//主柜格子数
                 viceLattice:0,//副柜格子数
                 latticeCapacity:0,//每个格子容量

             },//案卷柜
        }
    },
    created(){
        var obj={
            cabinetType:0
        }
        getBaseSet(obj).then(res=>{
             if(res.result){
                this.indexObj=res.data[0]
             }else{
                 window_warning(res.msg)
             }
          }).catch()
    },
     methods: {
      handleClick(tab, event) {
        var obj={
            cabinetType:0
        }
        if(this.activeName==='first'){
          getBaseSet(obj).then(res=>{
             if(res.result){
                this.indexObj=res.data[0]
             }else{
                 window_warning(res.msg)
             }
          }).catch()
        }else if(this.activeName==='second'){
            obj.cabinetType=2
            getBaseSet(obj).then(res=>{
             if(res.result){
                this.indexObj1=res.data[0]
                console.log(this.indexObj2)
             }else{
                 window_warning(res.msg)
             }
          }).catch()
        }else{
            obj.cabinetType=1
            getBaseSet(obj).then(res=>{
             if(res.result){
                this.indexObj2=res.data[0]
                this.indexObj2.distributionType=''+this.indexObj2.distributionType
             }else{
                 window_warning(res.msg)
                 
             }
          }).catch()
        }
      },
      submit(num){
          var obj;
          if(num===0){
            if(this.indexObj.lowTemperature>this.indexObj.highTemperature){
                window_warning('最低温度不能高于最高温度')
                return false;
            }
            this.indexObj.lowTemperature=''+this.indexObj.lowTemperature;
            this.indexObj.highTemperature=''+this.indexObj.highTemperature;
            
            obj=this.indexObj
          }else if(num===2){
            obj=this.indexObj1
          }else{
            obj=this.indexObj2
          }
          updateBaseSet(obj).then(res=>{
            if(res.result){
                this.$message.success('操作成功')
            }else{
                window_warning(res.msg)
            }
          }).catch()
      }
    }
}
</script>
<style lang="" scoped>
    
</style>