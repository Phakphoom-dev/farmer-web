import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_PATH,
  timeout: 10 * 60 * 1000,
  withCredentials: false,
  headers: {
    "Content-type": "application/json",
  },
});

export default api;
