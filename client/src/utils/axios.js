import axios from "axios";

const api = axios.create({
  baseURL: "https://gigflow-8zxu.onrender.com/api",
  withCredentials: true
});

export default api;