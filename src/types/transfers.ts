import { TRANSFER_TYPES } from "@constants/enums";

import { ICommonObjectValue } from "./commons";
import { IDocumentInDetailResponse, IDocumentInPayload } from "./documents";

//note: PHIẾU LUÂN CHUYỂN
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
}

export interface ITransferPayload {
  code?: string;
  id?: number;
  transfer_date: string | Date;
  transfer_from: number;
  transfer_to: number;
  user_in_charge_from: string;
  user_in_charge_to: string;
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
