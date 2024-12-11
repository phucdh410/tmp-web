import { Resolver } from "react-hook-form";

import { PAYMENT_PHASES, PAYMENT_PROPOSAL_STATUSES } from "@constants/enums";
import { yupResolver } from "@hookform/resolvers/yup";
import { IPaymentProposalPayload } from "@interfaces/payment-proposals";
import { IUploadResponse } from "@interfaces/upload";
import {
  dateSchema,
  numberOptionalSchema,
  numberSchema,
  selectIdSchema,
  stringOptionalSchema,
  stringSchema,
} from "@utils/validation";
import dayjs from "dayjs";
import { array, mixed, number, object } from "yup";

export const defaultValues: IPaymentProposalPayload = {
  id: undefined,
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
    id: numberOptionalSchema,
    document_code: stringOptionalSchema,
    code: stringOptionalSchema,
    date: dateSchema,
    store_code: stringSchema,
    reason: stringSchema,
    vendor_id: selectIdSchema,
    description: stringSchema,
    total: numberSchema,
    acceptance_id: numberOptionalSchema.nullable(),
    receipt_id: numberOptionalSchema.nullable(),
    status: numberSchema,
    tracking_type: numberSchema,
    documents: mixed<number[] | IUploadResponse[]>().required(),
    assets: array()
      .of(
        object({
          name: stringSchema,
          category_id: selectIdSchema,
          price: numberSchema,
          code: stringOptionalSchema.nullable(),
          unit: stringSchema,
          quantity: number().min(1).required(),
          total: numberSchema,
          description: stringSchema,
        })
      )
      .min(1)
      .required(),
  })
);
