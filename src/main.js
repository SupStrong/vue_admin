import Vue from "vue";
import App from "./App.vue";
import router from "./router.js";

// 样式重置
import "./assets/css/reset.css";
import "./assets/css/common.css";
import "./assets/css/color.css";
import "./assets/css/css_width.css";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import store from "./store/store";

import VueCookies from "vue-cookies";
import axios from "axios";

import VueAxios from "vue-axios";
import { post, fetch, patch, put, del } from "./utils/http";

// import safeAxios from './safeAxios';
// Vue.prototype.$safeAxios = safeAxios;
Vue.use(VueAxios, axios);

Vue.prototype.$post = post;
Vue.prototype.$fetch = fetch;
Vue.prototype.$patch = patch;
Vue.prototype.$put = put;
Vue.prototype.$del = del;

Vue.config.productionTip = false;

Vue.use(ElementUI, { size: "small" });
Vue.use(VueCookies);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
