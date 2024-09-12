import { DATE_FIELDS } from "@constants/variables";
import dayjs from "dayjs";

export const formatDateFields = (data: any) => {
  for (let [key, value] of Object.entries(data)) {
    if (DATE_FIELDS.includes(key)) {
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
