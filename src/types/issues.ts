import { ICommonObjectValue } from "./commons";

//note: PHIẾU GHI GIẢM
export interface IIssue {
  id: string;
  code: string;
  store: ICommonObjectValue;
  user: ICommonObjectValue;
  created_date: string | Date;
  issued_date: string | Date;
  category: ICommonObjectValue;
  note: string;
  parent_id: string;
  sum_of_amount: number;
  sum_of_depreciation_amount: number;
  approvals: [];
}

export interface IAssetInIssuePayload {
  code: string;
  quantity: number;
  id?: string | number;
}

export interface IDocumentInIssuePayload {
  document_id: string | number;
  date: string | Date;
  code: string;
  note: string;
  id?: string | number;
  originalName?: string;
  url?: string;
}

export interface IIssuePayload {
  code?: string;
  id?: string;
  created_date: string | Date;
  issue_date: string | Date;
  store_code: string;
  user_id: string;
  category: number;
  note: string;
  assets: IAssetInIssuePayload[];
  documents: IDocumentInIssuePayload[];
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
export interface IDetailDocumentInIssue {
  id: number;
  document_id: number;
  date: string | Date;
  code: string;
  note: string;
  original_name: string;
  url: string;
  extension: string;
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
  documents: IDetailDocumentInIssue[];
}
