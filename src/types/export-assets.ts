import { EXPORT_ASSET_STATUES } from "@constants/enums";

//note: XUẤT TÀI SẢN
export interface IExportAsset {
  id: number;
  code: string;
  date: string | Date;
  store_id: number;
  store_name: string;
  warehouse_id: number;
  warehouse_name: string;
  created_by: string;
  status: EXPORT_ASSET_STATUES;
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
  warehouse_id: number;
  store_code: string;
  reason: string;
  barcode: number | boolean;
  export_date: string | Date;
  asset_id: number;
  category_id: number;
  description: string;
  warranty_date: string | Date;
  warranty_duration: number;
  warranty_level: number;
  properties: number[];
  price: number;
  unit: string;
  quantity: number;
  total: number;
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
