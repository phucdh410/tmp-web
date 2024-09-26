import { Resolver } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { IRegionPayload } from "@interfaces/regions";
import { number, object, string } from "yup";

export const DEFAULT_VALUES: IRegionPayload = {
  id: "",
  code: "",
  name: "",
  store_code: "",
  place_id: -1,
};

export const RESOLVER: Resolver<IRegionPayload> = yupResolver(
  object({
    code: string().required(),
    name: string().required(),
    store_code: string().required(),
    place_id: number().required().min(0),
  })
);
