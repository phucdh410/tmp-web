import { Resolver } from "react-hook-form";

import { TRANSFER_TYPES } from "@constants/enums";
import { yupResolver } from "@hookform/resolvers/yup";
import { IIssuePayload } from "@interfaces/issues";
import dayjs, { isDayjs } from "dayjs";
import { array, mixed, number, object, string } from "yup";

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
    code: string().optional(),
    id: number().optional(),
    note: string().required(),
    created_date: mixed<Date | string>()
      .required()
      .test("date-valid", "", (value) => {
        return (
          typeof value === "string" || value instanceof Date || isDayjs(value)
        );
      }),
    issue_date: mixed<Date | string>()
      .required()
      .test("date-valid", "", (value) => {
        return (
          typeof value === "string" || value instanceof Date || isDayjs(value)
        );
      }),
    store_code: string().required(),
    user_id: number().notOneOf([-1]).required(),
    category: number().required(),
    assets: array()
      .of(
        object({
          code: string().required(),
          quantity: number().required(),
          id: number().optional(),
        })
      )
      .min(1)
      .required(),
    documents: array()
      .of(
        object({
          document_id: number().required(),
          date: mixed<Date | string>()
            .required()
            .test("valid-date", "", (value) => {
              return (
                typeof value === "string" ||
                value instanceof Date ||
                isDayjs(value)
              );
            }),
          code: string().required(),
          note: string().required(),
          id: number().optional(),
        })
      )
      .min(1)
      .required(),
  })
);
