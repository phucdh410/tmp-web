import { Resolver } from "react-hook-form";

import { IMPORT_ASSET_TYPES, WARRANTY_LEVELS } from "@constants/enums";
import { yupResolver } from "@hookform/resolvers/yup";
import { IImportAssetPayload } from "@interfaces/import-assets";
import dayjs, { isDayjs } from "dayjs";
import { array, mixed, number, object, string } from "yup";

export const defaultValues: IImportAssetPayload = {
  type_import: IMPORT_ASSET_TYPES.BUY_NEW,
  id: "",
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
  warranty_begin_date: dayjs().toDate(),
  warranty_duration: 0,
  warranty_level: WARRANTY_LEVELS.MONTH,
  properties: [],
  price: 0,
  unit: "",
  quantity: 1,
  total: 0,
  allocation_period: 0,
  allocation_amount: 0,
  identifier: "",
  documents: [],
};

export const resolver: Resolver<IImportAssetPayload> = yupResolver(
  object({
    code: string().optional(),
    id: string().optional(),
    asset_name: string().required(),
    type_import: number().required(),
    document_code: string().required(),
    import_date: mixed<Date | string>()
      .required()
      .test("date-valid", "", (value) => {
        return (
          typeof value === "string" || value instanceof Date || isDayjs(value)
        );
      }),
    warehouse_id: number().notOneOf([-1]).required(),
    reason: string().required(),
    category_id: number().notOneOf([-1]).required(),
    vendor_id: number().notOneOf([-1]).required(),
    description: string().required(),
    warranty_begin_date: mixed<Date | string>()
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
    total: number().required(),
    allocation_period: number().required(),
    allocation_amount: number().required(),
    identifier: string().required(),
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
