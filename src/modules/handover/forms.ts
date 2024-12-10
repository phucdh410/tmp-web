import { Resolver } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { IHandoverPayload } from "@interfaces/handovers";
import { IUploadResponse } from "@interfaces/upload";
import { validations } from "@utils/validation";
import dayjs from "dayjs";
import { array, mixed, number, object, string } from "yup";

export const defaultValues: IHandoverPayload = {
  id: undefined,
  date: dayjs().toDate(),
  code: "",
  document_code: "",
  reason: "",
  handover_user: "",
  receiver_user: "",
  documents: [],
  assets: [],
};

export const resolver: Resolver<IHandoverPayload> = yupResolver(
  object({
    id: number().optional(),
    document_code: string().optional(),
    code: string().optional(),
    date: validations.dateRequired,
    handover_user: string().required(),
    receiver_user: string().required(),
    reason: string().required(),
    documents: mixed<number[] | IUploadResponse[]>().required(),
    assets: array()
      .of(
        object({
          asset_id: number().optional(),
          quantity: number().min(1).required(),
          description: string().required(),
        })
      )
      .min(1)
      .required(),
  })
);
