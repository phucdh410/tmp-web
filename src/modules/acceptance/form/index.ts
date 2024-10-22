import { Resolver } from "react-hook-form";

import { ACCEPTANCE_STATUSES } from "@constants/enums";
import { yupResolver } from "@hookform/resolvers/yup";
import { IAcceptancePayload } from "@interfaces/acceptances";
import dayjs, { isDayjs } from "dayjs";
import { mixed, number, object, string } from "yup";

export const defaultValues: IAcceptancePayload = {
  document_code: "",
  code: "",
  date: dayjs().toDate(),
  asset_name: "",
  store_code: "",
  reason: "",
  category_id: -1,
  vendor_id: -1,
  description: "",
  price: 0,
  unit: "",
  quantity: 1,
  total: 0,
  status: ACCEPTANCE_STATUSES.SUGGEST,
};

export const resolver: Resolver<IAcceptancePayload> = yupResolver(
  object({
    document_code: string().optional(),
    code: string().optional(),
    id: string().optional(),
    asset_name: string().required(),
    date: mixed<Date | string>()
      .required()
      .test("date-valid", "", (value) => {
        return (
          typeof value === "string" || value instanceof Date || isDayjs(value)
        );
      }),
    store_code: string().required(),
    reason: string().required(),
    category_id: number().notOneOf([-1]).required(),
    vendor_id: number().notOneOf([-1]).required(),
    description: string().required(),
    price: number().required(),
    unit: string().required(),
    quantity: number().required(),
    total: number().required(),
    status: number().required(),
  })
);
