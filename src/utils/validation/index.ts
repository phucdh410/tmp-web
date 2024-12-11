import { isDayjs } from "dayjs";
import { mixed, number, string } from "yup";

export const stringSchema = string().required();
export const stringOptionalSchema = string().optional();

export const numberSchema = number().required();
export const numberOptionalSchema = number().optional();

export const selectIdSchema = number().notOneOf([-1]).required();

export const dateSchema = mixed<Date | string>()
  .required()
  .test("date-valid", "", (value) => {
    return typeof value === "string" || value instanceof Date || isDayjs(value);
  });
