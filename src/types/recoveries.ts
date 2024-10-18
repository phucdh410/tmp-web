import { ICommonObjectValue } from "./commons";

//note: PHIẾU THU HỒI
export interface IRecovery {
  id: string;
  code: string;
  store: ICommonObjectValue;
  user: ICommonObjectValue;
  created_date: string | Date;
  recovery_date: string | Date;
  location: string;
  note: string;
  approved_status: number;
  progress_status: number;
}

export interface IAssetInRecoveryPayload {
  code: string;
  quantity: number;
  id?: string | number;
}

export interface IDocumentInRecoveryPayload {
  document_id: string | number;
  date: string | Date;
  code: string;
  note: string;
  id?: string | number;
  originalName?: string;
  url?: string;
}

export interface IRecoveryPayload {
  code?: string;
  id?: string;
  created_date: string | Date;
  recovery_date: string | Date;
  store_code: string;
  user_id: string;
  location: string;
  note: string;
  assets: IAssetInRecoveryPayload[];
  documents: IDocumentInRecoveryPayload[];
}

export interface IDetailAssetInRecovery {
  id: number;
  code: string;
  name: string;
  quantity: number;
  original_price: number;
  depreciation_amount: number;
  depreciation_duration: number;
}
export interface IDetailDocumentInRecovery {
  id: number;
  document_id: number;
  date: string | Date;
  code: string;
  note: string;
  original_name: string;
  url: string;
  extension: string;
}

export interface IRecoveryDetail {
  id: number;
  code: string;
  created_date: string | Date;
  recovery_date: string | Date;
  category: boolean;
  recovery_from: ICommonObjectValue;
  recovery_to: ICommonObjectValue;
  user_in_charge_from: ICommonObjectValue;
  user_in_charge_to: ICommonObjectValue;
  note: string;
  sum_of_depreciation_amount: number;
  sum_of_amount: number;
  approved_status: boolean;
  assets: IDetailAssetInRecovery[];
  documents: IDetailDocumentInRecovery[];
}
