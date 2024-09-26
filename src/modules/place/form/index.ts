import { Resolver } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { IPlacePayload } from "@interfaces/places";
import { number, object, string } from "yup";

export const DEFAULT_VALUES: IPlacePayload = {
  code: "",
  name: "",
  store_code: "",
  status: 1,
};

export const RESOLVER: Resolver<IPlacePayload> = yupResolver(
  object({
    code: string().optional(),
    name: string().required("Vui lòng nhập thông tin này"),
    store_code: string().required("Vui lòng nhập thông tin này"),
    status: number().required(),
  })
);
