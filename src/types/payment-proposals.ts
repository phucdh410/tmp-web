import { PAYMENT_PHASES, PAYMENT_PROPOSAL_STATUSES } from "@constants/enums";

//note: PHIẾU ĐỀ XUẤT THANH TOÁN
export interface IPaymentProposal {
  id: string;
  code: string;
  suggest_code: string;
  suggest_date: string | Date;
  type: string;
  name: string;
  quantity: number;
  suggest_by: string;
  status: PAYMENT_PROPOSAL_STATUSES;
}

export interface IAssetInPaymentProposalPayload {
  asset_name: string;
  category_id: number;
  price: number;
  code: string;
  unit: string;
  quantity: number;
  amount: number;
  description: string;
}

export interface IPaymentProposalPayload {
  id?: string;
  document_code?: string;
  code?: string;
  date: string | Date;
  stage: PAYMENT_PHASES;
  vendor_id: number;
  total: number;
  store_code: string;
  status: PAYMENT_PROPOSAL_STATUSES;
  so_phieu_bbnt?: string;
  reason: string;
  description: string;
  so_phieu_ghi_tang?: string;
  file_id: string;
  assets: IAssetInPaymentProposalPayload[];
}
