import { Resolver } from "react-hook-form";

import { TRANSFER_TYPES } from "@constants/enums";
import { yupResolver } from "@hookform/resolvers/yup";
import { IRecoveryPayload } from "@interfaces/recoveries";
import dayjs, { isDayjs } from "dayjs";
import { array, mixed, number, object, string } from "yup";

export const defaultValues: IRecoveryPayload = {
  id: "",
  code: "",
  note: "",
  recovery_date: dayjs().toDate(),
  category: TRANSFER_TYPES.INSIDE,
  recovery_from: -1,
  recovery_to: -1,
  user_in_charge_from: "",
  user_in_charge_to: "",
  assets: [],
  documents: [],
};

export const resolver: Resolver<IRecoveryPayload> = yupResolver(
  object({
    code: string().optional(),
    id: string().optional(),
    note: string().required(),
    recovery_date: mixed<Date | string>()
      .required()
      .test("date-valid", "", (value) => {
        return (
          typeof value === "string" || value instanceof Date || isDayjs(value)
        );
      }),
    category: number().required(),
    recovery_from: number().notOneOf([-1]).required(),
    recovery_to: number().notOneOf([-1]).required(),
    user_in_charge_from: string().required(),
    user_in_charge_to: string().required(),
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
