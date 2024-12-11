import { Resolver } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { IAssetValuationPayload } from "@interfaces/asset-valuations";
import {
  dateSchema,
  numberSchema,
  stringOptionalSchema,
  stringSchema,
} from "@utils/validation";
import { array, object } from "yup";

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
    code: stringOptionalSchema,
    date: dateSchema,
    valuation_date: dateSchema,
    store_code: stringSchema,
    reason: stringSchema,
    content: stringSchema,
    assets: array()
      .of(
        object({
          asset_id: numberSchema,
          valuation_value: numberSchema,
          valuation_note: stringSchema,
        })
      )
      .min(1)
      .required(),
  })
);
