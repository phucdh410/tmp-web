import { Resolver } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { IHandoverOfAssetPayload } from "@interfaces/handover-of-assets";
import dayjs, { isDayjs } from "dayjs";
import { array, mixed, number, object, string } from "yup";

export const defaultValues: IHandoverOfAssetPayload = {
  id: "",
  so_phieu_de_xuat_tai_san: "",
  so_ct_ban_giao: "",
  ngay_ban_giao: dayjs().toDate(),
  tai_san_ban_giao: -1,
  reason: "",
  note: "",
  nguoi_nhan_ban_giao: -1,
  file: "",
  assets: [],
};

export const resolver: Resolver<IHandoverOfAssetPayload> = yupResolver(
  object({
    id: string().optional(),
    so_phieu_de_xuat_tai_san: string().optional(),
    so_ct_ban_giao: string().optional(),
    ngay_ban_giao: mixed<Date | string>()
      .required()
      .test("date-valid", "", (value) => {
        return (
          typeof value === "string" || value instanceof Date || isDayjs(value)
        );
      }),
    tai_san_ban_giao: number().notOneOf([-1]).required(),
    reason: string().required(),
    note: string().required(),
    nguoi_nhan_ban_giao: number().notOneOf([-1]).required(),
    file: string().required(),
    assets: array()
      .of(
        object({
          name: string().required(),
          ngay_ban_giao: mixed<Date | string>()
            .required()
            .test("date-valid", "", (value) => {
              return (
                typeof value === "string" ||
                value instanceof Date ||
                isDayjs(value)
              );
            }),
          reason: string().required(),
          note: string().required(),
          nguoi_nhan_ban_giao: string().required(),
          file_id: string().required(),
        })
      )
      .required(),
  })
);
