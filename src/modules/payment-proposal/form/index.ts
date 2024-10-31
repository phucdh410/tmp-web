import { Resolver } from "react-hook-form";

import { PAYMENT_PHASES, PAYMENT_PROPOSAL_STATUSES } from "@constants/enums";
import { yupResolver } from "@hookform/resolvers/yup";
import { IPaymentProposalPayload } from "@interfaces/payment-proposals";
import { IUploadResponse } from "@interfaces/upload";
import dayjs, { isDayjs } from "dayjs";
import { array, mixed, number, object, string } from "yup";

export const defaultValues: IPaymentProposalPayload = {
  id: "",
  document_code: "",
  code: "",
  date: dayjs().toDate(),
  store_code: "",
  reason: "",
  vendor_id: -1,
  description: "",
  total: 0,
  acceptance_id: -1,
  receipt_id: -1,
  tracking_type: PAYMENT_PHASES.SUGGEST,
  status: PAYMENT_PROPOSAL_STATUSES.SUGGEST,
  documents: [],
  assets: [],
};

export const resolver: Resolver<IPaymentProposalPayload> = yupResolver(
  object({
    id: string().optional(),
    document_code: string().optional(),
    code: string().optional(),
    date: mixed<Date | string>()
      .required()
      .test("date-valid", "", (value) => {
        return (
          typeof value === "string" || value instanceof Date || isDayjs(value)
        );
      }),
    store_code: string().required(),
    reason: string().required(),
    vendor_id: number().notOneOf([-1]).required(),
    description: string().required(),
    total: number().required(),
    acceptance_id: number().optional().nullable(),
    receipt_id: number().optional().nullable(),
    status: number().required(),
    tracking_type: number().required(),
    documents: mixed<number[] | IUploadResponse[]>().required(),
    assets: array()
      .of(
        object({
          name: string().required(),
          category_id: number().notOneOf([-1]).required(),
          price: number().required(),
          code: string().optional().nullable(),
          unit: string().required(),
          quantity: number().min(1).required(),
          total: number().required(),
          description: string().required(),
        })
      )
      .min(1)
      .required(),
  })
);
