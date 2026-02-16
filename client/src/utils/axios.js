import axios from "axios";

const api = axios.create({
  // baseURL: "https://gigflow-n32p.onrender.com/api",
  baseURL: "http://localhost:5001/api",
  withCredentials: true
});

export default api;