import { Resolver } from "react-hook-form";

import { ACCEPTANCE_STATUSES } from "@constants/enums";
import { yupResolver } from "@hookform/resolvers/yup";
import { IAcceptancePayload } from "@interfaces/acceptances";
import dayjs, { isDayjs } from "dayjs";
import { array, mixed, number, object, string } from "yup";

export const defaultValues: IAcceptancePayload = {
  id: "",
  document_code: "",
  code: "",
  date: dayjs().toDate(),
  store_code: "",
  reason: "",
  vendor_id: -1,
  description: "",
  total: 0,
  status: ACCEPTANCE_STATUSES.SUGGEST,
  file_id: "",
  assets: [],
};

export const resolver: Resolver<IAcceptancePayload> = yupResolver(
  object({
    id: string().optional(),
    document_code: string().optional(),
    code: string().optional(),
    date: mixed<Date | string>()
      .required()
      .test("date-valid", "", (value) => {
        return (
          typeof value === "string" || value instanceof Date || isDayjs(value)
        );
      }),
    store_code: string().required(),
    reason: string().required(),
    vendor_id: number().notOneOf([-1]).required(),
    description: string().required(),
    total: number().required(),
    status: number().required(),
    file_id: string().required(),
    assets: array()
      .of(
        object({
          asset_name: string().required(),
          category_id: number().notOneOf([-1]).required(),
          price: number().required(),
          code: string().required(),
          unit: string().required(),
          quantity: number().min(1).required(),
          amount: number().required(),
          description: string().required(),
        })
      )
      .min(1)
      .required(),
  })
);
