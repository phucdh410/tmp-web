import { Resolver } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { IAssetValuationPayload } from "@interfaces/asset-valuations";
import { validations } from "@utils/validation";
import { array, number, object, string } from "yup";

export const defaultValues: IAssetValuationPayload = {
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

export const resolver: Resolver<IAssetValuationPayload> = yupResolver(
  object({
    code: string().optional(),
    address: string().required(),
    dich_vu_bao_hanh: number().notOneOf([-1]).required(),
    hinh_thuc_thanh_toan: number().notOneOf([-1]).required(),
    khach_hang_mua_id: number().notOneOf([-1]).required(),
    warehouse_id: number().notOneOf([-1]).required(),
    ngay_giao_hang: validations.dateRequired,
    ngay_lap_chung_tu: validations.dateRequired,
    note: string().required(),
    reason: string().required(),
    assets: array()
      .of(
        object({
          id: number().optional(),
          category_id: number().notOneOf([-1]).required(),
          name: string().required(),
          properties: array().of(number().required()).min(1).required(),
          gia_ban: number().required(),
          gia_nhap: number().required(),
          unit: string().required(),
          quantity: number().required(),
          warranty_date: validations.dateRequired,
          warranty_level: number().required(),
          warranty_duration: number().required(),
          total: number().required(),
          description: string().required(),
        })
      )
      .min(1)
      .required(),
  })
);
