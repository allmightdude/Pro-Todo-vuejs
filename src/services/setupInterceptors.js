import axiosInstance from "./api";
import TokenService from "./token.service.js";

const setup = (store) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = TokenService.getLocalAccessToken();

      if (token) {
        config.headers["x-access-token"] = token;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;

      if (originalConfig.url !== "users/login" && err.response) {
        // if (err.response.status == 403) {
        //   console.log("No token provided");
        // }

        // Access Token was expired
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;

          try {
            const rs = await axiosInstance.post("users/refreshtoken", {
              refreshToken: TokenService.getLocalRefreshToken(),
            });

            const { accessToken } = rs.data;

            store.dispatch("/refreshToken", accessToken);

            TokenService.updateLocalAccessToken(accessToken);
            return axiosInstance(originalConfig);
          } catch (error) {
            // console.log("can not get refreshToken!", error);
            if (error.response.status === 403 || err.response.status === 401) {
              store.dispatch("autoLogout");
            }
            return Promise.reject(error);
          }
        }
      }
      return Promise.reject(err);
    }
  );
};

export default setup;
