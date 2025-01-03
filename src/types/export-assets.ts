import { EXPORT_ASSET_STATUES } from "@constants/enums";

import { ICommonObjectValue } from "./commons";
import { IDocumentInDetailResponse, IDocumentInPayload } from "./documents";
import { IBasePaginationParams } from "./request";

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

export interface IExportAssetPaginationParams extends IBasePaginationParams {
  code?: string;
  warehouse_id?: "" | number;
  status?: "" | EXPORT_ASSET_STATUES;
  start_date?: null | string | Date;
  end_date?: null | string | Date;
  date?: null | string | Date;
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
  documents: IDocumentInPayload[];
}

export interface IExportAssetDetail {
  asset_code: string;
  asset_id: number;
  category_id: number;
  category_name: string;
  asset_name: string;
  barcode: boolean;
  code: string;
  quantity: number;
  depreciation_cost: number;
  depreciation_duration: number;
  description: string;
  document_code: string;
  export_date: string | Date;
  id: number;
  model: string;
  price: number;
  reason: string;
  store_id: number;
  store_code: string;
  store_name: string;
  total: number;
  unit: string;
  warehouse_name: string;
  warehouse_id: number;
  warranty_date: string | Date;
  warranty_level: number;
  warranty_duration: number;
  properties: ICommonObjectValue[];
  documents: IDocumentInDetailResponse[];
}
