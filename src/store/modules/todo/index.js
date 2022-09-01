import Vue from "vue";
import Vuex from "vuex";

// store opitons
import getters from "./getters.js";
import mutations from "./mutations.js";
import actions from "./actions.js";

Vue.use(Vuex);

export default{
  namespaced: true,
  state: {
    tasks: [],
    categories: [],
    plans: [],
  },
  getters,
  mutations,
  actions
}
