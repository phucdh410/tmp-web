import { Resolver } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { IAssetValuationPayload } from "@interfaces/asset-valuations";
import { validations } from "@utils/validation";
import { array, number, object, string } from "yup";

export const defaultValues: IAssetValuationPayload = {
  code: "",
  date: new Date(),
  valuation_date: new Date(),
  store_code: "",
  reason: "",
  content: "",
  assets: [],
};

export const resolver: Resolver<IAssetValuationPayload> = yupResolver(
  object({
    code: string().optional(),
    date: validations.dateRequired,
    valuation_date: validations.dateRequired,
    store_code: string().required(),
    reason: string().required(),
    content: string().required(),
    assets: array()
      .of(
        object({
          asset_id: number().required(),
          valuation_value: number().required(),
          valuation_note: string().required(),
        })
      )
      .min(1)
      .required(),
  })
);
