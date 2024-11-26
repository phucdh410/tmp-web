import { Resolver } from "react-hook-form";

import { STOCKTAKE_QUALITIES } from "@constants/enums";
import { yupResolver } from "@hookform/resolvers/yup";
import { IMoreAssetInformationInInventoryPayload } from "@interfaces/inventories";
import { number, object, string } from "yup";

export const DEFAULT_VALUES: IMoreAssetInformationInInventoryPayload = {
  stocktake_quantity: 1,
  note: "",
  recommend: "",
  quality: STOCKTAKE_QUALITIES.WELL,
};

export const RESOLVER: Resolver<IMoreAssetInformationInInventoryPayload> =
  yupResolver(
    object({
      stocktake_quantity: number().required(),
      note: string().required(),
      recommend: string().required(),
      quality: number().required(),
    })
  );
