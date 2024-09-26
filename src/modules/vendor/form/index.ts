import { Resolver } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { IVendorPayload } from "@interfaces/vendors";
import { array, number, object, string } from "yup";

export const DEFAULT_VALUES: IVendorPayload = {
  id: "",
  name: "",
  address: "",
  phone: "",
  email: "",
  contact: "",
  note: "",
  categories: [],
};

export const RESOLVER: Resolver<IVendorPayload> = yupResolver(
  object({
    name: string().required(),
    address: string().required(),
    phone: string().required(),
    email: string().optional(),
    contact: string().required(),
    note: string().optional(),
    categories: array().of(number().required()).min(1).required(),
  })
);
