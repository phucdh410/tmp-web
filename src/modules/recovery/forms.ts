import { Resolver } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { IRecoveryPayload } from "@interfaces/recoveries";
import { validations } from "@utils/validation";
import dayjs from "dayjs";
import { array, number, object, string } from "yup";

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
    code: string().optional(),
    id: number().optional(),
    note: string().required(),
    created_date: validations.dateRequired,
    recovery_date: validations.dateRequired,
    location: string().required(),
    store_code: string().required(),
    user_id: number().required(),
    assets: array()
      .of(
        object({
          code: string().required(),
          quantity: number().required(),
          id: number().optional(),
        })
      )
      .min(1)
      .required(),
    documents: array()
      .of(
        object({
          document_id: number().required(),
          date: validations.dateRequired,
          code: string().required(),
          note: string().required(),
          id: number().optional(),
        })
      )
      .min(1)
      .required(),
  })
);
