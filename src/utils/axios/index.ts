import { redirect } from "react-router-dom";

import { DATE_FIELDS } from "@constants/variables";
import { logoutUser } from "@funcs/auth";
import axios from "axios";
import dayjs from "dayjs";

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
      for (let [key, value] of Object.entries(config.data)) {
        if (DATE_FIELDS.includes(key)) {
          config.data[key] = dayjs(value as string).format(
            "YYYY-MM-DD HH:mm:ss"
          );
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
