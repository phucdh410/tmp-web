import { Resolver } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { IPlacePayload } from "@interfaces/places";
import { number, object, string } from "yup";

export const defaultValues: IPlacePayload = {
  code: "",
  name: "",
  store_code: "",
  status: 1,
};

export const resolver: Resolver<IPlacePayload> = yupResolver(
  object({
    code: string(),
    name: string().required("Vui lòng nhập thông tin này"),
    store_code: string().required("Vui lòng nhập thông tin này"),
    status: number().required(),
  })
);
