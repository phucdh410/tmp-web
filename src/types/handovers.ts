import { IUploadResponse } from "./upload";

//note: PHIẾU BÀN GIAO TÀI SẢN
export interface IHandover {
  id: string;
  code: string;
  date: string | Date;
  handover_user_fullname: string;
  handover_user_id: string;
  receiver_user_fullname: string;
  receiver_user_id: string;
  status: number;
}

export interface IAssetInHandoverPayload {
  asset_id: number;
  asset_name?: string;
  asset_code?: string;
  quantity: number;
  reason: string;
  description: string;
}

export interface IHandoverPayload {
  id?: string;
  document_code?: string;
  code?: string;
  date: string | Date;
  handover_user_id: number;
  receiver_user_id: number;
  documents: number[] | IUploadResponse[];
  assets: IAssetInHandoverPayload[];
}

export interface IAssetInHandoverDetail {
  id: number; //note: Api trả về string, nhưng cần dùng number (parse về number được xử lý ở file api)
  name: string;
  code: string;
  quantity: number;
  description: string;
  reason: string;
}

export interface IHandoverDetail {
  id: number; //note: Api trả về string, nhưng cần dùng number (parse về number được xử lý ở file api)
  code: string;
  document_code: string;
  date: string | Date;
  handover_user_fullname: string;
  handover_user_id: number; //note: Api trả về string, nhưng cần dùng number (parse về number được xử lý ở file api)
  receiver_user_fullname: string;
  receiver_user_id: number; //note: Api trả về string, nhưng cần dùng number (parse về number được xử lý ở file api)
  status: number;
  documents: IUploadResponse[];
  assets: IAssetInHandoverDetail[];
}
