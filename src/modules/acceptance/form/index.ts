import { Resolver } from "react-hook-form";

import { ACCEPTANCE_STATUSES } from "@constants/enums";
import { yupResolver } from "@hookform/resolvers/yup";
import { IAcceptancePayload } from "@interfaces/acceptances";
import { IUploadResponse } from "@interfaces/upload";
import dayjs, { isDayjs } from "dayjs";
import { array, mixed, number, object, string } from "yup";

export const defaultValues: IAcceptancePayload = {
  id: undefined,
  document_code: "",
  code: "",
  date: dayjs().toDate(),
  store_code: "",
  reason: "",
  vendor_id: -1,
  description: "",
  total: 0,
  status: ACCEPTANCE_STATUSES.SUGGEST,
  documents: [],
  assets: [],
};

export const resolver: Resolver<IAcceptancePayload> = yupResolver(
  object({
    id: number().optional(),
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
    documents: mixed<number[] | IUploadResponse[]>().required(),
    assets: array()
      .of(
        object({
          name: string().required(),
          category_id: number().notOneOf([-1]).required(),
          price: number().required(),
          code: string().required(),
          unit: string().required(),
          quantity: number().min(1).required(),
          total: number().required(),
          description: string().required(),
        })
      )
      .min(1)
      .required(),
  })
);
