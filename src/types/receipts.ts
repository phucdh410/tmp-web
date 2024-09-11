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

export interface IReceiptPayload {
  code?: string;
  id?: string;
  name: string;
  store_code: string;
  reason: string;
  ngay_bao_hanh: Date | string;
  barcode: boolean | 0 | 1;
  loai_ccdc: string[];
  nha_cung_cap: string;
  description: string;
  bao_hanh_number: number;
  bao_hanh_level: number;
  thuoc_tinh: string[];
  price: number;
  unit: string;
  quantity: number;
  amount: number;
  so_ky_phan_bo: number;
  so_tien_phan_bo: number;
  so_hieu: string;
  tach_rieng_ma: boolean;
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
