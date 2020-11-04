<template>
  <div>
    <div class="text-left ph20 pv10">
      案卷柜管理/检材柜
    </div>
    <div class="bg-white p20">
      <div class="title">
        <img src="@/assets/images/police.jpg" alt="">
        <span class="text">案卷柜</span>
      </div>
      <div class='title-2 mt10'>
        <!-- 设备SNb8b1112234 -->
      </div>
      <div class="mt20">
        <div class="clearfix" style="margin: 0 auto; width: 30%; margin-top: 40px; border: 1px solid #cecece;padding: 5px">
          <div class="pull-left" style="width: 50%">
            <div class="cabinet" v-for="item in cabinetNewList.slice(0, 4)" :key="item.doorNo" @click="toPage(item.doorNo)">
              <div>
                {{item.doorNo}}
                <div>已用：{{item.usedSpace}} </div>
                <div>剩余：{{item.surplusSpace}}</div>
                <div>登记：{{item.inExistence}}</div>
              </div>
            </div>
          </div>
          <div class="pull-left" style="width: 50%">
            <div class="cabinet-2">
              <div></div>
            </div>
            <div class="cabinet" v-for="item in cabinetNewList.slice(4, 6)" :key="item.doorNo" @click="toPage(item.doorNo)">
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
  </div>
</template>

<script>
import { getCounterInfo } from '@/api/cabinet'
export default {
  data () {
    return {
      cabinetNewList: [],
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
        if (res.result) {
          // this.doorInfoList = res.doorInfoList
          this.cabinetList.forEach((item, index) => {
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
        }
      }).catch()
    },
    toPage(val) {
      this.$router.push({
        name: 'fileCabinetDetail',
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
  height: 200px;
  padding: 5px;
  box-sizing: border-box;
  div {
    background: rgb(236, 248, 255);
    width: 100%;
    height: 100%;
    border: 1px solid #cecece;
  }
}
</style>