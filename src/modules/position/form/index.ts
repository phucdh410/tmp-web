import { Resolver } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { IPositionPayload } from "@interfaces/positions";
import { object, string } from "yup";

export const defaultValues: IPositionPayload = {
  code: "",
  name: "",
  store_code: "",
  place_code: "",
};

export const resolver: Resolver<IPositionPayload> = yupResolver(
  object({
    code: string(),
    name: string().required("Vui lòng nhập thông tin này"),
    store_code: string().required("Vui lòng nhập thông tin này"),
    place_code: string().required("Vui lòng nhập thông tin này"),
  })
);
