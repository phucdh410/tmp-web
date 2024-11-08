import { Resolver } from "react-hook-form";

import { CODE_TYPES, WARRANTY_LEVELS } from "@constants/enums";
import { yupResolver } from "@hookform/resolvers/yup";
import { IReceiptPayload } from "@interfaces/receipts";
import dayjs, { isDayjs } from "dayjs";
import { array, boolean, mixed, number, object, string } from "yup";

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
    code: string().optional(),
    id: number().optional(),
    name: string().required(),
    date: mixed<Date | string>()
      .required()
      .test("date-valid", "", (value) => {
        return (
          typeof value === "string" || value instanceof Date || isDayjs(value)
        );
      }),
    store_code: string().required(),
    reason: string().required(),
    barcode: mixed<boolean | number>()
      .required()
      .test("is-barcode", "", (value) => {
        return typeof value === "boolean" || typeof value === "number";
      }),
    category_id: number().notOneOf([-1]).required(),
    vendor_id: number().notOneOf([-1]).required(),
    note: string().required(),
    warranty_date: mixed<Date | string>()
      .required()
      .test("date-valid", "", (value) => {
        return (
          typeof value === "string" || value instanceof Date || isDayjs(value)
        );
      }),
    warranty_duration: number().required(),
    warranty_level: number().required(),
    properties: array().of(number().required()).min(1).required(),
    price: number().required(),
    unit: string().required(),
    quantity: number().required(),
    amount: number().required(),
    depreciation_date: mixed<Date | string>()
      .required()
      .test("date-valid", "", (value) => {
        return (
          typeof value === "string" || value instanceof Date || isDayjs(value)
        );
      }),
    depreciation_duration: number().required(),
    depreciation_cost: number().required(),
    model: string().required(),
    split_code: boolean().required(),
    regions: array()
      .of(
        object({
          region_id: number().required(),
          quantity: number().required(),
          location: string().required(),
          id: number().optional(),
        })
      )
      .min(1)
      .required(),
    documents: array()
      .of(
        object({
          document_id: number().required(),
          date: mixed<Date | string>()
            .required()
            .test("valid-date", "", (value) => {
              return (
                typeof value === "string" ||
                value instanceof Date ||
                isDayjs(value)
              );
            }),
          code: string().required(),
          note: string().required(),
          originalName: string().optional(),
          url: string().optional(),
          id: number().optional(),
        })
      )
      .min(1)
      .required(),
  })
);
