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

export interface IAcceptancePayload {
  id?: string;
  document_code?: string;
  code?: string;
  date: string | Date;
  asset_name: string;
  category_id: number;
  price: number;
  store_code: string;
  vendor_id: number;
  unit: string;
  quantity: number;
  reason: string;
  description: string;
  total: number;
  status: ACCEPTANCE_STATUSES;
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
