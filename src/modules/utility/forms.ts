import { Resolver } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { IAmenityPayload } from "@interfaces/amenities";
import { number, object, string } from "yup";

export const defaultValues: IAmenityPayload = {
  code: "",
  name: "",
  amenity_criteria_code: "",
  price: 0,
  status: 1,
};

export const resolver: Resolver<IAmenityPayload> = yupResolver(
  object({
    code: string(),
    name: string().required("Vui lòng nhập thông tin này"),
    amenity_criteria_code: string().required("Vui lòng nhập thông tin này"),
    price: number().required("Vui lòng nhập thông tin này"),
    status: number().required(),
  })
);
