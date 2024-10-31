import { PAYMENT_PHASES, PAYMENT_PROPOSAL_STATUSES } from "@constants/enums";

import { IUploadResponse } from "./upload";

//note: PHIẾU ĐỀ XUẤT THANH TOÁN
export interface IPaymentProposal {
  id: string;
  code: string;
  document_code: string;
  acceptance_id: string;
  acceptance_code: string;
  receipt_id: string;
  receipt_code: string;
  date: string | Date;
  total: number;
  description: string;
  user_code: string;
  user_fullname: string;
  tracking_type: PAYMENT_PHASES;
  status: PAYMENT_PROPOSAL_STATUSES;
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
  id?: string;
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
  id: number; //note: Api trả về string, nhưng cần dùng number (parse về number được xử lý ở file api)
  name: string;
  code: string;
  payment_request_id: number; //note: Api trả về string, nhưng cần dùng number (parse về number được xử lý ở file api)
  description: string;
  unit: string;
  quantity: number;
  price: number;
  total: number;
  category_id: number; //note: Api trả về string, nhưng cần dùng number (parse về number được xử lý ở file api)
  category_name: string;
}

export interface IPaymentProposalDetail {
  id: string;
  document_code: string;
  code: string;
  date: string | Date;
  tracking_type: PAYMENT_PHASES;
  vendor_id: number; //note: Api trả về string, nhưng cần dùng number (parse về number được xử lý ở file api)
  vendor_name: string;
  total: number;
  store_id: number; //note: Api trả về string, nhưng cần dùng number (parse về number được xử lý ở file api)
  store_code: string;
  store_name: string;
  description: string;
  status: PAYMENT_PROPOSAL_STATUSES;
  reason: string;
  acceptance_id: number; //note: Api trả về string, nhưng cần dùng number (parse về number được xử lý ở file api)
  acceptance_code: string;
  receipt_id: number; //note: Api trả về string, nhưng cần dùng number (parse về number được xử lý ở file api)
  receipt_code: string;
  documents: IUploadResponse[];
  assets: IAssetInPaymentProposalDetail[];
}
