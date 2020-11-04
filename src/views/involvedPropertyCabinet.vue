<template>
  <div>
    <div class="text-left ph20 pv10">
      涉案财务柜管理/检材柜
    </div>
    <div class="bg-white p20">
      <div class="title">
        <img src="@/assets/images/police.jpg" alt="">
        <span class="text">涉案财物柜</span>
      </div>
      <div class='title-2 mt10'>
        <!-- 设备SNb8b1112234 -->
      </div>
      <div class="mt20">
        <div class="clearfix" style="margin: 0 auto; width: 40%; margin-top: 40px; border: 1px solid #cecece;padding: 5px">
          <div class="pull-left" style="width: 50%">
            <div :class="index == 1 || index == 2 ||index == 3 || index == 4 || index == 5 ? 'cabinet-2' : 'cabinet'" class="cursor" v-for="(item, index) in cabinetNewList.slice(0, 10)" :key="item.doorNo" @click="toPage(item.doorNo)">
              <div>
                {{item.doorNo}}
                <div>已用：{{item.usedSpace}} </div>
              </div>
            </div>
          </div>
          <div class="pull-left" style="width: 50%">
            <div :class="index == 1 || index == 2 ||index == 3 || index == 4 || index == 5 ? 'cabinet-3' : 'cabinet'" class="cursor" v-for="(item, index) in cabinetNewList.slice(10, 20)" :key="item.doorNo" @click="toPage(item.doorNo)">
              <div>
                {{item.doorNo}}
                <div>已用：{{item.usedSpace}} </div>
              </div>
            </div>
          </div>
          <div class="screen">
            <div></div>
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
      cabinetList: [{doorNo: 'A-1'}, {doorNo: 'A-2'},{doorNo: 'A-3'},{doorNo: 'A-4'},{doorNo: 'A-5'},{doorNo: 'A-6'},{doorNo: 'A-7'},{doorNo: 'A-8'},{doorNo: 'A-9'},{doorNo: 'A-10'},
      {doorNo: 'A-11'},{doorNo: 'A-12'},{doorNo: 'A-13'},{doorNo: 'A-14'},{doorNo: 'A-15'},{doorNo: 'A-16'},{doorNo: 'A-17'},{doorNo: 'A-18'},{doorNo: 'A-19'},{doorNo: 'A-20'}]
    }
  },
  created() {
    this.getCounterInfo()
  },
  methods: {
     // 获取柜面信息
    getCounterInfo() {
      let params = {
        cabinetType: 2
      }
      getCounterInfo(params).then((res) => {
        if (res.result) {
          this.cabinetList.forEach((item) => {
            item.usedSpace = 0 //已使用
            if (res.data.doorInfoList) {
              res.data.doorInfoList.forEach((doorItem) => {
                if (item.doorNo == doorItem.doorNo) {
                  // item.surplusSpace = doorItem.surplusSpace
                  item.usedSpace = doorItem.usedSpace
                } else {
                  // item.surplusSpace = res.data.capacity // 未使用
                  // item.usedSpace = 0 //已使用
                }
              })
            } else {
              // item.surplusSpace = res.data.capacity // 未使用
              item.usedSpace = 0 //已使用
            }
          })
          this.cabinetNewList = this.cabinetList
        }
      }).catch()
    },
    toPage(val) {
      this.$router.push({
        name: 'propertyCabinetDetail',
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
  >div {
    background: rgb(236, 248, 255);
    width: 100%;
    height: 100%;
    border: 1px solid #cecece;
    padding: 10px;
    box-sizing: border-box;
  }
  div:hover {
    background: #bbe5fe;
  }
}
.cabinet-2 {
  width: 50%; 
  height: 80px;
  padding: 5px;
  box-sizing: border-box;
  >div {
    background: rgb(236, 248, 255);
    width: 100%;
    height: 100%;
    border: 1px solid #cecece;
    padding: 10px;
    box-sizing: border-box;
  }
  div:hover {
    background: #bbe5fe;
  }
}
.cabinet-3 {
  width: 100%; 
  height: 80px;
  padding: 5px;
  box-sizing: border-box;
  >div {
    background: rgb(236, 248, 255);
    width: 50%;
    height: 100%;
    border: 1px solid #cecece;
    float: right;
    padding: 10px;
    box-sizing: border-box;
  }
  div:hover {
    background: #bbe5fe;
  }
}
.screen {
  width: 50%;
  height: 390px;
  padding: 0px 10px;
  position: relative;
  left: 24%;
  top: 105px;
  box-sizing: border-box;
  div {
    width: 100%;
    height: 100%;
    border: 1px solid rgb(206, 206, 206);
    background: rgb(236, 248, 255);
  }
}
</style>