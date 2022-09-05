export default {
  isLoggedIn(state) {
    return !!state.user;
  },
  didAutoLogout(state){
    return state.didAutoLogout;
  }
};
