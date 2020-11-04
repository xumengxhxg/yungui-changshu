<template>
    <div class="error-page">
      <div class="content-con">
        <img :src="src" alt="404">
        <div class="text-con">
          <h4>404</h4>
          <h5>Oh~~您的页面好像飞走了~</h5>
        </div>
        <back-btn-group class="back-btn-group"></back-btn-group>
      </div>
    </div>
  </template>
  
  <script>
  import '../components/404_btn/error.less'
  import error404 from '@/assets/img/error-404.svg'
  import backBtnGroup from '../components/404_btn/404_btn.vue'
  export default {
    name: 'error_content',
    data(){
        return {
            src:error404
        }
    },
    components: {
      backBtnGroup
    },
  }
  </script>