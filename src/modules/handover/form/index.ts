import { Resolver } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { IHandoverPayload } from "@interfaces/handovers";
import { IUploadResponse } from "@interfaces/upload";
import dayjs, { isDayjs } from "dayjs";
import { array, mixed, number, object, string } from "yup";

export const defaultValues: IHandoverPayload = {
  id: "",
  date: dayjs().toDate(),
  code: "",
  document_code: "",
  handover_user_id: -1,
  receiver_user_id: -1,
  documents: [],
  assets: [],
};

export const resolver: Resolver<IHandoverPayload> = yupResolver(
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
    handover_user_id: number().notOneOf([-1]).required(),
    receiver_user_id: number().notOneOf([-1]).required(),
    documents: mixed<number[] | IUploadResponse[]>().required(),
    assets: array()
      .of(
        object({
          asset_id: number().required(),
          quantity: number().min(1).required(),
          reason: string().required(),
          description: string().required(),
        })
      )
      .min(1)
      .required(),
  })
);
