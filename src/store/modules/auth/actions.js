import AuthService from "@/services/auth-service";
import TokenService from "@/services/token.service";

let timer;

export default {
  refreshToken({ commit }, accessToken) {
    commit("refreshToken", accessToken);
  },

  async login(context, user) {
    try {
      let res = await AuthService.login(user);
      context.commit("setUser", res.data);
      TokenService.setUser(res.data);
      return res;
    } catch (error) {
      context.commit("loginFailure");
      const err = new Error(
        error.message || "can not login , try again later..."
      );
      throw err;
    }
  },
  register({ commit }, user) {
    return AuthService.register(user).then(
      (user) => {
        commit("setUser", user);
        return Promise.resolve(user);
      },
      (error) => {
        commit("registerFailure");
        return Promise.reject(error);
      }
    );
  },
  async logout(context) {
    context.commit("loginFailure");

    try {
      let res = await AuthService.logout();
      if (res.data.success) {
        TokenService.removeUser();
      }
    } catch (error) {
       (error);
    }
    clearTimeout(timer);
  },
  autoLogout(context) {
    context.dispatch("logout");
    context.commit("setDidAutoLogout");
  },
  tryLogin(context) {
    const user = JSON.parse(localStorage.getItem("user"));
    // const tokenExpiration = user.expiryDate;
    const tokenExpiration = new Date(user.refreshToken.expiryDate).getTime();
    const expiresIn = +tokenExpiration - new Date().getTime();

    if (expiresIn < 0) {
      return;
    }

    timer = setTimeout(() => {
      context.dispatch("autoLogout");
    }, expiresIn);

    if (user) {
      context.commit("setUser", user);
    }
  },
};
