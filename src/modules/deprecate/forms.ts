import { Resolver } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { IDeprecatePayload } from "@interfaces/deprecates";
import {
  dateSchema,
  numberOptionalSchema,
  numberSchema,
  stringOptionalSchema,
  stringSchema,
} from "@utils/validation";
import dayjs from "dayjs";
import { object } from "yup";

export const defaultValues: IDeprecatePayload = {
  id: undefined,
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
    code: stringOptionalSchema,
    id: numberOptionalSchema,
    note: stringSchema,
    created_date: dateSchema,
    deprecate_date: dateSchema,
    store_code: stringSchema,
    month: numberSchema,
    year: numberSchema,
  })
);
