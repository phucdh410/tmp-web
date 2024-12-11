import { Resolver } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { IInventoryPayload } from "@interfaces/inventories";
import {
  dateSchema,
  selectIdSchema,
  stringOptionalSchema,
  stringSchema,
} from "@utils/validation";
import { array, number, object } from "yup";

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
    code: stringOptionalSchema,
    date: dateSchema,
    stocktake_date: dateSchema,
    store_code: stringSchema,
    user_id: selectIdSchema,
    note: stringOptionalSchema,
    // chon_ban_kiem_ke: bool().required(),
    // them_nguoi_kiem_ke_tu_lan_nhap_truoc: bool().required(),
    // users: array()
    //   .of(
    //     object({
    //       name: stringSchema,
    //       role: stringSchema,
    //       represent: stringSchema,
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
          recommend: stringSchema,
          note: stringSchema,
        })
      )
      .min(1)
      .required(),
  })
);
