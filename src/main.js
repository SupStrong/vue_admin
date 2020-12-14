import Vue from 'vue'
import App from './App.vue'
import router from './router.js'

// 样式重置
import './assets/css/reset.css'
import './assets/css/common.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store/store'

import safeAxios from './safeAxios';
Vue.prototype.$safeAxios = safeAxios;




Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
