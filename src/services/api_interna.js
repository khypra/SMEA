import axios from "axios";
import { getToken } from "./auth";

const api_interna = axios.create({
  baseURL: "https://smea-ufs.herokuapp.com/"
});

api_interna.interceptors.request.use(async config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  // console.log(config);
  return config;
});

export default api_interna;
