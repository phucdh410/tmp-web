import { Resolver } from "react-hook-form";

import { PAYMENT_PHASES, PAYMENT_PROPOSAL_STATUSES } from "@constants/enums";
import { yupResolver } from "@hookform/resolvers/yup";
import { IPaymentProposalPayload } from "@interfaces/payment-proposals";
import dayjs, { isDayjs } from "dayjs";
import { mixed, number, object, string } from "yup";

export const defaultValues: IPaymentProposalPayload = {
  so_phieu_de_xuat_mua_hang: "",
  so_ct_thanh_toan: "",
  ngay_de_xuat_thanh_toan: dayjs().toDate(),
  name: "",
  store_code: "",
  reason: "",
  category_id: -1,
  vendor_id: -1,
  note: "",
  price: 0,
  unit: "",
  quantity: 1,
  amount: 0,
  giai_doan: PAYMENT_PHASES.SUGGEST,
  status: PAYMENT_PROPOSAL_STATUSES.SUGGEST,
};

export const resolver: Resolver<IPaymentProposalPayload> = yupResolver(
  object({
    so_phieu_de_xuat_mua_hang: string().optional(),
    so_ct_thanh_toan: string().optional(),
    id: string().optional(),
    name: string().required(),
    ngay_de_xuat_thanh_toan: mixed<Date | string>()
      .required()
      .test("date-valid", "", (value) => {
        return (
          typeof value === "string" || value instanceof Date || isDayjs(value)
        );
      }),
    store_code: string().required(),
    reason: string().required(),
    category_id: number().notOneOf([-1]).required(),
    vendor_id: number().notOneOf([-1]).required(),
    note: string().required(),
    price: number().required(),
    unit: string().required(),
    quantity: number().required(),
    amount: number().required(),
    giai_doan: number().required(),
    status: number().required(),
  })
);
