import { Resolver } from "react-hook-form";

import { CODE_TYPES, WARRANTY_LEVELS } from "@constants/enums";
import { yupResolver } from "@hookform/resolvers/yup";
import { IExportAssetPayload } from "@interfaces/export-assets";
import { validations } from "@utils/validation";
import dayjs from "dayjs";
import { array, mixed, number, object, string } from "yup";

export const defaultValues: IExportAssetPayload = {
  id: undefined,
  code: "",
  document_code: "",
  warehouse_id: -1,
  store_code: "",
  reason: "",
  asset_id: -1,
  category_id: -1,
  description: "",
  barcode: CODE_TYPES.BARCODE,
  export_date: dayjs().toDate(),
  warranty_date: dayjs().toDate(),
  warranty_duration: 0,
  warranty_level: WARRANTY_LEVELS.MONTH,
  properties: [],
  price: 0,
  unit: "",
  quantity: 1,
  total: 0,
  depreciation_duration: 0,
  depreciation_cost: 0,
  model: "",
  documents: [],
};

export const resolver: Resolver<IExportAssetPayload> = yupResolver(
  object({
    code: string().optional(),
    id: number().optional(),
    document_code: string().required(),
    export_date: validations.dateRequired,
    warehouse_id: number().notOneOf([-1]).required(),
    store_code: string().required(),
    reason: string().required(),
    barcode: mixed<boolean | number>()
      .required()
      .test("is-barcode", "", (value) => {
        return typeof value === "boolean" || typeof value === "number";
      }),
    asset_id: number().notOneOf([-1]).required(),
    category_id: number().notOneOf([-1]).required(),
    description: string().required(),
    warranty_date: validations.dateRequired,
    warranty_duration: number().required(),
    warranty_level: number().required(),
    properties: array().of(number().required()).min(1).required(),
    price: number().required(),
    unit: string().required(),
    quantity: number().required(),
    total: number().required(),
    depreciation_duration: number().required(),
    depreciation_cost: number().required(),
    model: string().required(),
    documents: array()
      .of(
        object({
          document_id: number().required(),
          date: validations.dateRequired,
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