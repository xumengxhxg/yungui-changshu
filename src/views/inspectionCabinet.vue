<template>
  <div>
    <div class="text-left ph20 pv10">
      生物检材柜管理/检材柜
    </div>
    <div class="bg-white p20">
      <div class="title">
        <img src="@/assets/images/police.jpg" alt="">
        <span class="text">智能生物检材柜</span>
      </div>
      <div class='title-2 mt10'>
        <!-- 设备SNb8b1112234 -->
      </div>
      <div class="title-3">
        (温度：  <span>{{temperature}}</span>)
      </div>
      <div class="clearfix" style="margin: 0 auto; width: 60%; margin-top: 40px; border: 1px solid #cecece;padding: 5px">
        <div class="pull-left" style="width: 20%">
          <div class="cabinet" v-for="(item) in cabinetNewList.slice(0, 5)" :key="item.doorNo" @click="toPage(item.doorNo)">
            <div>
              {{item.doorNo}}
              <div>已用：{{item.usedSpace}} </div>
              <div>剩余：{{item.surplusSpace}}</div>
              <div>登记：{{item.inExistence}}</div>
            </div>
          </div>
        </div>
        <div class="pull-left" style="width: 20%">
           <div class="cabinet" v-for="(item) in cabinetNewList.slice(5, 10)" :key="item.doorNo" @click="toPage(item.doorNo)">
            <div>
              {{item.doorNo}}
              <div>已用：{{item.usedSpace}} </div>
              <div>剩余：{{item.surplusSpace}}</div>
              <div>登记：{{item.inExistence}}</div>
            </div>
          </div>
        </div>
        <div class="pull-left" style="width: 20%">
          <div class="cabinet-2">
            <div style="text-align: center">
              显示屏
            </div>
          </div>
          <div class="cabinet-3">
            <div style="text-align: center">备用</div>
          </div>
          <div class="cabinet-3">
            <div style="text-align: center">备用</div>
          </div>
        </div>
        <div class="pull-left" style="width: 20%">
           <div class="cabinet" v-for="(item) in cabinetNewList.slice(10, 15)" :key="item.doorNo" @click="toPage(item.doorNo)">
            <div>
              {{item.doorNo}}
              <div>已用：{{item.usedSpace}} </div>
              <div>剩余：{{item.surplusSpace}}</div>
              <div>登记：{{item.inExistence}}</div>
            </div>
          </div>
        </div>
        <div class="pull-left" style="width: 20%">
          <div class="cabinet" v-for="(item) in cabinetNewList.slice(15, 20)" :key="item.doorNo" @click="toPage(item.doorNo)">
            <div>
              {{item.doorNo}}
              <div>已用：{{item.usedSpace}} </div>
              <div>剩余：{{item.surplusSpace}}</div>
              <div>登记：{{item.inExistence}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getBaseSet } from '@/api/systemSettings'
import { getCounterInfo, getTemperature } from '@/api/cabinet'
export default {
  data () {
    return {
     cabinetList: [
      {doorNo: 'A-1'}, {doorNo: 'A-2'}, {doorNo: 'A-3'}, {doorNo: 'A-4'}, {doorNo: 'A-5'}, {doorNo: 'A-6'}, {doorNo: 'A-7'}, {doorNo: 'A-8'}, {doorNo: 'A-9'}, {doorNo: 'A-10'},
      {doorNo: 'B-1'}, {doorNo: 'B-2'}, {doorNo: 'B-3'}, {doorNo: 'B-4'}, {doorNo: 'B-5'}, {doorNo: 'B-6'}, {doorNo: 'B-7'}, {doorNo: 'B-8'}, {doorNo: 'B-9'}, {doorNo: 'B-10'}],
      cabinetNewList: [],
      num: 0,
      temperature: ''
    }
  },
  created() {
    this.getBaseSet()
    this.getTemperature()
  },
  methods: {
    getTemperature() {
      getTemperature().then((res) => {
        this.temperature = res.msg
      }).catch()
    },
    getBaseSet() {
       let params = {
        cabinetType: 0
      }
      getBaseSet(params).then((res) => {
        this.num = res.data[0].bottomCapacity
        this.getCounterInfo()
      }).catch()
    },
    // 获取柜面信息
    getCounterInfo() {
      let params = {
        cabinetType: 0
      }
      getCounterInfo(params).then((res) => {
        if (res.result) {
          this.cabinetList.forEach((item) => {
            item.surplusSpace = res.data.capacity // 未使用
            item.usedSpace = 0 //已使用
            item.inExistence = 0
            if (item.doorNo == 'A-5' || item.doorNo == 'A-10' || item.doorNo == 'B-5' || item.doorNo == 'B-10') {
              item.surplusSpace = this.num // 未使用
              item.usedSpace = 0 //已使用
              item.inExistence = 0
            }
            if (res.data.doorInfoList) {
              res.data.doorInfoList.forEach((doorItem) => {
                if (item.doorNo == doorItem.doorNo) {
                  console.log(item.doorNo, 999)
                  item.surplusSpace = doorItem.surplusSpace
                  item.usedSpace = doorItem.usedSpace
                  item.inExistence = doorItem.inExistence
                  if (item.doorNo == 'A-5' || item.doorNo == 'A-10' || item.doorNo == 'B-5' || item.doorNo == 'B-10') {
                    item.surplusSpace = this.num - (item.usedSpace) // 未使用
                  }
                } else {
                  // item.surplusSpace = res.data.capacity // 未使用
                  // item.usedSpace = 0 //已使用
                }
              })
            } else {
              item.surplusSpace = res.data.capacity // 未使用
              item.usedSpace = 0 //已使用
              item.inExistence = 0
              if (item.doorNo == 'A-5' || item.doorNo == 'A-10' || item.doorNo == 'B-5' || item.doorNo == 'B-10') {
                item.surplusSpace = this.num // 未使用
                item.usedSpace = 0 //已使用
                item.inExistence = 0
              }
            }
          })
          this.cabinetNewList = this.cabinetList
        }
      }).catch()
    },
    toPage(val) {
      this.$router.push({
        name: 'cabinetDetail',
        query: {
          doorNo: val
        }
      })
    }
  }
}

</script>

<style lang='less' scoped>
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
.title-2 {
  font-size: 13px;
  text-align: center;
}
.title-3 {
  font-size: 12px;
  text-align: center;
}
.cabinet {
  width: 100%; 
  height: 100px;
  padding: 5px;
  box-sizing: border-box;
  font-size: 13px;
  >div {
    background: rgb(236, 248, 255);
    width: 100%;
    height: 100%;
    border: 1px solid #cecece;
    padding: 10px;
    box-sizing: border-box;
    cursor: pointer;
  }
  div:hover {
    background: #bbe5fe;
  }
}
.cabinet-2 {
  width: 100%;
  height: 270px;
  padding: 5px;
  box-sizing: border-box;
  div {
    background: rgb(236, 248, 255);
    width: 100%;
    height: 100%;
    border: 1px solid #cecece;
    padding: 10px;
    box-sizing: border-box;
  }
}
.cabinet-3 {
  width: 100%;
  height: 115px;
  padding: 5px;
  box-sizing: border-box;
  div {
    background: rgb(236, 248, 255);
    width: 100%;
    height: 100%;
    border: 1px solid #cecece;
    padding: 10px;
    box-sizing: border-box;
  }
}
</style>