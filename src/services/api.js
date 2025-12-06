import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Normal API (no token)
export const api = axios.create({
  baseURL: API_URL,
});

// Auth API (with token)
export const apiAuth = axios.create({
  baseURL: API_URL,
});

// Token Add Automatically
apiAuth.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

