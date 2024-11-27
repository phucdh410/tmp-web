import { STOCKTAKE_QUALITIES } from "@constants/enums";

import { ICommonObjectValue } from "./commons";

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
  region_id: number;
  asset_id: number;
  asset_code?: string;
  asset_name?: string;
  region_name?: string;
  quantity?: number;
  original_price?: number;
  depreciation_accumulation?: number;
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
  user_id: number;
  note: string;
  status: string;
  // chon_ban_kiem_ke: boolean;
  // them_nguoi_kiem_ke_tu_lan_nhap_truoc: boolean;
  // users: IUserInInventoryPayload[];
  stocktake_assets: IAssetInInventoryPayload[];
}
