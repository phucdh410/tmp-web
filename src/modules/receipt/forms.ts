import { Resolver } from "react-hook-form";

import { CODE_TYPES, WARRANTY_LEVELS } from "@constants/enums";
import { yupResolver } from "@hookform/resolvers/yup";
import { IReceiptPayload } from "@interfaces/receipts";
import {
  dateSchema,
  numberOptionalSchema,
  numberSchema,
  selectIdSchema,
  stringOptionalSchema,
  stringSchema,
} from "@utils/validation";
import dayjs from "dayjs";
import { array, boolean, mixed, object } from "yup";

export const defaultValues: IReceiptPayload = {
  id: undefined,
  code: "",
  name: "",
  store_code: "",
  reason: "",
  barcode: CODE_TYPES.BARCODE,
  category_id: -1,
  vendor_id: -1,
  note: "",
  date: dayjs().toDate(),
  warranty_date: dayjs().toDate(),
  warranty_duration: 0,
  warranty_level: WARRANTY_LEVELS.MONTH,
  properties: [],
  price: 0,
  unit: "",
  quantity: 1,
  amount: 0,
  depreciation_date: dayjs().toDate(),
  depreciation_duration: 0,
  depreciation_cost: 0,
  model: "",
  split_code: false,
  regions: [],
  documents: [],
};

export const resolver: Resolver<IReceiptPayload> = yupResolver(
  object({
    code: stringOptionalSchema,
    id: numberOptionalSchema,
    name: stringSchema,
    date: dateSchema,
    store_code: stringSchema,
    reason: stringSchema,
    barcode: mixed<boolean | number>()
      .required()
      .test("is-barcode", "", (value) => {
        return typeof value === "boolean" || typeof value === "number";
      }),
    category_id: selectIdSchema,
    vendor_id: selectIdSchema,
    note: stringSchema,
    warranty_date: dateSchema,
    warranty_duration: numberSchema,
    warranty_level: numberSchema,
    properties: array().of(numberSchema).min(1).required(),
    price: numberSchema,
    unit: stringSchema,
    quantity: numberSchema,
    amount: numberSchema,
    depreciation_date: dateSchema,
    depreciation_duration: numberSchema,
    depreciation_cost: numberSchema,
    model: stringSchema,
    split_code: boolean().required(),
    regions: array()
      .of(
        object({
          region_id: numberSchema,
          quantity: numberSchema,
          location: stringSchema,
          id: numberOptionalSchema,
        })
      )
      .min(1)
      .required(),
    documents: array()
      .of(
        object({
          document_id: numberSchema,
          date: dateSchema,
          code: stringSchema,
          note: stringSchema,
          originalName: stringOptionalSchema,
          url: stringOptionalSchema,
          id: numberOptionalSchema,
        })
      )
      .min(1)
      .required(),
  })
);
