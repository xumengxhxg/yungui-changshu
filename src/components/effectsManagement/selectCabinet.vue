<!-- 分配 -->
<!-- 新增编辑执行单位 -->
<template>
  <div>
    <el-dialog title="随身物品柜" width='70%' :visible.sync="isShow">
      <div>
        <!-- <div class="title">
          <img src="@/assets/images/police.jpg" alt="">
          <span class="text">随身物品柜</span>
        </div> -->
        <div class="">
          <div class="clearfix" style="margin: 0 auto; width: 100%; border: 1px solid #cecece;padding: 5px; font-size: 12px">
            <div class="pull-left" style="width: 25%">
              <div :class="index == 1 || index == 2 ||index == 3 || index == 4 || index == 5 || index == 6 ? 'cabinet-4' : 'cabinet'" class="cursor" v-for="(item, index) in cabinetNewList.slice(0, 10)" :key="item.doorNo" @click="select(item.doorNo)">
                <div :class="item.usedSpace || item.inExistence ? 'warning' : 'default'">
                  {{item.doorNo}}
                  <div>已用：{{item.usedSpace}} </div>
                  <div>已登记：{{item.inExistence}} </div>
                </div>
              </div>
            </div>
            <div class="pull-left" style="width: 25%">
              <div :class="index == 1 || index == 2 ||index == 3 || index == 4 || index == 5 || index == 6? 'cabinet-4' : 'cabinet'" class="cursor" v-for="(item, index) in cabinetNewList.slice(10, 20)" :key="item.doorNo" @click="select(item.doorNo)"  >
                <div :class="item.usedSpace || item.inExistence ? 'warning' : 'default'">
                  {{item.doorNo}}
                  <div>已用：{{item.usedSpace}} </div>
                  <div>已登记：{{item.inExistence}} </div>
                </div>
              </div>
            </div>
            <div class="pull-left" style="width: 25%">
              <div :class="index == 1 || index == 2 ||index == 3 || index == 4 || index == 5 ? 'cabinet-2' :  index == 6 ||index == 7 || index == 8 ? 'cabinet-4' : index == 9  ? 'cabinet-5' : 'cabinet'" class="cursor" v-for="(item, index) in cabinetNewList.slice(20, 30)" :key="item.doorNo" @click="select(item.doorNo)" >
                <div :class="item.usedSpace || item.inExistence ? 'warning' : 'default'">
                  {{item.doorNo}}
                  <div>已用：{{item.usedSpace}} </div>
                  <div>已登记：{{item.inExistence}} </div>
                </div>
              </div>
            </div>
            <div class="pull-left" style="width: 25%">
              <div :class="index == 1 || index == 2 ||index == 3 || index == 4 || index == 5 ? 'cabinet-3' :  index == 6 ||index == 7 || index == 8 ? 'cabinet-4' : index == 9  ? 'cabinet-5' : 'cabinet'" class="cursor" v-for="(item, index) in cabinetNewList.slice(30, 40)" :key="item.doorNo" @click="select(item.doorNo)" >
               <div :class="item.usedSpace || item.inExistence ? 'warning' : 'default'">
                  {{item.doorNo}}
                  <div>已用：{{item.usedSpace}} </div>
                  <div>已登记：{{item.inExistence}} </div>
                </div>
              </div>
            </div>
            <div class="screen">
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getStoreName } from '@/api/cabinet'
export default {
  name: 'selectCabinet',
  props: {
    dialogVisible: Boolean
  },
  data () {
    return {
      isShow: this.dialogVisible,
      disabled: false,
      cabinetNewList: [],
      sum: 0,
      cabinetList: [{doorNo: 'A-1'}, {doorNo: 'A-2'},{doorNo: 'A-3'},{doorNo: 'A-4'},{doorNo: 'A-5'},{doorNo: 'A-6'},{doorNo: 'A-7'},{doorNo: 'A-8'},{doorNo: 'A-9'},{doorNo: 'A-10'},
      {doorNo: 'A-11'},{doorNo: 'A-12'},{doorNo: 'A-13'},{doorNo: 'A-14'},{doorNo: 'A-15'},{doorNo: 'A-16'},{doorNo: 'A-17'},{doorNo: 'A-18'},{doorNo: 'A-19'},{doorNo: 'A-20'}, 
      {doorNo: 'B-1'}, {doorNo: 'B-2'},{doorNo: 'B-3'},{doorNo: 'B-4'},{doorNo: 'B-5'},{doorNo: 'B-6'},{doorNo: 'B-7'},{doorNo: 'B-8'},{doorNo: 'B-9'},{doorNo: 'B-10'},
      {doorNo: 'B-11'},{doorNo: 'B-12'},{doorNo: 'B-13'},{doorNo: 'B-14'},{doorNo: 'B-15'},{doorNo: 'B-16'},{doorNo: 'B-17'},{doorNo: 'B-18'},{doorNo: 'B-19'},{doorNo: 'B-20'}]
    }
  },
  created() {
    this.getStoreName()
  },
  methods: {
    getStoreName() {
      let params = {
        cabinetType: 3
      }
      getStoreName(params).then((res) => {
        this.cabinetList.forEach((item) => {
          // this.sum = res.data.capacity
          // item.surplusSpace = res.data.capacity // 未使用
          item.usedSpace = 0 //已使用
          item.inExistence = 0 //已登记
          if (res.data) {
            res.data.forEach((doorItem) => {
              if (item.doorNo == doorItem.doorNo) {
                // item.surplusSpace = doorItem.surplusSpace
                item.usedSpace = doorItem.storedCount
                item.inExistence = doorItem.toBeStoredCount
              } else {
                // item.surplusSpace = res.data.capacity // 未使用
                // item.usedSpace = 0 //已使用
              }
            })
          } else {
            // item.surplusSpace = res.data.capacity // 未使用
            item.usedSpace = 0 //已使用
            item.inExistence = 0
          }
        })
        this.cabinetNewList = this.cabinetList
      }).catch()
    },
    select(val) {
      this.isShow = false
      this.$emit('selectCabinet', val)
    },
    save() {
      if (this.title === '新增单位') {
        this.addUnitInfo()
      } else {
        this.updateUnitInfo()
      }
    }
  },
  watch: {
    isShow (to) {
      this.$emit('update', to)
    }
  }
}
</script>
<style lang="less" scoped>
.bg-c8ccce {
  background: #c8ccce;
  cursor: not-allowed
}
.bg-ecf8ff {
  background: #ecf8ff;
}
.bg-ecf8ff:hover {
  background: #bbe5fe;
}
.title {
  text-align: center;
  .text {
    font-size: 25px;
  }
  img {
    width: 35px;
    position: relative;
    top: 10px;
    left: -10px;
  }
}
.cabinet {
  width: 100%; 
  height: 160px;
  padding: 5px;
  box-sizing: border-box;
  >div.default {
    background: rgb(236, 248, 255);
    width: 100%;
    height: 100%;
    border: 1px solid #cecece;
    padding: 10px;
    box-sizing: border-box;
  }
  >div.warning {
    background: #fd7878; 
    color: white;
    width: 100%;
    height: 100%;
    border: 1px solid #cecece;
    padding: 10px;
    box-sizing: border-box;
  }
  >div:hover {
    background: #bbe5fe;
  }
}
.cabinet-2 {
  width: 50%; 
  height: 80px;
  padding: 5px;
  box-sizing: border-box;
  >div.default {
    background: rgb(236, 248, 255);
    width: 100%;
    height: 100%;
    border: 1px solid #cecece;
    padding: 10px;
    box-sizing: border-box;
  }
   >div.warning {
    background: #fd7878; 
    color: white;
    width: 100%;
    height: 100%;
    border: 1px solid #cecece;
    padding: 10px;
    box-sizing: border-box;
  }
  >div:hover {
    background: #bbe5fe;
  }
}
.cabinet-3 {
  width: 100%; 
  height: 80px;
  padding: 5px;
  box-sizing: border-box;
  >div.default {
    background: rgb(236, 248, 255);
    width: 50%;
    height: 100%;
    border: 1px solid #cecece;
    float: right;
    padding: 10px;
    box-sizing: border-box;
  }
  >div.warning {
    background: #fd7878; 
    color: white;
    width: 50%;
    height: 100%;
    border: 1px solid #cecece;
    float: right;
    padding: 10px;
    box-sizing: border-box;
  }
  >div:hover {
    background: #bbe5fe;
  }
}
.cabinet-4 {
  width: 100%; 
  height: 80px;
  padding: 5px;
  box-sizing: border-box;
  >div.default {
    background: rgb(236, 248, 255);
    width: 100%;
    height: 100%;
    border: 1px solid #cecece;
    padding: 10px;
    box-sizing: border-box;
  }
  >div.warning {
    background: #fd7878; 
    color: white;
    width: 100%;
    height: 100%;
    border: 1px solid #cecece;
    padding: 10px;
    box-sizing: border-box;
  }
  >div:hover {
    background: #bbe5fe;
  }
}
.cabinet-5 {
  width: 100%; 
  height: 320px;
  padding: 5px;
  box-sizing: border-box;
  >div.default {
    background: rgb(236, 248, 255);
    width: 100%;
    height: 100%;
    border: 1px solid #cecece;
    padding: 10px;
    box-sizing: border-box;
  }
  >div.warning {
    background: #fd7878; 
    color: white;
    width: 100%;
    height: 100%;
    border: 1px solid #cecece;
    padding: 10px;
    box-sizing: border-box;
  }
  >div:hover {
    background: #bbe5fe;
  }
}
.screen {
  width: 25%;
  height: 390px;
  padding: 0px 10px;
  position: relative;
  left: 62%;
  top: 165px;
  box-sizing: border-box;
  div {
    width: 100%;
    height: 100%;
    border: 1px solid rgb(206, 206, 206);
    background: rgb(236, 248, 255);
  }
}
</style>
