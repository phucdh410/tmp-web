import { ACCEPTANCE_STATUSES } from "@constants/enums";

//note: PHIẾU NGHIỆM THU
export interface IAcceptance {
  id: string;
  code: string;
  document_code: string;
  date: string | Date;
  proposed_type: number;
  asset_name: string;
  asset_code: string;
  quantity: number;
  suggest_by: string;
  status: ACCEPTANCE_STATUSES;
}

export interface IAssetInAcceptancePayload {
  asset_name: string;
  category_id: number;
  price: number;
  code: string;
  unit: string;
  quantity: number;
  amount: number;
  description: string;
}

export interface IAcceptancePayload {
  id?: string;
  document_code?: string;
  code?: string;
  date: string | Date;
  total: number;
  vendor_id: number;
  status: ACCEPTANCE_STATUSES;
  store_code: string;
  description: string;
  file_id: string;
  reason: string;
  assets: IAssetInAcceptancePayload[];
}

export interface IAcceptanceDetail {
  asset_name: string;
  category_id: string;
  category_name: string;
  code: string;
  date: string | Date;
  description: string;
  document_code: string;
  id: string;
  price: number;
  quantity: number;
  reason: string;
  status: number;
  store_code: string;
  store_name: string;
  total: number;
  unit: string;
  vendor_id: string;
  vendor_name: string;
}
