<!-- 新增编辑执行单位 -->
<template>
  <div>
    <el-dialog title="案卷柜" :visible.sync="isShow">
      <div>
        <div class="title">
          <img src="@/assets/images/police.jpg" alt="">
          <span class="text">案卷柜</span>
        </div>
        <div class="mt20">
          <div class="clearfix" style="margin: 0 auto; width: 30%; border: 1px solid #cecece;padding: 5px">
            <div class="pull-left" style="width: 50%">
              <div class="cabinet"  v-for="item in cabinetNewList.slice(0, 4)" :key="item.doorNo" @click="select(item.doorNo)">
                <div :class="item.usedSpace + item.inExistence >= sum ? 'bg-c8ccce' : 'bg-ecf8ff'">
                  {{item.doorNo}}
                  <p>已用：{{item.usedSpace}} </p>
                  <p>剩余：{{item.surplusSpace}}</p>
                  <p>登记：{{item.inExistence}}</p>
                </div>
              </div>
            </div>
            <div class="pull-left" style="width: 50%">
              <div class="cabinet-2">
                <div></div>
              </div>
              <div class="cabinet" v-for="item in cabinetNewList.slice(4, 6)" :key="item.doorNo" @click="select(item.doorNo)">
               <div :class="item.usedSpace + item.inExistence >= sum ? 'bg-c8ccce' : 'bg-ecf8ff'">
                  {{item.doorNo}}
                  <p>已用：{{item.usedSpace}} </p>
                  <p>剩余：{{item.surplusSpace}}</p>
                  <p>登记：{{item.inExistence}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getCounterInfo } from '@/api/cabinet'
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
      cabinetList: [{doorNo: 'A-1'}, {doorNo: 'A-2'}, {doorNo: 'A-3'}, {doorNo: 'A-4'}, {doorNo: 'A-5'}, {doorNo: 'A-6'}]
    }
  },
  created() {
    this.getCounterInfo()
  },
  methods: {
    // 获取柜面信息
    getCounterInfo() {
      let params = {
        cabinetType: 1
      }
      getCounterInfo(params).then((res) => {
        this.cabinetList.forEach((item, index) => {
          this.sum = res.data.capacity
          item.surplusSpace = res.data.capacity // 未使用
          item.usedSpace = 0 //已使用
          item.inExistence = 0
          if (res.data.doorInfoList) {
            res.data.doorInfoList.forEach((doorItem) => {
              if (item.doorNo == doorItem.doorNo) {
                item.surplusSpace = doorItem.surplusSpace
                item.usedSpace = doorItem.usedSpace
                item.inExistence = doorItem.inExistence
              } else {
                // item.surplusSpace = res.data.capacity // 未使用
                // item.usedSpace = 0 //已使用
              }
            })
          } else {
            item.surplusSpace = res.data.capacity // 未使用
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
  height: 100px;
  padding: 5px;
  box-sizing: border-box;
  >div {
    // background: rgb(236, 248, 255);
    width: 100%;
    height: 100%;
    border: 1px solid #cecece;
    padding: 10px;
    box-sizing: border-box;
  }
  // div:hover {
  //   background: #bbe5fe;
  // }
}
.cabinet-2 {
  width: 100%; 
  height: 200px;
  padding: 5px;
  box-sizing: border-box;
  div {
    // background: rgb(236, 248, 255);
    width: 100%;
    height: 100%;
    border: 1px solid #cecece;
  }
  // div:hover {
  //   background: #bbe5fe;
  // }
}
</style>