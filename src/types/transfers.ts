import { ICommonObjectValue } from "./commons";

//note: PHIẾU LUÂN CHUYỂN
export interface ITransfer {
  id: number;
  code: string;
  transfer_from: ICommonObjectValue;
  transfer_to: ICommonObjectValue;
  user_in_charge_from: ICommonObjectValue;
  user_in_charge_to: ICommonObjectValue;
  date: string | Date;
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

export interface IDocumentInTransferPayload {
  document_id: number;
  date: string | Date;
  code: string;
  note: string;
  id?: number;
  originalName?: string;
  url?: string;
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
  documents: IDocumentInTransferPayload[];
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
export interface IDetailDocumentInTransfer {
  id: number;
  document_id: number;
  date: string | Date;
  code: string;
  note: string;
  original_name: string;
  url: string;
  extension: string;
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
  documents: IDetailDocumentInTransfer[];
}
