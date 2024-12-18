import { TRANSFER_TYPES } from "@constants/enums";

import { ICommonObjectValue } from "./commons";
import { IDocumentInDetailResponse, IDocumentInPayload } from "./documents";
import { IBasePaginationParams } from "./request";

//note: PHIẾU LUÂN CHUYỂN
export interface ITransferPaginationParams extends IBasePaginationParams {
  start_date: string | Date;
  end_date: string | Date;
  code?: string;
  from_store_code?: string;
  from_user?: string;
  to_store_code?: string;
  to_user?: string;
}

export interface ITransferExportParams {
  from: Date;
  to: Date;
  transfer_ids: number[];
  store_code?: string;
}

export interface ITransfer {
  id: number;
  code: string;
  category: TRANSFER_TYPES;
  transfer_from: ICommonObjectValue;
  transfer_to: ICommonObjectValue;
  user_in_charge_from: ICommonObjectValue;
  user_in_charge_to: ICommonObjectValue;
  transfer_date: string | Date;
  note: string;
  sum_of_depreciation_amount: number;
  sum_of_amount: number;
  progress_status: number;
  approvals: [];
}

export interface IAssetInTransferPayload {
  code: string;
  quantity: number;
  id?: number;
  region_id?: number;
  original_price?: number;
  remaining_original_price?: number; //F: (quantity * original_price - depreciation_accmulation) / quantity
  depreciation_duration?: number;
  depreciation_accumulation?: number;
  depreciation_amount?: number; //F: quantity * original_price - depreciation_accmulation
}

export interface ITransferPayload {
  code?: string;
  id?: number;
  created_date: string | Date;
  transfer_date: string | Date;
  transfer_from: number;
  transfer_to: number;
  user_in_charge_from: number;
  user_in_charge_to: number;
  category: number;
  note: string;
  assets: IAssetInTransferPayload[];
  documents: IDocumentInPayload[];
}

export interface IDetailAssetInTransfer {
  id: number;
  code: string;
  name: string;
  quantity: number;
  original_price: number;
  depreciation_amount: number;
  depreciation_duration: number;
}

export interface ITransferDetail {
  id: number;
  code: string;
  created_date: string | Date;
  transfer_date: string | Date;
  category: boolean;
  transfer_from: ICommonObjectValue;
  transfer_to: ICommonObjectValue;
  user_in_charge_from: ICommonObjectValue;
  user_in_charge_to: ICommonObjectValue;
  note: string;
  sum_of_depreciation_amount: number;
  sum_of_amount: number;
  approved_status: boolean;
  assets: IDetailAssetInTransfer[];
  documents: IDocumentInDetailResponse[];
}
