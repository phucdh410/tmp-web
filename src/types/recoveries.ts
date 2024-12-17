import { ICommonObjectValue } from "./commons";
import { IDocumentInDetailResponse, IDocumentInPayload } from "./documents";
import { IBasePaginationParams } from "./request";

//note: PHIẾU THU HỒI
export interface IRecoveryPaginationParams extends IBasePaginationParams {
  start_date: string | Date;
  end_date: string | Date;
  code?: string;
}

export interface IRecovery {
  id: number;
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
  id?: number;
}

export interface IRecoveryPayload {
  code?: string;
  id?: number;
  created_date: string | Date;
  recovery_date: string | Date;
  store_code: string;
  user_id: number;
  location: string;
  note: string;
  assets: IAssetInRecoveryPayload[];
  documents: IDocumentInPayload[];
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
  documents: IDocumentInDetailResponse[];
}
