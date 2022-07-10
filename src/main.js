import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from "vue-axios"
import '@/assets/style.css';

import setupInterceptors from './services/setupInterceptors';

Vue.config.productionTip = false

Vue.use(VueAxios , axios)

setupInterceptors(store);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
