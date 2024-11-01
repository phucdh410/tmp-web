//note: NHẬP TÀI SẢN
export interface IImportAsset {
  id: string;
  code: string;
  store_name: string;
  status: number;
  created_date: string | Date;
  date: string | Date;
  total: number;
  note: string;
}

export interface IDocumentInImportAssetPayload {
  document_id: number;
  date: string | Date;
  code: string;
  note: string;
  original_name?: string;
  id?: number;
  url?: string;
}

export interface IImportAssetPayload {
  type: string;
  code?: string;
  id?: string;
  name: string;
  store_code: string;
  reason: string;
  warranty_date: string | Date;
  date: string | Date;
  category_id: number;
  vendor_id: number;
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
  documents: IDocumentInImportAssetPayload[];
}

export interface IImportAssetDetail {
  id: string;
  code: string;
  store_name: string;
  status: number;
  created_date: string | Date;
  date: string | Date;
  total: number;
  note: string;
}