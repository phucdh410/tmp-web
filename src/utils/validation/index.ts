import { isDayjs } from "dayjs";
import { mixed } from "yup";

export const validations = {
  dateRequired: mixed<Date | string>()
    .required()
    .test("date-valid", "", (value) => {
      return (
        typeof value === "string" || value instanceof Date || isDayjs(value)
      );
    }),
};
