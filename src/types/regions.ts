import { IBasePaginationParams } from "./request";

//note: VỊ TRÍ
export interface IRegionPaginationParams extends IBasePaginationParams {}

export interface IRegionResponse {
  id: number;
  name: string;
  store_name: string;
  store_code: string;
  place_code: string;
  place_id: number;
  place_name: string;
  code: string;
  created_at: string | Date;
  status: number;
}

export interface IRegionPayload {
  id?: number;
  code: string;
  name: string;
  store_code: string;
  place_id: number;
}
