import { ACCEPTANCE_STATUSES } from "@constants/enums";

import { IBasePaginationParams } from "./request";
import { IUploadResponse } from "./upload";

//note: PHIẾU NGHIỆM THU
export interface IAcceptance {
  id: number;
  code: string;
  document_code: string;
  date: string | Date;
  description: string;
  store_code: string;
  store_id: number;
  store_name: string;
  total: number;
  vendor_id: number;
  vendor_name: string;
  status: ACCEPTANCE_STATUSES;
}

export interface IAcceptancePaginationParams extends IBasePaginationParams {
  code?: string;
  store_code?: string;
  status?: "" | ACCEPTANCE_STATUSES;
  start_date?: null | string | Date;
  end_date?: null | string | Date;
}

export interface IAssetInAcceptancePayload {
  name: string;
  category_id: number;
  price: number;
  code?: string;
  unit: string;
  quantity: number;
  total: number;
  description: string;
}

export interface IAcceptancePayload {
  id?: number;
  document_code: string;
  code?: string;
  date: string | Date;
  total: number;
  vendor_id: number;
  status: ACCEPTANCE_STATUSES;
  store_code: string;
  description: string;
  documents: number[] | IUploadResponse[];
  reason: string;
  assets: IAssetInAcceptancePayload[];
}

export interface IAssetInAcceptanceDetail {
  acceptance_id: number;
  category_id: number;
  category_name: string;
  code: string;
  description: string;
  id: number;
  name: string;
  price: number;
  quantity: number;
  total: number;
  unit: string;
}

export interface IAcceptanceDetail {
  code: string;
  date: string | Date;
  description: string;
  document_code: string;
  documents: IUploadResponse[];
  id: number;
  status: ACCEPTANCE_STATUSES;
  reason: string;
  store_code: string;
  store_name: string;
  store_id: number;
  total: number;
  vendor_id: number;
  vendor_name: string;
  assets: IAssetInAcceptanceDetail[];
}
