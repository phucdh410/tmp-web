import {
  IMPORT_ASSET_STATUES,
  IMPORT_ASSET_TYPES,
  WARRANTY_LEVELS,
} from "@constants/enums";

import { ICommonObjectValueParsedNumber } from "./commons";

//note: NHẬP TÀI SẢN
export interface IImportAsset {
  id: number;
  code: string;
  warehouse_id: number;
  warehouse_name: string;
  status: IMPORT_ASSET_STATUES;
  created_at: string | Date;
  import_date: string | Date;
  total: number;
  description: string;
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
  type_import: IMPORT_ASSET_TYPES;
  code?: string;
  id?: number;
  asset_name: string;
  asset_id?: number | null;
  warehouse_id: number;
  reason: string;
  warranty_date: string | Date;
  import_date: string | Date;
  category_id: number;
  vendor_id: number;
  description: string;
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
  documents: IDocumentInImportAssetPayload[];
}

export interface IDocumentInImportAssetDetail {
  code: string;
  date: string | Date;
  extension: string;
  file_name: string;
  document_id: number;
  note: string;
  original_name: string;
  url: string;
}

export interface IImportAssetDetail {
  asset_id: number | null;
  asset_name: string;
  category_id: number;
  category_name: string;
  code: string;
  created_at: string | Date;
  depreciation_cost: 2500000;
  depreciation_duration: 2;
  description: string;
  document_code: string;
  export_date: null;
  properties: ICommonObjectValueParsedNumber[];
  documents: IDocumentInImportAssetDetail[];
  id: number;
  import_date: string | Date;
  model: string;
  note: null | string;
  price: number;
  quantity: number;
  reason: string;
  status: IMPORT_ASSET_STATUES;
  total: number;
  type_import: IMPORT_ASSET_TYPES;
  unit: string;
  vendor_id: number;
  vendor_name: string;
  warehouse_id: number;
  warehouse_name: string;
  warranty_date: string | Date;
  warranty_duration: number;
  warranty_level: WARRANTY_LEVELS;
}
