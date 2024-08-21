import { Resolver } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { IAmenitiesPayload } from "@interfaces/amenities";
import { boolean, number, object, string } from "yup";

export const defaultValues: IAmenitiesPayload = {
  code: "",
  name: "",
  amenityCriteriaCode: "",
  price: 0,
  active: true,
};

export const resolver: Resolver<IAmenitiesPayload> = yupResolver(
  object({
    code: string(),
    name: string().required("Vui lòng nhập thông tin này"),
    amenityCriteriaCode: string().required("Vui lòng nhập thông tin này"),
    price: number().required("Vui lòng nhập thông tin này"),
    active: boolean().required(),
  })
);
