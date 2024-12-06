import {
  ASSET_PROPOSAL_TYPES,
  PURCHASED_PROPOSED_ASSET_STATUSES,
} from "@constants/enums";

//note: TÀI SẢN ĐƯỢC ĐỀ XUẤT MUA
export interface IPurchasedProposedAsset {
  id: number;
  code: string;
  date: string | Date;
  thoi_gian_can: string | Date;
  store_name: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
  type: ASSET_PROPOSAL_TYPES;
  status: PURCHASED_PROPOSED_ASSET_STATUSES;
}

export interface IPurchasedProposedAssetDetail {
  id: number;
  code: string;
  date: string | Date;
  thoi_gian_can: string | Date;
  store_name: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
  type: ASSET_PROPOSAL_TYPES;
  status: PURCHASED_PROPOSED_ASSET_STATUSES;
}

export interface IUpdatedStatusPayload {
  status: PURCHASED_PROPOSED_ASSET_STATUSES;
}
