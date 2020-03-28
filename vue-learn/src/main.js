import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueJsonp from 'vue-jsonp'
import VueBetterScroll from 'vue2-better-scroll'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import BaiduMap from 'vue-baidu-map'
var VueTouch = require('vue-touch')
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'AktQnb3RWmVG2OsYcNcGXfZPFirATy4L'
})
Vue.use(VueTouch, {name: 'v-touch'})
Vue.use(VueJsonp)
Vue.use(VueAxios,axios)
Vue.use(VueBetterScroll)
Vue.config.productionTip = false
Vue.use(ElementUI);

Vue.prototype.server_url = 'http://120.77.45.151:8081';
Vue.prototype.Authorization_token = " JWT " + sessionStorage.JWT_TOKEN;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
