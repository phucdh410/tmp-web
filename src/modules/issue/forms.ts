import { Resolver } from "react-hook-form";

import { TRANSFER_TYPES } from "@constants/enums";
import { yupResolver } from "@hookform/resolvers/yup";
import { IIssuePayload } from "@interfaces/issues";
import {
  dateSchema,
  numberOptionalSchema,
  numberSchema,
  selectIdSchema,
  stringOptionalSchema,
  stringSchema,
} from "@utils/validation";
import dayjs from "dayjs";
import { array, object } from "yup";

export const defaultValues: IIssuePayload = {
  id: undefined,
  code: "",
  note: "",
  issue_date: dayjs().toDate(),
  created_date: dayjs().toDate(),
  store_code: "",
  user_id: -1,
  category: TRANSFER_TYPES.INSIDE,
  assets: [],
  documents: [],
};

export const resolver: Resolver<IIssuePayload> = yupResolver(
  object({
    code: stringOptionalSchema,
    id: numberOptionalSchema,
    note: stringSchema,
    created_date: dateSchema,
    issue_date: dateSchema,
    store_code: stringSchema,
    user_id: selectIdSchema,
    category: numberSchema,
    assets: array()
      .of(
        object({
          code: stringSchema,
          quantity: numberSchema,
          id: numberOptionalSchema,
        })
      )
      .min(1)
      .required(),
    documents: array()
      .of(
        object({
          document_id: numberSchema,
          date: dateSchema,
          code: stringSchema,
          note: stringSchema,
          id: numberOptionalSchema,
        })
      )
      .min(1)
      .required(),
  })
);
