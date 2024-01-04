import axios from "axios";
import { getItem } from "../helpers/src/helpers/persistance-storage";

axios.defaults.baseURL = "http://localhost:3000/api";

axios.interceptors.request.use((config) => {
  const token = getItem("token");
  const authorization = token ? `Token ${token}` : "";

  // O'zgartirilgan qismi quyidagicha bo'lishi kerak:
  config.headers.Authorization = authorization;

  return config; // Bu qismni qo'shing
});

export default axios;
