import { HANDOVER_PHASES, HANDOVER_STATUSES } from "@constants/enums";

import { ICommonObjectValue } from "./commons";
import { IBasePaginationParams } from "./request";
import { IUploadResponse } from "./upload";

//note: PHIẾU BÀN GIAO TÀI SẢN
export interface IHandover {
  id: number;
  code: string;
  document_code: string;
  date: string | Date;
  handover_user: ICommonObjectValue;
  receiver_user: ICommonObjectValue;
  reason: string;
  status: HANDOVER_STATUSES;
  store: ICommonObjectValue;
}

export interface IHandoverPaginationParams extends IBasePaginationParams {
  code?: string;
  store_code?: string;
  status?: "" | HANDOVER_STATUSES;
  start_date?: null | string | Date;
  end_date?: null | string | Date;
}

export interface IAssetInHandoverPayload {
  asset_id?: number;
  asset_name?: string;
  asset_code?: string;
  quantity: number;
  description: string;
}

export interface IHandoverPayload {
  id?: number;
  document_code?: string;
  code?: string;
  date: string | Date;
  reason: string;
  handover_user: string;
  receiver_user: string;
  documents: number[] | IUploadResponse[];
  assets: IAssetInHandoverPayload[];
}

export interface IAssetInHandoverDetail {
  id: number;
  asset_id: number;
  asset_name: string;
  quantity: number;
  description: string;
  receiver_store_approval: boolean | null;
  sender_store_approval: boolean | null;
  asset_approval: boolean | null;
}

export interface IHandoverDetail {
  id: number;
  code: string;
  document_code: string;
  date: string | Date;
  reason: string;
  status: HANDOVER_STATUSES;
  handover_user: ICommonObjectValue;
  receiver_user: ICommonObjectValue;
  receiver_store_note: string;
  sender_store_note: string;
  asset_note: string;
  store: ICommonObjectValue;
  documents: IUploadResponse[];
  assets: IAssetInHandoverDetail[];
  tracking_type: HANDOVER_PHASES;
}

export interface IApproveHandoverPayload {
  tracking_type: HANDOVER_PHASES;
  receiver_store_note: string;
  asset_note: string;
  approval?: boolean;
}
