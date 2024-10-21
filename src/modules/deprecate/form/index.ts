import { Resolver } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { IDeprecatePayload } from "@interfaces/deprecates";
import dayjs, { isDayjs } from "dayjs";
import { mixed, number, object, string } from "yup";

export const defaultValues: IDeprecatePayload = {
  id: "",
  code: "",
  note: "",
  deprecate_date: dayjs().toDate(),
  created_date: dayjs().toDate(),
  store_code: "",
  month: dayjs().month() + 1,
  year: dayjs().year(),
  time: dayjs().toDate(),
};

export const resolver: Resolver<IDeprecatePayload> = yupResolver(
  object({
    code: string().optional(),
    id: string().optional(),
    note: string().required(),
    created_date: mixed<Date | string>()
      .required()
      .test("date-valid", "", (value) => {
        return (
          typeof value === "string" || value instanceof Date || isDayjs(value)
        );
      }),
    deprecate_date: mixed<Date | string>()
      .required()
      .test("date-valid", "", (value) => {
        return (
          typeof value === "string" || value instanceof Date || isDayjs(value)
        );
      }),
    store_code: string().required(),
    month: number().required(),
    year: number().required(),
  })
);
