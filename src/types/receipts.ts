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
  region_id: string;
  quantity: number;
  location: string;
}

export interface IDocumentInReceiptPayload {
  document_id: string;
  date: string | Date;
  code: string;
  note: string;
}

export interface IReceiptPayload {
  code?: string;
  id?: string;
  name: string;
  store_code: string;
  reason: string;
  barcode: boolean | 0 | 1;
  category_id: string;
  vendor_id: string;
  note: string;
  warranty_date: Date | string;
  warranty_duration: number;
  warranty_level: number;
  properties: string[];
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
