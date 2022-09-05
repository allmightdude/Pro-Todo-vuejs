export default {
  refreshToken(state, accessToken) {
    state.user = { ...state.user, accessToken: accessToken };
  },
  setUser(state, user) {
    state.user = {
      email: user.email,
      accessToken: user.accessToken,
      expiryDate: user.expiryDate,
      refreshToken : user.refreshToken, 
      name: user.name,
      id : user.id
    };
    state.didAutoLogout = false;
  },
  loginFailure(state) {
    state.user = null;
    state.didAutoLogout = false;
  },
  registerFailure(state) {
    state.didAutoLogout = false;
  },
  setDidAutoLogout(state) {
    state.didAutoLogout = true;
  },
}
