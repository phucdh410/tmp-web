import { redirect } from "react-router-dom";

import { handleRefresh, logoutUser } from "@funcs/auth";
import { formatDateFields } from "@funcs/date";
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
    if ((config.method === "post" || config.method === "put") && config.data) {
      formatDateFields(config.data);
    }
    return { ...config };
  },
  (error) => Promise.reject(error)
);

apiInstance.interceptors.response.use(
  async (response) => {
    if (response?.status === 205) {
      handleRefresh(response);
    }

    return response;
  },
  (error) => {
    if (error?.response?.status === 401) {
      if (!error?.config?.url?.includes("/logout")) {
        return logoutUser();
      } else {
        return redirect("/login");
      }
    }

    const _error = {
      data: error?.response?.data?.data || null,
      message: error?.response?.data?.message || error?.message || "",
      status: error?.response?.status,
    };

    return Promise.reject(_error);
  }
);

export { apiInstance };
