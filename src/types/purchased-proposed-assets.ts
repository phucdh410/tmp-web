import {
  ASSET_PROPOSAL_STATUSES,
  ASSET_PROPOSAL_TYPES,
  PURCHASED_PROPOSED_ASSET_STATUSES,
} from "@constants/enums";

//note: TÀI SẢN ĐƯỢC ĐỀ XUẤT MUA
export interface IPurchasedProposedAsset {
  id: string;
  document_code: string;
  proposed_date: string | Date;
  type: ASSET_PROPOSAL_TYPES;
  proposed_type: ASSET_PROPOSAL_TYPES;
  total: number;
  needed_date: string | Date;
  description: string;
  manager_id: string;
  store_code: string;
  status: ASSET_PROPOSAL_STATUSES;
  created_by: string;
  created_date: string | Date;
  modified_date: string | Date;
  deleted_flag: false;
  store_name: string;
  staff_name: string;
  assets: [
    {
      id: string;
      asset_proposal_id: string;
      asset_id: string;
      asset_code: string;
      asset_name: string;
      quantity: number;
      price: number;
      total: number;
      status: PURCHASED_PROPOSED_ASSET_STATUSES;
      approved_by: string;
      approved_date: string | Date;
      note: string;
    }
  ];
}

export interface IPurchasedProposedAssetUnwrapParent {
  id: string;
  asset_proposal_id: string;
  asset_id: string;
  asset_code: string;
  asset_name: string;
  quantity: number;
  price: number;
  total: number;
  status: PURCHASED_PROPOSED_ASSET_STATUSES;
  approved_by: string;
  approved_date: string | Date;
  note: string;
  parent_info: {
    id: string;
    document_code: string;
    proposed_date: string | Date;
    type: ASSET_PROPOSAL_TYPES;
    proposed_type: ASSET_PROPOSAL_TYPES;
    total: number;
    needed_date: string | Date;
    description: string;
    manager_id: string;
    store_code: string;
    status: ASSET_PROPOSAL_STATUSES;
    created_by: string;
    created_date: string | Date;
    modified_date: string | Date;
    deleted_flag: false;
    store_name: string;
    staff_name: string;
  };
}

export interface IUpdatedStatusPayload {
  status: PURCHASED_PROPOSED_ASSET_STATUSES;
}
