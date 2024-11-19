import { Resolver } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { IDeprecatePayload } from "@interfaces/deprecates";
import { validations } from "@utils/validation";
import dayjs from "dayjs";
import { number, object, string } from "yup";

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
    code: string().optional(),
    id: number().optional(),
    note: string().required(),
    created_date: validations.dateRequired,
    deprecate_date: validations.dateRequired,
    store_code: string().required(),
    month: number().required(),
    year: number().required(),
  })
);
