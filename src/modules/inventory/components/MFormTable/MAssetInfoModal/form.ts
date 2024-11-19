import { Resolver } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { number, object } from "yup";

import { IInformation } from ".";

export const DEFAULT_VALUES: IInformation = {
  quantity: 1,
  note: "",
  kien_nghi_xu_ly: "",
  quality: "",
};

export const RESOLVER: Resolver<IInformation> = yupResolver(
  object({
    quantity: number().required(),
  })
);
