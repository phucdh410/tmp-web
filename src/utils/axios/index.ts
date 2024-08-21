import axios from "axios";

const apiInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_API}/api`,
});

apiInstance.interceptors.request.use(
  (config) => {
    if (config.method === "get" && !!config.params) {
      if (Object.keys(config.params).length) {
        for (let [key, value] of Object.entries(config.params)) {
          if (value === "" || value === undefined) {
            delete config.params[key];
          }
        }
      }
    }
    return { ...config };
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
