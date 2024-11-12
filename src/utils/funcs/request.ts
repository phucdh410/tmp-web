import { DATE_FIELDS } from "@constants/variables";
import { AxiosRequestConfig } from "axios";
import dayjs from "dayjs";

export const clearUnusedParams = (
  params: AxiosRequestConfig<any>["params"]
) => {
  for (const [key, value] of Object.entries(params)) {
    if (value === "" || value === undefined) {
      //note: do null value, axios sẽ tự bỏ nên không cần xử lí
      delete params[key];
    }
  }
};

export const formatDateFieldsParams = (
  params: AxiosRequestConfig<any>["params"]
) => {
  for (const [key, value] of Object.entries(params)) {
    if (DATE_FIELDS.includes(key) && value !== null) {
      params[key] = dayjs(value as Date).format("YYYY-MM-DD");
    }
  }
};

export const formatDateFields = (data: AxiosRequestConfig<any>["data"]) => {
  for (const [key, value] of Object.entries(data)) {
    if (DATE_FIELDS.includes(key) && value !== null) {
      data[key] = dayjs(value as string).format("YYYY-MM-DD");
    } else if (Array.isArray(value)) {
      value.forEach((item, index) => {
        if (typeof item === "object" && item !== null) {
          formatDateFields(item);
        }
      });
    } else if (typeof value === "object" && value !== null) {
      formatDateFields(value);
    }
  }
};
