import { ICommonObjectValue } from "./commons";

export interface IAsset {
  id: number | string;
  code: string;
  name: string;
  category: ICommonObjectValue;
  category_name: string;
  store: ICommonObjectValue;
  store_name: string;
  unit: string;
  date: string | Date;
  reason: string;
  depreciation_duration: number;
  remain_depreciation_duration: number;
  deprecation_cost: number;
  quantity: number;
  remain_quantity: number;
  price: number;
  amount: number;
  total: number;
}

export interface IAssetCodeParams {
  includes: "" | string[];
}

export interface IAssetCode {
  barcode: string;
  qrcode: string;
  id: string;
  code: string;
  receipt_id: string;
}
