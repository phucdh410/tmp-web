import { Resolver } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { IInventoryPayload } from "@interfaces/inventories";
import { validations } from "@utils/validation";
import { array, number, object, string } from "yup";

export const defaultValues: IInventoryPayload = {
  code: "",
  date: new Date(),
  stocktake_date: new Date(),
  store_code: "",
  user_id: -1,
  note: "",
  // chon_ban_kiem_ke: false,
  // them_nguoi_kiem_ke_tu_lan_nhap_truoc: false,
  // users: [],
  stocktake_assets: [],
};

export const resolver: Resolver<IInventoryPayload> = yupResolver(
  object({
    code: string().optional(),
    date: validations.dateRequired,
    stocktake_date: validations.dateRequired,
    store_code: string().required(),
    user_id: number().notOneOf([-1]).required(),
    note: string().optional(),
    // chon_ban_kiem_ke: bool().required(),
    // them_nguoi_kiem_ke_tu_lan_nhap_truoc: bool().required(),
    // users: array()
    //   .of(
    //     object({
    //       name: string().required(),
    //       role: string().required(),
    //       represent: string().required(),
    //     })
    //   )
    //   .min(1)
    //   .required(),
    stocktake_assets: array()
      .of(
        object({
          region_id: number().required(),
          asset_id: number().required(),
          stocktake_quantity: number().required(),
          quality: number().required(),
          recommend: string().required(),
          note: string().required(),
        })
      )
      .min(1)
      .required(),
  })
);
