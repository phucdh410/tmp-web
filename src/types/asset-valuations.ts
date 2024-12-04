import { ASSET_VALUATION_STATUES, WARRANTY_LEVELS } from "@constants/enums";

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
  total: number;
  accumulated_depreciation: number;
  new_depreciation_accumulation: number;
  new_remain_value: number;
  new_wear_rate: number;
  new_annual_depreciation: number;
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
  code: string;
  name: string;
  store_name: string;
  reason: string;
  warranty_date: string | Date;
  warranty_count: number;
  repair_count: number;
  bought_date: string | Date;
  category_name: string;
  vendor_name: string;
  description: string;
  warranty_duration: number;
  warranty_level: WARRANTY_LEVELS;
  properties: string[];
  repair_cost: number;
  use_date: string | Date;
  price: number;
  unit: string;
  quantity: number;
  total: number;
  depreciation_duration: number;
  depreciation_cost: number;
  model: string;
  deprecated_cost: number;
  remaining_deprecated_cost: number;
  original_values: {
    total: number;
    hao_mon_luy_ke: number;
    gia_tri_con_lai: number;
    ty_le_hao_mon: number;
    hao_mon_khau_hao: number;
    quantity: number;
  };
  deprecated_values: {
    total: number;
    hao_mon_luy_ke: number;
    gia_tri_con_lai: number;
    ty_le_hao_mon: number;
    hao_mon_khau_hao: number;
    quantity: number;
  };
}

export interface IAssetValuationDetail {
  id?: number;
  code?: string;
  ngay_lap_chung_tu: string | Date;
  ngay_dinh_gia_lai: string | Date;
  store_code: string;
  reason: string;
  note: string;
  assets: IAssetInAssetValuationPayload[];
}
