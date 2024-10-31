import { ICommonObjectValue } from "./commons";

//note: TÀI SẢN & CÔNG CỤ DỤNG CỤ
export interface IAsset {
  amount: number;
  category: ICommonObjectValue;
  category_id: string;
  category_name: string;
  code: string;
  date: string | Date;
  depreciation_accumulation: number;
  depreciation_cost: number;
  depreciation_duration: number;
  id: string;
  issue_quantity: number;
  name: string;
  original_price: number;
  price: number;
  quantity: number;
  reason: string;
  remain_depreciation_duration: number;
  remain_quantity: number;
  store: ICommonObjectValue;
  store_id: string;
  store_name: string;
  total: number;
  unit: string;
}

export interface IAssetCodeParams {
  includes: "" | string[];
  store_code?: string;
  region_id?: string;
}

export interface IAssetCode {
  barcode: string;
  qrcode: string;
  id: string;
  code: string;
  receipt_id: string;
}

export interface IAssetInAll {
  code: string;
  id: number; //note: Api trả về string, nhưng cần dùng number (parse về number được xử lý ở file api)
  name: string;
}
