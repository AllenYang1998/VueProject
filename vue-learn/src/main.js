import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueJsonp from 'vue-jsonp'
import VueBetterScroll from 'vue2-better-scroll'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(VueJsonp)
Vue.use(VueAxios,axios)
Vue.use(VueBetterScroll)
Vue.config.productionTip = false
Vue.use(ElementUI);

Vue.prototype.server_url = 'http://127.0.0.1:8000';

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
