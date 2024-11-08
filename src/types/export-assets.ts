//note: XUẤT TÀI SẢN
export interface IExportAsset {
  id: number;
  code: string;
  ngay_xuat_tai_san: string | Date;
  ngay_giao_tai_san: string | Date;
  from_store_code: string;
  from_store_name: string;
  to_store_code: string;
  to_store_name: string;
  created_by: string;
  type: string;
  status: number;
}

export interface IDocumentInExportAssetPayload {
  document_id: number;
  date: string | Date;
  code: string;
  note: string;
  original_name?: string;
  id?: number;
  url?: string;
}

export interface IExportAssetPayload {
  code?: string;
  id?: number;
  from_store_code: string;
  to_store_code: string;
  reason: string;
  warranty_date: string | Date;
  barcode: number | boolean;
  date: string | Date;
  asset_id: number;
  description: string;
  warranty_duration: number;
  warranty_level: number;
  properties: number[];
  price: number;
  unit: string;
  quantity: number;
  amount: number;
  depreciation_duration: number;
  depreciation_cost: number;
  model: string;
  document_code: string;
  documents: IDocumentInExportAssetPayload[];
}

export interface IExportAssetDetail {
  id: number;
  code: string;
  store_name: string;
  status: number;
  created_date: string | Date;
  date: string | Date;
  total: number;
  note: string;
}
