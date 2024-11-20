import { Resolver } from "react-hook-form";

import { IMPORT_ASSET_TYPES, WARRANTY_LEVELS } from "@constants/enums";
import { yupResolver } from "@hookform/resolvers/yup";
import { IImportAssetPayload } from "@interfaces/import-assets";
import { validations } from "@utils/validation";
import dayjs from "dayjs";
import { array, number, object, string } from "yup";

export const defaultValues: IImportAssetPayload = {
  type_import: IMPORT_ASSET_TYPES.BUY_NEW,
  id: undefined,
  code: "",
  asset_name: "",
  asset_id: -1,
  document_code: "",
  warehouse_id: -1,
  reason: "",
  category_id: -1,
  vendor_id: -1,
  description: "",
  import_date: dayjs().toDate(),
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

export const resolver: Resolver<IImportAssetPayload> = yupResolver(
  object({
    code: string().optional(),
    id: number().optional(),
    asset_name: string().required(),
    type_import: number().required(),
    document_code: string().required(),
    import_date: validations.dateRequired,
    warehouse_id: number().notOneOf([-1]).required(),
    reason: string().required(),
    category_id: number().notOneOf([-1]).required(),
    vendor_id: number().notOneOf([-1]).required(),
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
