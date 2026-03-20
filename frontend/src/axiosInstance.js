import axios from "axios";

export const axiosInstance = axios.create({ baseURL: "/", timeout: 10000 });

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers.token = accessToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
