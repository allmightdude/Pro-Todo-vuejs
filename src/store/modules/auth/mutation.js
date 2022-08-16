export default {
  refreshToken(state, accessToken) {
    state.status.loggedIn = true;
    state.user = { ...state.user, accessToken: accessToken };
  },
  loginSuccess(state, user) {
    state.status.loggedIn = true;
    state.user = user;
  },
  loginFailure(state) {
    state.status.loggedIn = false;
    state.user = null;
  },
  registerSuccess(state, user) {
    state.status.loggedIn = false;
    state.user = user;
  },
  registerFailure(state) {
    state.status.loggedIn = true;
  },
};
