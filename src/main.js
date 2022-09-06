import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from "vue-axios"
import '@/assets/style.css';
import BaseCard from './components/ui/BaseCad.vue'
import BaseModal from './components/ui/BaseModal.vue'
import BaseSpinner from './components/ui/BaseSpinner.vue'

import setupInterceptors from './services/setupInterceptors';

Vue.config.productionTip = false;

Vue.use(VueAxios , axios);

Vue.component('base-card', BaseCard);
Vue.component('base-modal', BaseModal);
Vue.component('base-spinner', BaseSpinner);
setupInterceptors(store);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
