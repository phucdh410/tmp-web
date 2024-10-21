import { Resolver } from "react-hook-form";

import { TRANSFER_TYPES } from "@constants/enums";
import { yupResolver } from "@hookform/resolvers/yup";
import { ILiquidatePayload } from "@interfaces/liquidates";
import dayjs, { isDayjs } from "dayjs";
import { array, mixed, number, object, string } from "yup";

export const defaultValues: ILiquidatePayload = {
  id: "",
  code: "",
  note: "",
  liquidate_date: dayjs().toDate(),
  created_date: dayjs().toDate(),
  store_code: "",
  user_id: "",
  category: TRANSFER_TYPES.INSIDE,
  assets: [],
  documents: [],
};

export const resolver: Resolver<ILiquidatePayload> = yupResolver(
  object({
    code: string().optional(),
    id: string().optional(),
    note: string().required(),
    created_date: mixed<Date | string>()
      .required()
      .test("date-valid", "", (value) => {
        return (
          typeof value === "string" || value instanceof Date || isDayjs(value)
        );
      }),
    liquidate_date: mixed<Date | string>()
      .required()
      .test("date-valid", "", (value) => {
        return (
          typeof value === "string" || value instanceof Date || isDayjs(value)
        );
      }),
    store_code: string().required(),
    user_id: string().required(),
    category: number().required(),
    assets: array()
      .of(
        object({
          code: string().required(),
          quantity: number().required(),
          id: mixed<string | number>()
            .optional()
            .test("optional-id", "", (value, context) => {
              if (context.parent.hasOwnProperty("id")) {
                return typeof value === "string" || typeof value === "number";
              }
              return true;
            }),
        })
      )
      .min(1)
      .required(),
    documents: array()
      .of(
        object({
          document_id: mixed<string | number>()
            .required()
            .notOneOf([""])
            .test("required-id", "", (value) => {
              return typeof value === "string" || typeof value === "number";
            }),
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
          id: mixed<string | number>()
            .optional()
            .test("optional-id", "", (value, context) => {
              if (context.parent.hasOwnProperty("id")) {
                return typeof value === "string" || typeof value === "number";
              }
              return true;
            }),
        })
      )
      .min(1)
      .required(),
  })
);
