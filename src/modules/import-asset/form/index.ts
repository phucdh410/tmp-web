import { Resolver } from "react-hook-form";

import { WARRANTY_LEVELS } from "@constants/enums";
import { yupResolver } from "@hookform/resolvers/yup";
import { IImportAssetPayload } from "@interfaces/import-assets";
import dayjs, { isDayjs } from "dayjs";
import { array, mixed, number, object, string } from "yup";

export const defaultValues: IImportAssetPayload = {
  type: "",
  id: "",
  code: "",
  name: "",
  document_code: "",
  store_code: "",
  reason: "",
  category_id: -1,
  vendor_id: -1,
  description: "",
  date: dayjs().toDate(),
  warranty_date: dayjs().toDate(),
  warranty_duration: 0,
  warranty_level: WARRANTY_LEVELS.MONTH,
  properties: [],
  price: 0,
  unit: "",
  quantity: 1,
  amount: 0,
  depreciation_duration: 0,
  depreciation_cost: 0,
  model: "",
  documents: [],
};

export const resolver: Resolver<IImportAssetPayload> = yupResolver(
  object({
    code: string().optional(),
    id: string().optional(),
    name: string().required(),
    type: string().required(),
    document_code: string().required(),
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
    depreciation_duration: number().required(),
    depreciation_cost: number().required(),
    model: string().required(),
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
          original_name: string().optional(),
          url: string().optional(),
          id: number().optional(),
        })
      )
      .min(1)
      .required(),
  })
);
