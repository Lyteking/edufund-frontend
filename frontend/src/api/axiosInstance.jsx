import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to include token
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      try {
        const refresh = localStorage.getItem("refresh_token");
        if (refresh) {
          const refreshResponse = await axios.post(`${API_URL}token/refresh/`, {
            refresh,
          });

          localStorage.setItem("access_token", refreshResponse.data.access);
          error.config.headers["Authorization"] = `Bearer ${refreshResponse.data.access}`;

          return axiosInstance(error.config);
        }
      } catch (refreshError) {
        console.error("Refresh token failed", refreshError);
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/log-in"; 
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
