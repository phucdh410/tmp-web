import { HANDOVER_STATUSES } from "@constants/enums";

import { ICommonObjectValue } from "./commons";
import { IUploadResponse } from "./upload";

//note: PHIẾU BÀN GIAO TÀI SẢN
export interface IHandover {
  id: string;
  code: string;
  document_code: string;
  handover_user: ICommonObjectValue;
  receiver_user: ICommonObjectValue;
  reason: string;
  status: HANDOVER_STATUSES;
  store: ICommonObjectValue;
}

export interface IAssetInHandoverPayload {
  asset_id: number;
  asset_name?: string;
  asset_code?: string;
  quantity: number;
  description: string;
}

export interface IHandoverPayload {
  id?: string;
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
  id: number; //note: Api trả về string, nhưng cần dùng number (parse về number được xử lý ở file api)
  asset_approval: boolean;
  asset_id: number; //note: Api trả về string, nhưng cần dùng number (parse về number được xử lý ở file api)
  asset_name: string;
  quantity: number;
  description: string;
  receiver_store_approval: boolean;
  sender_store_approval: boolean;
}

export interface IHandoverDetail {
  id: number; //note: Api trả về string, nhưng cần dùng number (parse về number được xử lý ở file api)
  code: string;
  document_code: string;
  date: string | Date;
  reason: string;
  status: HANDOVER_STATUSES;
  handover_user: ICommonObjectValue;
  receiver_user: ICommonObjectValue;
  receiver_store_note: any;
  sender_store_note: any;
  store: ICommonObjectValue;
  documents: IUploadResponse[];
  assets: IAssetInHandoverDetail[];
}
