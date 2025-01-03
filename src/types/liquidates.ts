import { ICommonObjectValue } from "./commons";
import { IDocumentInDetailResponse, IDocumentInPayload } from "./documents";
import { IBasePaginationParams } from "./request";

//note: PHIẾU THANH LÝ
export interface ILiquidate {
  id: number;
  code: string;
  store: ICommonObjectValue;
  user: ICommonObjectValue;
  created_date: string | Date;
  liquidation_date: string | Date;
  note: string;
  sum_of_amount: number;
  sum_of_depreciation_amount: number;
  sum_of_liquidation_amount: number;
  approvals: [];
  progress_status: number;
  documents: {
    document_id: number;
    date: string | Date;
    code: string;
    note: string;
  }[];
}

export interface ILiquidatePaginationParams extends IBasePaginationParams {
  start_date: string | Date;
  end_date: string | Date;
  code?: string;
}

export interface IAssetInLiquidatePayload {
  code: string;
  quantity: number;
  id?: number;
  region_id?: number;
}

export interface ILiquidatePayload {
  code?: string;
  id?: number;
  created_date: string | Date;
  liquidate_date: string | Date;
  store_code: string;
  user_id: number;
  note: string;
  assets: IAssetInLiquidatePayload[];
  documents: IDocumentInPayload[];
}

export interface IDetailAssetInLiquidate {
  id: number;
  code: string;
  name: string;
  quantity: number;
  original_price: number;
  depreciation_amount: number;
  depreciation_duration: number;
}

export interface ILiquidateDetail {
  id: number;
  code: string;
  created_date: string | Date;
  liquidate_date: string | Date;
  category: boolean;
  liquidate_from: ICommonObjectValue;
  liquidate_to: ICommonObjectValue;
  user_in_charge_from: ICommonObjectValue;
  user_in_charge_to: ICommonObjectValue;
  note: string;
  sum_of_depreciation_amount: number;
  sum_of_amount: number;
  approved_status: boolean;
  assets: IDetailAssetInLiquidate[];
  documents: IDocumentInDetailResponse[];
}
