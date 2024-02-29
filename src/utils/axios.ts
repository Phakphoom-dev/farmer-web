import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_PATH,
  timeout: 10 * 60 * 1000,
  withCredentials: false,
  headers: {
    "Content-type": "application/json",
  },
});

// Set the AUTH token for any request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("farmer-token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

export default api;
