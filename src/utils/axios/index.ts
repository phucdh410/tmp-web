import axios from "axios";

const apiInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_API}/api`,
});

apiInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

apiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => Promise.reject(error)
);

export { apiInstance };
