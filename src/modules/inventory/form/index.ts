import { Resolver } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { IInventoryPayload } from "@interfaces/inventories";
import { isDayjs } from "dayjs";
import { array, bool, mixed, number, object, string } from "yup";

export const defaultValues: IInventoryPayload = {
  code: "",
  date: new Date(),
  check_date: new Date(),
  store_code: "",
  user_check_id: -1,
  note: "",
  chon_ban_kiem_ke: false,
  them_nguoi_kiem_ke_tu_lan_nhap_truoc: false,
  users: [],
  assets: [],
};

export const resolver: Resolver<IInventoryPayload> = yupResolver(
  object({
    code: string().optional(),
    date: mixed<Date | string>()
      .required()
      .test("date-valid", "", (value) => {
        return (
          typeof value === "string" || value instanceof Date || isDayjs(value)
        );
      }),
    check_date: mixed<Date | string>()
      .required()
      .test("date-valid", "", (value) => {
        return (
          typeof value === "string" || value instanceof Date || isDayjs(value)
        );
      }),
    store_code: string().required(),
    user_check_id: number().notOneOf([-1]).required(),
    note: string().optional(),
    chon_ban_kiem_ke: bool().required(),
    them_nguoi_kiem_ke_tu_lan_nhap_truoc: bool().required(),
    users: array()
      .of(
        object({
          name: string().required(),
          role: string().required(),
          represent: string().required(),
        })
      )
      .min(1)
      .required(),
    assets: array()
      .of(
        object({
          code: string().required(),
          name: string().required(),
          vi_tri: string().required(),
          so_luong_so_sach: number().required(),
          nguyen_gia: number().required(),
          gia_tri_con_lai: number().required(),
          so_luong_kiem_ke: number().required(),
          chat_luong: string().required(),
          kien_nghi_xu_ly: string().required(),
          note: string().required(),
        })
      )
      .min(1)
      .required(),
  })
);
