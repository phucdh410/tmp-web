import { Resolver } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { ISellAssetPayload } from "@interfaces/sell-assets";
import {
  dateSchema,
  numberOptionalSchema,
  numberSchema,
  selectIdSchema,
  stringOptionalSchema,
  stringSchema,
} from "@utils/validation";
import { array, object } from "yup";

export const defaultValues: ISellAssetPayload = {
  code: "",
  address: "",
  dich_vu_bao_hanh: -1,
  hinh_thuc_thanh_toan: -1,
  khach_hang_mua_id: -1,
  warehouse_id: -1,
  ngay_giao_hang: new Date(),
  ngay_lap_chung_tu: new Date(),
  note: "",
  reason: "",
  assets: [],
};

export const resolver: Resolver<ISellAssetPayload> = yupResolver(
  object({
    code: stringOptionalSchema,
    address: stringSchema,
    dich_vu_bao_hanh: selectIdSchema,
    hinh_thuc_thanh_toan: selectIdSchema,
    khach_hang_mua_id: selectIdSchema,
    warehouse_id: selectIdSchema,
    ngay_giao_hang: dateSchema,
    ngay_lap_chung_tu: dateSchema,
    note: stringSchema,
    reason: stringSchema,
    assets: array()
      .of(
        object({
          id: numberOptionalSchema,
          category_id: selectIdSchema,
          name: stringSchema,
          properties: array().of(numberSchema).min(1).required(),
          gia_ban: numberSchema,
          gia_nhap: numberSchema,
          unit: stringSchema,
          quantity: numberSchema,
          warranty_date: dateSchema,
          warranty_level: numberSchema,
          warranty_duration: numberSchema,
          total: numberSchema,
          description: stringSchema,
        })
      )
      .min(1)
      .required(),
  })
);
