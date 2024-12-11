import { Resolver } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { IHandoverPayload } from "@interfaces/handovers";
import { IUploadResponse } from "@interfaces/upload";
import {
  dateSchema,
  numberOptionalSchema,
  stringOptionalSchema,
  stringSchema,
} from "@utils/validation";
import dayjs from "dayjs";
import { array, mixed, number, object } from "yup";

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
    id: numberOptionalSchema,
    document_code: stringOptionalSchema,
    code: stringOptionalSchema,
    date: dateSchema,
    handover_user: stringSchema,
    receiver_user: stringSchema,
    reason: stringSchema,
    documents: mixed<number[] | IUploadResponse[]>().required(),
    assets: array()
      .of(
        object({
          asset_id: numberOptionalSchema,
          quantity: number().min(1).required(),
          description: stringSchema,
        })
      )
      .min(1)
      .required(),
  })
);
