import Vue from "vue";
import Vuex from "vuex";

// store opitons
import auth from './modules/auth/index'
import todo from './modules/todo/index'



Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    todo
  },
});