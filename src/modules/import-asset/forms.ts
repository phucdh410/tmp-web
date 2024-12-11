import { Resolver } from "react-hook-form";

import { IMPORT_ASSET_TYPES, WARRANTY_LEVELS } from "@constants/enums";
import { yupResolver } from "@hookform/resolvers/yup";
import { IImportAssetPayload } from "@interfaces/import-assets";
import {
  dateSchema,
  numberOptionalSchema,
  numberSchema,
  selectIdSchema,
  stringOptionalSchema,
  stringSchema,
} from "@utils/validation";
import dayjs from "dayjs";
import { array, object } from "yup";

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
    code: stringOptionalSchema,
    id: numberOptionalSchema,
    asset_name: stringSchema,
    type_import: numberSchema,
    document_code: stringSchema,
    import_date: dateSchema,
    warehouse_id: selectIdSchema,
    reason: stringSchema,
    category_id: selectIdSchema,
    vendor_id: selectIdSchema,
    description: stringSchema,
    warranty_date: dateSchema,
    warranty_duration: numberSchema,
    warranty_level: numberSchema,
    properties: array().of(numberSchema).min(1).required(),
    price: numberSchema,
    unit: stringSchema,
    quantity: numberSchema,
    total: numberSchema,
    depreciation_duration: numberSchema,
    depreciation_cost: numberSchema,
    model: stringSchema,
    documents: array()
      .of(
        object({
          document_id: numberSchema,
          date: dateSchema,
          code: stringSchema,
          note: stringSchema,
          original_name: stringOptionalSchema,
          url: stringOptionalSchema,
          id: numberOptionalSchema,
        })
      )
      .min(1)
      .required(),
  })
);
