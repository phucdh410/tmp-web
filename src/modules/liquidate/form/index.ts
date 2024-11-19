import { Resolver } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { ILiquidatePayload } from "@interfaces/liquidates";
import { validations } from "@utils/validation";
import dayjs from "dayjs";
import { array, number, object, string } from "yup";

export const defaultValues: ILiquidatePayload = {
  id: undefined,
  code: "",
  note: "",
  liquidate_date: dayjs().toDate(),
  created_date: dayjs().toDate(),
  store_code: "",
  user_id: -1,
  assets: [],
  documents: [],
};

export const resolver: Resolver<ILiquidatePayload> = yupResolver(
  object({
    code: string().optional(),
    id: number().optional(),
    note: string().required(),
    created_date: validations.dateRequired,
    liquidate_date: validations.dateRequired,
    store_code: string().required(),
    user_id: number().notOneOf([-1]).required(),
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
