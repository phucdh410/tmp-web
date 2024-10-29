import { Resolver } from "react-hook-form";

import { PAYMENT_PHASES, PAYMENT_PROPOSAL_STATUSES } from "@constants/enums";
import { yupResolver } from "@hookform/resolvers/yup";
import { IPaymentProposalPayload } from "@interfaces/payment-proposals";
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
  so_phieu_bbnt: "",
  so_phieu_ghi_tang: "",
  stage: PAYMENT_PHASES.SUGGEST,
  status: PAYMENT_PROPOSAL_STATUSES.SUGGEST,
  file_id: "",
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
    so_phieu_bbnt: string().optional(),
    so_phieu_ghi_tang: string().optional(),
    status: number().required(),
    stage: number().required(),
    file_id: string().required(),
    assets: array()
      .of(
        object({
          asset_name: string().required(),
          category_id: number().notOneOf([-1]).required(),
          price: number().required(),
          code: string().required(),
          unit: string().required(),
          quantity: number().min(1).required(),
          amount: number().required(),
          description: string().required(),
        })
      )
      .min(1)
      .required(),
  })
);
