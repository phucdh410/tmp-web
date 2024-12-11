import { Resolver } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { IRecoveryPayload } from "@interfaces/recoveries";
import {
  dateSchema,
  numberOptionalSchema,
  numberSchema,
  stringOptionalSchema,
  stringSchema,
} from "@utils/validation";
import dayjs from "dayjs";
import { array, object } from "yup";

export const defaultValues: IRecoveryPayload = {
  id: undefined,
  code: "",
  note: "",
  recovery_date: dayjs().toDate(),
  created_date: dayjs().toDate(),
  location: "",
  store_code: "",
  user_id: -1,
  assets: [],
  documents: [],
};

export const resolver: Resolver<IRecoveryPayload> = yupResolver(
  object({
    code: stringOptionalSchema,
    id: numberOptionalSchema,
    note: stringSchema,
    created_date: dateSchema,
    recovery_date: dateSchema,
    location: stringSchema,
    store_code: stringSchema,
    user_id: numberSchema,
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
