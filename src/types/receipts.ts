import { ICommonObjectValue } from "./commons";

//note: PHIẾU GHI TĂNG
export interface IReceipt {
  id: number;
  code: string;
  name: string;
  store_name: string;
  category_name: string;
  date: string | Date;
  price: number;
  unit: string;
  quantity: number;
  amount: number;
  depreciation_duration: number;
  depreciation_date?: string | Date;
  depreciation_cost: number;
  model?: any;
  warranty_date?: string | Date;
  warranty_duration: number;
  warranty_level: number;
  barcode: boolean;
  split_code: boolean;
  reason: string;
  note: string;
  deprecated: boolean;
  parent_id: number;
  properties: any[];
  regions: any[];
  documents: any[];
}

export interface IRegionInReceiptPayload {
  region_id: number;
  quantity: number;
  location: string;
  id?: number;
}

export interface IDocumentInReceiptPayload {
  document_id: number;
  date: string | Date;
  code: string;
  note: string;
  originalName?: string;
  id?: number;
  url?: string;
}

export interface IReceiptPayload {
  code?: string;
  id?: number;
  name: string;
  date: Date | string;
  store_code: string;
  reason: string;
  barcode: number | boolean;
  category_id: number;
  vendor_id: number;
  note: string;
  warranty_date: Date | string;
  warranty_duration: number;
  warranty_level: number;
  properties: number[];
  price: number;
  unit: string;
  quantity: number;
  amount: number;
  depreciation_date: string | Date;
  depreciation_duration: number;
  depreciation_cost: number;
  model: string;
  split_code: boolean;
  regions: IRegionInReceiptPayload[];
  documents: IDocumentInReceiptPayload[];
}

export interface IReceiptCode {
  barcode: string;
  qrcode: string;
  id: number;
  code: string;
  receipt_id: number;
}

export interface IReceiptCodeParams {
  includes: "" | string[];
}

export interface IDetailRegionInReceipt {
  id: number;
  region_id: number;
  region_code: string;
  region_name: string;
  code: string;
  location: string;
  quantity: number;
  price: number;
  amount: number;
}

export interface IDetailDocumentInReceipt {
  id: number;
  document_id: number;
  date: string | Date;
  code: string;
  note: string;
  original_name: string;
  url: string;
  extension: string;
}

export interface IReceiptDetail {
  amount: number;
  barcode: boolean;
  category: ICommonObjectValue;
  code: string;
  date: string | Date;
  deprecated: boolean;
  depreciation_cost: number;
  depreciation_date: string | Date;
  depreciation_duration: number;
  documents: IDetailDocumentInReceipt[];
  id: number;
  model: string;
  name: string;
  note: string;
  parent_id: number;
  price: number;
  properties: ICommonObjectValue[];
  quantity: number;
  reason: string;
  regions: IDetailRegionInReceipt[];
  split_code: boolean;
  store: ICommonObjectValue;
  unit: string;
  vendor: ICommonObjectValue;
  warranty_date: string | Date;
  warranty_duration: number;
  warranty_level: number;
}

export interface IReceiptUploadResponse {
  extension: string;
  id: number;
  originalName: string;
  url: string;
}
