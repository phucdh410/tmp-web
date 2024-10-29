import { ICommonObjectValue } from "./commons";

//note: PHIẾU GHI TĂNG
export interface IReceipt {
  id: string;
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
  parent_id: string;
  properties: any[];
  regions: any[];
  documents: any[];
}

export interface IRegionInReceiptPayload {
  region_id: string | number;
  quantity: number;
  location: string;
  id?: string | number;
}

export interface IDocumentInReceiptPayload {
  document_id: string | number;
  date: string | Date;
  code: string;
  note: string;
  originalName?: string;
  id?: string | number;
  url?: string;
}

export interface IReceiptPayload {
  code?: string;
  id?: string;
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
  id: string;
  code: string;
  receipt_id: string;
}

export interface IReceiptCodeParams {
  includes: "" | string[];
}

export interface IDetailRegionInReceipt {
  id: string;
  region_id: string;
  region_code: string;
  region_name: string;
  code: string;
  location: string;
  quantity: number;
  price: number;
  amount: number;
}

export interface IDetailDocumentInReceipt {
  id: string;
  document_id: string;
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
  id: string;
  model: string;
  name: string;
  note: string;
  parent_id: string;
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
  id: string;
  originalName: string;
  url: string;
}
