import { ASSET_VALUATION_STATUES } from "@constants/enums";

import { ICommonObjectValue } from "./commons";

//note: ĐỊNH GIÁ TÀI SẢN
export interface IAssetValuation {
  id: number;
  asset_valuation_id: number;
  approval: null;
  code: string;
  date: string | Date;
  original_price: number;
  store_id: number;
  store_code: string;
  store_name: string;
  depreciation_accumulation: number;
  valuation_date: string | Date;
  valuation_value: number;
  status: ASSET_VALUATION_STATUES;
}

export interface IAssetInAssetValuationPayload {
  asset_id: number;
  valuation_value: number;
  valuation_note: string;
  name?: string;
  code?: string;
}

export interface IAssetValuationPayload {
  id?: number;
  code?: string;
  date: string | Date;
  valuation_date: string | Date;
  store_code: string;
  reason: string;
  content: string;
  assets: IAssetInAssetValuationPayload[];
}

export interface IAssetInformation {
  id: number;
  code: string;
  name: string;
  category: ICommonObjectValue;
  region: ICommonObjectValue;
  store: ICommonObjectValue;
  unit: string;
  date: string | Date;
  reason: string;
  depreciation_duration: number;
  depreciation_accumulation: number;
  remain_depreciation_duration: number;
  depreciation_cost: number;
  quantity: number;
  remain_quantity: number;
  issue_quantity: number;
  original_price: number;
  price: number;
  amount: number;
  warranty_begin_date: string | Date;
  warranty_duration: number;
  warranty_level: number;
  total: number;
  valuation_value: number;
  valuation_note: string;
  detail: {
    total: number;
    depreciation_accumulation: number;
    remain_value: number;
    new_depreciation_accumulation: number;
    old_depreciation_accumulation: number;
    new_remain_value: number;
    old_remain_value: number;
    new_wear_rate: number;
    old_wear_rate: number;
    new_annual_depreciation: number;
    old_annual_depreciation: number;
    quantity: number;
  };
}

export interface IAssetInAssetValuationDetail {
  asset_id: number;
  code: string;
  name: string;
  valuation_value: number;
  valuation_note: string;
}

export interface IAssetValuationDetail {
  id: number;
  store_id: number;
  store_code: string;
  store_name: string;
  valuation_date: string | Date;
  date: string | Date;
  status: number;
  approval: null;
  reason: string;
  content: string;
  assets: IAssetInAssetValuationDetail[];
}
