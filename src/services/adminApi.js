import axios from "axios";

const adminApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/admin`,
});

adminApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken"); // MUST be this
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default adminApi;
