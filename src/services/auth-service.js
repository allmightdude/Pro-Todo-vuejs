import api from "./api";
import TokenService from "./token.service";

class AuthService {
  async login(user) {
    // return await api
    //     .post('users/login' , {
    //         email : user.email,
    //         password : user.password,
    //     })
    //     .then(res => {
    //          (res.data);
    //         if(res.data.accessToken){
    //             TokenService.setUser(res.data)
    //         }
    //         return res.data
    //     })
    return await api.post("users/login", {
      email: user.email,
      password: user.password,
    });
  }

  async logout() {
    try {
      return await api.post("users/logout", {
        refreshToken: TokenService.getLocalRefreshToken(),
      })
    } catch (error) {
      const err = new Error(
        error.message || "can not logout on your acoount..."
      );
      throw err;
    }
  }

  async register(user) {
    return await api
      .post("users/signup", {
        name: user.name,
        email: user.email,
        password: user.password,
        password2: user.password2,
      })
      .then((res) => {
        if (res.data.accessToken) {
          TokenService.setUser(res.data);
        }
        return res.data;
      });
  }
}

export default new AuthService();
