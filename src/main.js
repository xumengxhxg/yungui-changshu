import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/global.css'
import axios from '@/utils/request'
import echarts from 'echarts'
import scroll from 'vue-seamless-scroll'
import VCharts from 'v-charts'
import VueClipboard from 'vue-clipboard2'
import public_use from './assets/js/public'
Vue.use(VueClipboard)
Vue.use(VCharts)
Vue.use(scroll)
Vue.prototype.$echarts = echarts

Vue.use(ElementUI);
Vue.use(public_use)
Vue.config.productionTip = false
Vue.prototype.axios = axios;

Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = el.dataset.title
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
