import AuthService from "@/services/auth-service";

export default {
  refreshToken({ commit }, accessToken) {
    commit("refreshToken", accessToken);
  },

  login({ commit }, user) {
    return AuthService.login(user).then(
      (user) => {
        commit("loginSuccess", user);
        return Promise.resolve(user);
      },
      (error) => {
        commit("loginFailure");
        return Promise.reject(error);
      }
    );
  },
  logout({ commit }) {
    AuthService.logout();
    commit("loginFailure");
  },
  register({ commit }, user) {
    return AuthService.register(user).then(
      (user) => {
        commit("registerSuccess", user);
        return Promise.resolve(user);
      },
      (error) => {
        commit("registerFailure");
        return Promise.reject(error);
      }
    );
  },
};
