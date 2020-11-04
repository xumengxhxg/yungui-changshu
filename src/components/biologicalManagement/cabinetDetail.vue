<!-- 柜体详情 -->
<template>
  <div>
    <div class="detail">
      <div class="text-left ph20 pv10">
        检材柜
        <span class="cursor" @click="$router.go(-1)">
          <i class="el-icon-back"></i>
          <span>返回</span>
        </span>
      </div>
    </div>
    <div class="p20 bg-white">
      <!-- 柜体信息 -->
      <div class="top-info" v-loading='loading'>
        <div class="info-bg">
          柜体信息
        </div>
        <div class="info-content">
          <el-row>
            <el-col :span="4">
              <span>总存储空间：</span>
              <span>{{num}}</span>
            </el-col>
            <el-col :span="4">
              <span>已用空间：</span>
              <span>{{usedSpace}}</span>
            </el-col>
            <el-col :span="4">
              <span>剩余存储空间：</span>
              <span>{{surplusSpace}}</span>
            </el-col>
          </el-row>
        </div>
      </div>
      <!-- 使用空间 -->
      <div class="bottom-content mt40">
        <div class="info-bg">
          使用空间
        </div>
        <div v-if="list && list.length">
          <div class="clearfix">
            <div class="content" v-for="(item, index) in list" :key="index">
              <div>人员姓名： {{item.suspectName}}</div>
              <div>身份证号： {{item.identityCard}}</div>
              <div>查获时间： {{item.discoverTime ? item.discoverTime.slice(0, 10) : ''}}</div>
              <div>存放时间： {{item.storeTime ? item.storeTime.slice(0, 10) : ''}}</div>
              <div>
                <!-- <el-button type="primary" size="mini" class="mt10" @click="takeOut(item.infoId)">取出证物</el-button> -->
              </div>
            </div>
          </div>
          <div class="mt20 mb20" style="text-align: center">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pageNum"
              :page-sizes="[10, 20, 30]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
          </div>
        </div>
        <div style="width: 100%; text-align: center; height: 300px; line-height: 300px" v-else>
          暂无数据
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCabinetSpace, getCabinetDetail, takeOut } from '@/api/cabinet'
export default {
  data () {
    return {
      list: [],
      pageNum: 1,
      pageSize: 10,
      total: 0,
      num: 0,
      surplusSpace: 0,
      usedSpace: 0,
      doorNo: '',
      loading: false
    }
  },
  created() {
    this.doorNo = this.$route.query.doorNo
      this.getCabinetSpace()

  },
  mounted() {
    this.$nextTick(() => {
      this.getCabinetDetail()
    })
  },
  methods: {
    getCabinetSpace() {
      getCabinetSpace().then((res) => {
        if (res.result) {
          res.data.forEach((item) => {
            if (item.cabinetType == 0) {
              this.num = item.total
              this.surplusSpace = item.total - item.num
              this.usedSpace = item.num
            }
          })
          this.loading = false
        }
      }).catch()
    },
    getCabinetDetail() {
      let params = {
        doorNo: this.doorNo,
        cabinetType: 0
      }
      getCabinetDetail(params).then((res) => {
        if (res.result) {
          this.list = res.rows
          this.total = res.total
        }
      }).catch()
    },
    takeOut(id) {
      this.$confirm('您确定要取出证物吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = {
          id: id,
          policeId: localStorage.getItem('userId'),
          cabinetType: 0
        }
        takeOut(params).then((res) => {
          if (res.result) {
            this.$message({
              type: 'success',
              message: '取出成功!'
            })
            this.getCabinetDetail()
            this.getCabinetSpace()
          }
        }).catch()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });          
      });
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getCabinetDetail()
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this.getCabinetDetail()
    },
  }
}

</script>

<style lang='less' scoped>
.top-info {
  border: 1px solid rgb(80, 191, 255);
}
.info-bg {
  padding: 10px;
  background: rgb(236, 248, 255);
  border-bottom: 1px solid rgb(80, 191, 255);
}
.info-content {
  padding: 30px;
}
.bottom-content {
  border: 1px solid rgb(80, 191, 255);
  .content {
    width: 20%; 
    padding: 20px 20px; 
    box-sizing: border-box;
    float: left;
  }
}
</style>
