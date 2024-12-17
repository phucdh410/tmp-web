import { ICommonObjectValue } from "./commons";
import { IBasePaginationParams } from "./request";

//note: TÀI SẢN & CÔNG CỤ DỤNG CỤ
export interface IAsset {
  amount: number;
  category: ICommonObjectValue;
  category_id: number;
  category_name: string;
  code: string;
  date: string | Date;
  depreciation_accumulation: number;
  depreciation_cost: number;
  depreciation_duration: number;
  id: number;
  issue_quantity: number;
  name: string;
  original_price: number;
  price: number;
  quantity: number;
  reason: string;
  remain_depreciation_duration: number;
  remain_quantity: number;
  store: ICommonObjectValue;
  store_id: number;
  store_name: string;
  total: number;
  unit: string;
}

export interface IAssetPaginationParams extends IBasePaginationParams {
  start_at?: string | Date;
  end_at?: string | Date;
  store_code?: string;
  place_id?: number | "";
  region_id?: number | "";
  code?: string;
  category_id?: number | "";
  date?: string | Date;
  price?: number;
  reason?: string;
  amount?: number;
  quantity?: number;
  unit?: string;
  barcode?: string | number;
}

export interface IAssetCodeParams {
  includes: "" | number[];
  store_code?: string;
  region_id?: number | string;
}

export interface IAssetCode {
  barcode: string;
  qrcode: string;
  id: number;
  code: string;
  receipt_id: number;
}

export interface IAssetInAll {
  code: string;
  id: number;
  name: string;
  region_id: number;
  region_name: string;
  unit: string;
  depreciation_amount: number;
  original_price: number;
  quantity: number;
}

export interface IAssetDetail {
  id: number;
  name: string;
  code: string;
  date: string | Date;
  amount: number;
  category: ICommonObjectValue;
  original_price: number;
  price: number;
  quantity: number;
  issue_quantity: number;
  depreciation_accumulation: number;
  depreciation_cost: number;
  depreciation_duration: number;
  remain_depreciation_duration: number;
  remain_quantity: number;
  reason: string;
  region: ICommonObjectValue;
  store: ICommonObjectValue;
  total: number;
  unit: string;
  warranty_begin_date: string | Date;
  warranty_duration: number;
  warranty_level: number;
}

export interface IAssetFromWarehouse extends ICommonObjectValue {}
