import {
  ASSET_PROPOSAL_STATUSES,
  ASSET_PROPOSAL_TRACKING_STATUSES,
  ASSET_PROPOSAL_TYPES,
} from "@constants/enums";
import { Dayjs } from "dayjs";

import { IBasePaginationParams } from "./request";

//note: PHIẾU ĐỀ XUẤT TÀI SẢN
export interface IAssetProposal {
  id: number;
  document_code: string;
  proposed_date: string | Date;
  needed_date: string | Date;
  store_name: string;
  type: ASSET_PROPOSAL_TYPES;
  staff_name: string;
  total: number;
  status: ASSET_PROPOSAL_STATUSES;
}

export interface IAssetProposalPaginationParams extends IBasePaginationParams {
  status?: "" | ASSET_PROPOSAL_STATUSES;
  proposed_date?: "" | string | Date | Dayjs | null;
}

export interface IAssetInAssetProposalDetail {
  id: string;
  asset_proposal_id: string;
  asset_id: string;
  asset_code: string;
  asset_name: string;
  quantity: number;
  price: number;
  status: string;
  approved_by: string;
  approved_date: string | Date;
  note: string;
  rooms: any[];
}

export interface IFileInAssetProposalDetail {
  id: string;
  transfer_id: string;
  name: string;
  path: string;
  extension: string;
  size: number;
  active: boolean;
  created_by: string;
  created_date: string | Date;
}

export interface ITrackingInAssetProposalDetail {
  id: string;
  asset_proposal_id: string;
  label: string;
  hours: number;
  approval_hour: number;
  status: ASSET_PROPOSAL_TRACKING_STATUSES;
  type: number;
  reason: string;
  approver_id: string;
  created_by: string;
  created_date: string | Date;
  deleted_flag: boolean;
  approved_date: string | Date;
  approver_name: string;
}

export interface IAssetProposalDetail {
  id: string;
  document_code: string;
  proposed_date: string | Date;
  type: ASSET_PROPOSAL_TYPES;
  proposed_type: ASSET_PROPOSAL_TYPES;
  total: number;
  needed_date: string | Date;
  staff_name: string;
  description: string;
  manager_id: string;
  store_code: string;
  status: number;
  created_by: string;
  created_date: string | Date;
  deleted_flag: boolean;
  manager_name: string;
  store_name: string;
  assets: IAssetInAssetProposalDetail[];
  files: IFileInAssetProposalDetail[];
  trackings: ITrackingInAssetProposalDetail[];
}
