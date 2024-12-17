import { Resolver } from "react-hook-form";

import { TRANSFER_TYPES } from "@constants/enums";
import { yupResolver } from "@hookform/resolvers/yup";
import { ITransferPayload } from "@interfaces/transfers";
import {
  dateSchema,
  numberOptionalSchema,
  numberSchema,
  stringOptionalSchema,
  stringSchema,
} from "@utils/validation";
import dayjs from "dayjs";
import { array, object } from "yup";

export const defaultValues: ITransferPayload = {
  id: undefined,
  code: "",
  note: "",
  created_date: dayjs().toDate(),
  transfer_date: dayjs().toDate(),
  category: TRANSFER_TYPES.INSIDE,
  transfer_from: -1,
  transfer_to: -1,
  user_in_charge_from: "",
  user_in_charge_to: "",
  assets: [],
  documents: [],
};

export const resolver: Resolver<ITransferPayload> = yupResolver(
  object({
    code: stringOptionalSchema,
    id: numberOptionalSchema,
    note: stringSchema,
    created_date: dateSchema,
    transfer_date: dateSchema,
    category: numberSchema,
    transfer_from: numberSchema,
    transfer_to: numberSchema,
    user_in_charge_from: stringSchema,
    user_in_charge_to: stringSchema,
    assets: array()
      .of(
        object({
          code: stringSchema,
          quantity: numberSchema,
          id: numberOptionalSchema,
        })
      )
      .min(1)
      .required(),
    documents: array()
      .of(
        object({
          document_id: numberSchema,
          date: dateSchema,
          code: stringSchema,
          note: stringSchema,
          id: numberOptionalSchema,
        })
      )
      .min(1)
      .required(),
  })
);
