import { ASSET_VALUATION_STATUES } from "@constants/enums";

//note: ĐỊNH GIÁ TÀI SẢN
export interface IAssetValuation {
  id: number;
  code: string;
  ngay_lap_chung_tu: string | Date;
  ngay_dinh_gia_tai_san: string | Date;
  store_code: string;
  store_name: string;
  price: number;
  gia_tri_da_khau_hao: number;
  gia_tri_dinh_gia: number;
  status: ASSET_VALUATION_STATUES;
}

export interface IAssetInAssetValuationPayload {
  code: string;
  name: string;
  dinh_gia_tai_san: number;
  note: string;
}

export interface IAssetValuationPayload {
  id?: number;
  code?: string;
  ngay_lap_chung_tu: string | Date;
  ngay_dinh_gia_lai: string | Date;
  store_code: string;
  reason: string;
  note: string;
  assets: IAssetInAssetValuationPayload[];
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
