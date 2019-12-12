import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueJsonp from 'vue-jsonp'
import VueBetterScroll from 'vue2-better-scroll'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
var VueTouch = require('vue-touch')

Vue.use(VueTouch, {name: 'v-touch'})
Vue.use(VueJsonp)
Vue.use(VueAxios,axios)
Vue.use(VueBetterScroll)
Vue.config.productionTip = false
Vue.use(ElementUI);

Vue.prototype.server_url = 'http://127.0.0.1:8081';
Vue.prototype.Authorization_token = " JWT " + sessionStorage.JWT_TOKEN;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
