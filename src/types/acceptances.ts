import { ACCEPTANCE_STATUSES } from "@constants/enums";

import { IUploadResponse } from "./upload";

//note: PHIẾU NGHIỆM THU
export interface IAcceptance {
  id: string;
  code: string;
  document_code: string;
  date: string | Date;
  description: string;
  store_code: string;
  store_id: string;
  store_name: string;
  total: number;
  vendor_id: string;
  vendor_name: string;
  status: ACCEPTANCE_STATUSES;
}

export interface IAssetInAcceptancePayload {
  name: string;
  category_id: number;
  price: number;
  code: string;
  unit: string;
  quantity: number;
  total: number;
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
  documents: number[] | IUploadResponse[];
  reason: string;
  assets: IAssetInAcceptancePayload[];
}

export interface IAssetInAcceptanceDetail {
  acceptance_id: string;
  category_id: number; //note: Api trả về string, nhưng cần dùng number (parse về number được xử lý ở file api)
  category_name: string;
  code: string;
  description: string;
  id: number; //note: Api trả về string, nhưng cần dùng number (parse về number được xử lý ở file api)
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
  id: number; //note: Api trả về string, nhưng cần dùng number (parse về number được xử lý ở file api)
  status: ACCEPTANCE_STATUSES;
  reason: string;
  store_code: string;
  store_name: string;
  store_id: number; //note: Api trả về string, nhưng cần dùng number (parse về number được xử lý ở file api)
  total: number;
  vendor_id: number; //note: Api trả về string, nhưng cần dùng number (parse về number được xử lý ở file api)
  vendor_name: string;
  assets: IAssetInAcceptanceDetail[];
}
