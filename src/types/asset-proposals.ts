import {
  ASSET_PROPOSAL_STATUSES,
  ASSET_PROPOSAL_TYPES,
} from "@constants/enums";

//note: PHIẾU ĐỀ XUẤT TÀI SẢN
export interface IAssetProposal {
  id: number;
  code: string;
  date: string | Date;
  ngay_can: string | Date;
  type: ASSET_PROPOSAL_TYPES;
  name: string;
  quantity: number;
  created_by: string;
  status: ASSET_PROPOSAL_STATUSES;
}

export interface IAssetProposalDetail {
  id: number;
  code: string;
  date: string | Date;
  type: ASSET_PROPOSAL_TYPES;
  name: string;
  quantity: number;
  created_by: string;
  status: ASSET_PROPOSAL_STATUSES;
}
