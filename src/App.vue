<template>
  <div id="app" v-title data-title='物联网智能云柜管理平台'>
    <div id="nav">
       <!-- <router-view></router-view> -->
    </div>
    <router-view/>
  </div>
</template>
<script>
export default {
  name: 'App',
  data () {
    return {
      toggleFlag: true
    }
  },

  mounted () {
    // 将window_warning方法绑定到window下面，提供给外部调用
    let me = this
    window['window_warning'] = (data) => {
      me.window_warning(data) // 这个也就是我定义的方法
    }
  },
  methods: {
    window_warning (msg) { // 自定义警告模态框
      this.$alert(msg, '提示', {
         type: 'warning'
       }).catch()
    }
  }
}
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 0px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
div.el-submenu__title{
  color: #fff!important;
}
div.el-submenu__title:hover{
  background: #202B34;
  opacity: 0.5;
  color: #000000;
  /* color: #fff; */
 }
.indexHomeTabs>.el-tabs__header{
  height:10%
}
.indexHomeTabs>.el-tabs__content{
  height:90%
}
.indexHomeTabs>.el-tabs__content>.el-tab-pane{
  height:100%
}
.userManagement .el-upload {
    border: 1px dashed #ccc;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
</style>
