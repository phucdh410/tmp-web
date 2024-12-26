import { Resolver } from "react-hook-form";

import { ACCEPTANCE_STATUSES } from "@constants/enums";
import { yupResolver } from "@hookform/resolvers/yup";
import { IAcceptancePayload } from "@interfaces/acceptances";
import { IUploadResponse } from "@interfaces/upload";
import {
  dateSchema,
  numberOptionalSchema,
  numberSchema,
  selectIdSchema,
  stringOptionalSchema,
  stringSchema,
} from "@utils/validation";
import dayjs from "dayjs";
import { array, mixed, number, object } from "yup";

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
    id: numberOptionalSchema,
    document_code: stringSchema,
    code: stringOptionalSchema,
    date: dateSchema,
    store_code: stringSchema,
    reason: stringSchema,
    vendor_id: selectIdSchema,
    description: stringSchema,
    total: numberSchema,
    status: numberSchema,
    documents: mixed<number[] | IUploadResponse[]>().required(),
    assets: array()
      .of(
        object({
          name: stringSchema,
          category_id: selectIdSchema,
          price: numberSchema,
          code: stringOptionalSchema,
          unit: stringSchema,
          quantity: number().min(1).required(),
          total: numberSchema,
          description: stringSchema,
        })
      )
      .min(1)
      .required(),
  })
);
