import { PAYMENT_PHASES, PAYMENT_PROPOSAL_STATUSES } from "@constants/enums";

import { IBasePaginationParams } from "./request";
import { IUploadResponse } from "./upload";

//note: PHIẾU ĐỀ XUẤT THANH TOÁN
export interface IPaymentProposal {
  id: number;
  code: string;
  document_code: string;
  acceptance_id: number;
  acceptance_code: string;
  receipt_id: number;
  receipt_code: string;
  date: string | Date;
  total: number;
  description: string;
  user_code: string;
  user_fullname: string;
  tracking_type: PAYMENT_PHASES;
  status: PAYMENT_PROPOSAL_STATUSES;
}

export interface IPaymentProposalPaginationParams
  extends IBasePaginationParams {
  code?: string;
  store_code?: string;
  status?: "" | PAYMENT_PROPOSAL_STATUSES;
  // suggest_date?: null | string | Date;
  start_date?: null | string | Date;
  end_date?: null | string | Date;
}

export interface IAssetInPaymentProposalPayload {
  name: string;
  code?: string | null;
  category_id: number;
  price: number;
  unit: string;
  quantity: number;
  total: number;
  description: string;
}

export interface IPaymentProposalPayload {
  id?: number;
  document_code?: string;
  code?: string;
  date: string | Date;
  tracking_type: PAYMENT_PHASES;
  vendor_id: number;
  total: number;
  store_code: string;
  status: PAYMENT_PROPOSAL_STATUSES;
  reason: string;
  description: string;
  acceptance_id?: number | null;
  receipt_id?: number | null;
  documents: number[] | IUploadResponse[];
  assets: IAssetInPaymentProposalPayload[];
}

export interface IAssetInPaymentProposalDetail {
  id: number;
  name: string;
  code: string;
  payment_request_id: number;
  description: string;
  unit: string;
  quantity: number;
  price: number;
  total: number;
  category_id: number;
  category_name: string;
}

export interface IPaymentProposalDetail {
  id: number;
  document_code: string;
  code: string;
  date: string | Date;
  tracking_type: PAYMENT_PHASES;
  vendor_id: number;
  vendor_name: string;
  total: number;
  store_id: number;
  store_code: string;
  store_name: string;
  description: string;
  status: PAYMENT_PROPOSAL_STATUSES;
  reason: string;
  acceptance_id: number;
  acceptance_code: string;
  receipt_id: number;
  receipt_code: string;
  documents: IUploadResponse[];
  assets: IAssetInPaymentProposalDetail[];
}
