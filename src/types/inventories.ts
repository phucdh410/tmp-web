import { STOCKTAKE_QUALITIES } from "@constants/enums";

import { ICommonObjectValue } from "./commons";
import { IBasePaginationParams } from "./request";

//note: PHIẾU KIỂM KÊ
export interface IInventory {
  id: number;
  code: string;
  date: string | Date;
  store: ICommonObjectValue;
  user: { id: number; fullname: string };
  net_asset_value: number;
  number_of_assets: number;
  note: string;
  status: any;
}

export interface IInventoryPaginationParams extends IBasePaginationParams {
  start_date?: null | string | Date;
  end_date?: null | string | Date;
  store_code?: string;
}

export interface IUserInInventoryPayload {
  name: string;
  role: string;
  represent: string;
}

export interface IMoreAssetInformationInInventoryPayload {
  stocktake_quantity: number;
  quality: STOCKTAKE_QUALITIES;
  recommend: string;
  note: string;
}

export interface IAssetInInventoryPayload
  extends IMoreAssetInformationInInventoryPayload {
  id?: number;
  region_id: number;
  region_name?: string;
  asset_id: number;
  asset_code?: string;
  asset_name?: string;
  quantity?: number;
  original_price?: number;
  depreciation_accumulation?: number;
  net_asset_value?: number;
  variance?: number;
}

export interface IInventoryPayload {
  id?: number;
  code?: string;
  stocktake_date: string | Date;
  date: string | Date;
  store_code: string;
  user_id: number;
  note?: string;
  // chon_ban_kiem_ke: boolean;
  // them_nguoi_kiem_ke_tu_lan_nhap_truoc: boolean;
  // users: IUserInInventoryPayload[];
  stocktake_assets: IAssetInInventoryPayload[];
}

export interface IInventoryDetail {
  id: number;
  code: string;
  stocktake_date: string | Date;
  date: string | Date;
  store_code: string;
  store_id: number;
  store_name: string;
  user_id: number;
  user_fullname: string;
  note: string;
  status: string;
  // chon_ban_kiem_ke: boolean;
  // them_nguoi_kiem_ke_tu_lan_nhap_truoc: boolean;
  // users: IUserInInventoryPayload[];
  stocktake_assets: IAssetInInventoryPayload[];
}
