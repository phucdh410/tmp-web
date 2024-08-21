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
  (error) => {
    const _error = {
      data: error?.response?.data?.data || null,
      message: error?.response?.data?.message || error?.message || "",
      status: error?.response?.status,
    };

    return Promise.reject(_error);
  }
);

export { apiInstance };
