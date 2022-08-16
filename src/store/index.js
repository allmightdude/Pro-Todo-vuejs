import Vue from "vue";
import Vuex from "vuex";
import { auth } from "./modules/auth";

// store opitons
import rootGetters from './getters.js'
import rootMutations from './mutations.js'
import rootActions from './actions.js'



Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tasks: [],
    categories: [],
    plans: [],
  },
  getters: rootGetters,

  mutations: rootMutations,
  actions: rootActions,

  modules: {
    auth,
  },
});
