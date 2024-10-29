import { Resolver } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { IHandoverOfAssetPayload } from "@interfaces/handover-of-assets";
import dayjs, { isDayjs } from "dayjs";
import { array, mixed, number, object, string } from "yup";

export const defaultValues: IHandoverOfAssetPayload = {
  id: "",
  date: dayjs().toDate(),
  code: "",
  document_code: "",
  assets: [],
};

export const resolver: Resolver<IHandoverOfAssetPayload> = yupResolver(
  object({
    id: string().optional(),
    document_code: string().optional(),
    code: string().optional(),
    date: mixed<Date | string>()
      .required()
      .test("date-valid", "", (value) => {
        return (
          typeof value === "string" || value instanceof Date || isDayjs(value)
        );
      }),
    assets: array()
      .of(
        object({
          asset_code: string().required(),
          nguoi_ban_giao: string().required(),
          nguoi_nhan_ban_giao: string().required(),
          quantity: number().min(1).required(),
          reason: string().required(),
          description: string().required(),
          file_id: string().required(),
        })
      )
      .min(1)
      .required(),
  })
);
