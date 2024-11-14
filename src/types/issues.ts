import { ICommonObjectValue } from "./commons";
import { IDocumentInDetailResponse, IDocumentInPayload } from "./documents";

//note: PHIẾU GHI GIẢM
export interface IIssue {
  id: number;
  code: string;
  store: ICommonObjectValue;
  user: ICommonObjectValue;
  created_date: string | Date;
  issued_date: string | Date;
  category: ICommonObjectValue;
  note: string;
  parent_id: number;
  sum_of_amount: number;
  sum_of_depreciation_amount: number;
  approvals: [];
  progress_status: number;
}

export interface IAssetInIssuePayload {
  code: string;
  quantity: number;
  id?: number;
}

export interface IIssuePayload {
  code?: string;
  id?: number;
  created_date: string | Date;
  issue_date: string | Date;
  store_code: string;
  user_id: number;
  category: number;
  note: string;
  assets: IAssetInIssuePayload[];
  documents: IDocumentInPayload[];
}

export interface IDetailAssetInIssue {
  id: number;
  code: string;
  name: string;
  quantity: number;
  original_price: number;
  depreciation_amount: number;
  depreciation_duration: number;
}

export interface IIssueDetail {
  id: number;
  code: string;
  created_date: string | Date;
  issue_date: string | Date;
  category: boolean;
  issue_from: ICommonObjectValue;
  issue_to: ICommonObjectValue;
  user_in_charge_from: ICommonObjectValue;
  user_in_charge_to: ICommonObjectValue;
  note: string;
  sum_of_depreciation_amount: number;
  sum_of_amount: number;
  approved_status: boolean;
  assets: IDetailAssetInIssue[];
  documents: IDocumentInDetailResponse[];
}
