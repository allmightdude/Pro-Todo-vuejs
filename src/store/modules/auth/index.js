import mutations from "./mutation.js";
import actions from "./actions.js";
import getters from "./getters";

const user = JSON.parse(localStorage.getItem("user"));

export default {
  state: {
    user : user ? user : null,
    didAutoLogout : false,
  },
  getters,
  mutations,
  actions,
};
