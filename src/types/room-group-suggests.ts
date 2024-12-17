import { IBasePaginationParams } from "./request";

//note: ĐỀ XUẤT NHÓM PHÒNG
export interface IRoomGroupSuggestPaginationParams
  extends IBasePaginationParams {
  store_code?: string;
  status?: number | string;
}

export interface IAmenityInRoomGroup {
  name: string;
  room_group_id: number;
}

export interface IRoomGroupSuggest {
  id: number;
  code: string;
  name: string;
  store_code: string;
  store_name: "Ung Văn Khiêm";
  market_price: number;
  amenities_price: number;
  floor_area_min: number;
  floor_area_max: number;
  created_at: string | Date;
  status: number;
  amenities: IAmenityInRoomGroup[];
}

export interface IRateInRoomGroupPayload {
  day_of_week: number;
  apply_from: Date | string;
  start_time: number;
  end_time: number;
  price: number;
  holiday_price: number;
  id?: number;
  room_group_id?: number;
}

export interface IRoomGroupSuggestPayload {
  id?: number;
  name: string;
  code: string;
  store_code: string;
  market_price: number;
  seating_capacity: number;
  floor_area_min: number;
  floor_area_max: number;
  amenities: number[];
  rates: IRateInRoomGroupPayload[];
  criteria_code?: string;
}

export interface IAmenityInRoomGroupDetail {
  amenity_criteria_code: string;
  code: string;
  id: number;
  name: string;
  price: number;
}

export interface IRoomGroupSuggestDetail
  extends Omit<IRoomGroupSuggest, "amenities"> {
  amenities: IAmenityInRoomGroupDetail[];
  rates: IRateInRoomGroupPayload[];
}

export interface IUpdateAmenitiesInRoomGroupPayload {
  room_group_id: number;
  amenities: number[];
}

export interface IRoomGroup {
  code: string;
  id: number;
  amenities_price: number;
  created_at: string | Date;
  floor_area_min: number;
  floor_area_max: number;
  market_price: number;
  name: string;
  status: number;
  store_code: string;
  store_name: string;
}
