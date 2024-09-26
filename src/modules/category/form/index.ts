import { Resolver } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { ICategoryPayload } from "@interfaces/categories";
import { object, string } from "yup";

export const DEFAULT_VALUES: ICategoryPayload = {
  id: "",
  code: "",
  name: "",
  note: "",
};

export const RESOLVER: Resolver<ICategoryPayload> = yupResolver(
  object({
    code: string().required(),
    name: string().required(),
    note: string().optional(),
  })
);
