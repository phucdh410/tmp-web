import { Resolver } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { IStorePayload } from "@interfaces/stores";
import { object, string } from "yup";

export const DEFAULT_VALUES: IStorePayload = {
  id: "",
  code: "",
  name: "",
  address: "",
  phone: "",
  note: "",
};

export const RESOLVER: Resolver<IStorePayload> = yupResolver(
  object({
    name: string().required(""),
    code: string().required(""),
    address: string().required(""),
    phone: string().required(""),
    note: string().optional(),
  })
);
