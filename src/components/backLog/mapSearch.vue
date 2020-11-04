<!-- 地图搜索 -->
<template>
  <div>
    <el-dialog title="选择地址" :visible.sync="isShow">
      <el-autocomplete
        style="width:50%;"
        class="mb10"
        popper-class="autoAddressClass"
        v-model="form.address"
        :fetch-suggestions="querySearchAsync"
        :trigger-on-focus="false"
        placeholder="详细地址"
        @select="handleSelect"
        clearable>
        <template slot-scope="{ item }">
          <i class="el-icon-search fl mgr10"></i>
          <div style="overflow:hidden;">
            <div class="title">{{ item.title }}</div>
            <span class="address ellipsis">{{ item.address }}</span>
          </div>
        </template>
      </el-autocomplete>
      <div>
        <div id="map-container" style="width:100%;height:400px;"></div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import loadBMap from '@/utils/loadBmap'
export default {
  name: 'MapSearch',
  props: {
    dialogVisible: Boolean
  },
  data () {
    return {
      isShow: this.dialogVisible,
      form: {
        address: '', //详细地址
        addrPoint: { //详细地址经纬度
          lng: 0,
          lat: 0
        }
      },
      map: '', //地图实例
      mk: '', //Marker实例
      locationInfo: {} // 位置信息
    }
  },
  created () {
  },
  async mounted() {
    await loadBMap('tovwdqHlI9zYKByrcHQA9PcG04P0ZDrs') //加载引入BMap
    this.initMap()
  },
  methods: {
    initMap() {
      var that = this;
      this.map = new BMap.Map("map-container", {enableMapClick:false})  //新建地图实例，enableMapClick:false ：禁用地图默认点击弹框
      var point = new BMap.Point(120.58, 31.30)
      // var point = '苏州'
      this.map.centerAndZoom(point,10)
      this.map.enableScrollWheelZoom()  //启用滚轮放大缩小，默认禁用
      this.map.enableContinuousZoom()   //启用地图惯性拖拽，默认禁用
      //单击获取点击的经纬度
      // this.map.addEventListener("click",function(e){
      //   console.log(e.point.lng + "," + e.point.lat);
      // })
      // 红点
      this.mk = new BMap.Marker(point,{enableDragging:true}) //创建一个图像标注实例，enableDragging：是否启用拖拽，默认为false
      this.map.addOverlay(this.mk) //将覆盖物添加到地图中

      this.mk.addEventListener('dragend', function(e){
        that.getAddrByPoint(e.point) //拖拽结束后调用逆地址解析函数，e.point为拖拽后的地理坐标
      })
      var navigationControl = new BMap.NavigationControl({ //创建一个特定样式的地图平移缩放控件
        anchor: BMAP_ANCHOR_TOP_RIGHT, //靠右上角位置
        type: BMAP_NAVIGATION_CONTROL_SMALL //SMALL控件类型
      })
      this.map.addControl(navigationControl ) //将控件添加到地图

      var geolocationControl = new BMap.GeolocationControl({anchor: BMAP_ANCHOR_BOTTOM_LEFT}) //创建一个地图定位控件
      geolocationControl.addEventListener("locationSuccess", function(e){ //绑定定位成功后事件
        that.getAddrByPoint(e.point) //定位成功后调用逆地址解析函数
      });
      geolocationControl.addEventListener("locationError",function(e){ //绑定定位失败后事件
        // alert(e.message);
      });
      this.map.addControl(geolocationControl) //将控件添加到地图
      this.map.addEventListener('click', function(e){ //给地图绑定点击事件
        that.getAddrByPoint(e.point) //点击后调用逆地址解析函数
      })
      this.geolocation()
    },
    querySearchAsync(str,cb){
      var options = {
        onSearchComplete: function(res){ //检索完成后的回调函数
          var s = [];
          if (local.getStatus() == BMAP_STATUS_SUCCESS){
            for (var i = 0; i < res.getCurrentNumPois(); i ++){
              s.push(res.getPoi(i));
            }
            cb(s) //获取到数据时，通过回调函数cb返回到<el-autocomplete>组件中进行显示
          } else{
            cb(s)
          }
        }
      }
      var local = new BMap.LocalSearch(this.map, options) //创建LocalSearch构造函数
      local.search(str) //调用search方法，根据检索词str发起检索
    },
    handleSelect(item) {
      this.form.address = item.address + item.title; //记录详细地址，含建筑物名
      this.form.addrPoint = item.point; //记录当前选中地址坐标
      this.map.clearOverlays() //清除地图上所有覆盖物
      this.mk = new BMap.Marker(item.point) //根据所选坐标重新创建Marker
      this.map.addOverlay(this.mk) //将覆盖物重新添加到地图中
      this.map.panTo(item.point) //将地图的中心点更改为选定坐标点
    },
    geolocation() {
      var that = this;
      var geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(function(res){
        if(this.getStatus() == BMAP_STATUS_SUCCESS){
          that.getAddrByPoint(res.point) //当成功时，调用逆地址解析函数
        } else {
          // alert('failed'+this.getStatus()); //失败时，弹出失败状态码
        }        
      },{enableHighAccuracy: true}) //enableHighAccuracy：是否要求浏览器获取最佳效果，默认为false
    },
    getAddrByPoint(point){
      var that = this;
      var geco = new BMap.Geocoder();
      geco.getLocation(point, function(res){
        console.log(res)  //内容见下图
        that.mk.setPosition(point) //重新设置标注的地理坐标
        that.map.panTo(point)  //将地图的中心点更改为给定的点
        that.form.address = res.address;  //记录该点的详细地址信息
        that.form.addrPoint = point;  //记录当前坐标点
        that.locationInfo = res
      })
    },
    save() {
      this.isShow = false
      this.$emit('save', this.locationInfo)
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
.autoAddressClass{
  li {
    i.el-icon-search {margin-top:11px;}
    .mgr10 {margin-right: 10px;}
    .title {
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .address {
      line-height: 1;
      font-size: 12px;
      color: #b4b4b4;
      margin-bottom: 5px;
    }
  }
}
</style>

