import {
  IMPORT_ASSET_STATUES,
  IMPORT_ASSET_TYPES,
  WARRANTY_LEVELS,
} from "@constants/enums";

import { ICommonObjectValue } from "./commons";
import { IDocumentInDetailResponse, IDocumentInPayload } from "./documents";
import { IBasePaginationParams } from "./request";

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

export interface IImportAssetPaginationParams extends IBasePaginationParams {
  code?: string;
  warehouse_id?: "" | number;
  status?: "" | IMPORT_ASSET_STATUES;
  start_date?: null | string | Date;
  end_date?: null | string | Date;
  date?: null | string | Date;
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
  documents: IDocumentInPayload[];
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
  properties: ICommonObjectValue[];
  documents: IDocumentInDetailResponse[];
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
