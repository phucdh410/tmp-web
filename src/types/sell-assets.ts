import { SELL_ASSET_STATUES, WARRANTY_LEVELS } from "@constants/enums";

//note: BÁN TÀI SẢN
export interface ISellAsset {
  id: number;
  code: string;
  ngay_lap_chung_tu: string | Date;
  ngay_giao_hang: string | Date;
  warehouse_name: string;
  khach_hang_mua: string;
  tong_gia_tri_mua: number;
  quantity: number;
  status: SELL_ASSET_STATUES;
}

export interface IAssetInSellAssetPayload {
  id?: number;
  category_name?: string;
  category_id: number;
  name: string;
  properties: number[];
  gia_ban: number;
  gia_nhap: number;
  unit: string;
  quantity: number;
  warranty_date: string | Date;
  warranty_level: WARRANTY_LEVELS;
  warranty_duration: number;
  total: number;
  description: string;
}

export interface ISellAssetPayload {
  id?: number;
  code?: string;
  ngay_lap_chung_tu: string | Date;
  ngay_giao_hang: string | Date;
  warehouse_id: number;
  khach_hang_mua_id: number;
  address: string;
  hinh_thuc_thanh_toan: number; //TODO: hỏi chị Dịu về các giá trị này
  dich_vu_bao_hanh: number; //TODO: hỏi chị Dịu về các giá trị này
  reason: string;
  note: string;
  assets: IAssetInSellAssetPayload[];
}

export interface ISellAssetDetail {
  code?: string;
  ngay_lap_chung_tu: string | Date;
  ngay_giao_hang: string | Date;
  warehouse_id: number;
  khach_hang_mua_id: number;
  address: string;
  hinh_thuc_thanh_toan: number; //TODO: hỏi chị Dịu về các giá trị này
  dich_vu_bao_hanh: number; //TODO: hỏi chị Dịu về các giá trị này
  reason: string;
  note: string;
  assets: IAssetInSellAssetPayload[];
}
