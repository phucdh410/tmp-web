//! ĐỀ XUẤT NHÓM PHÒNG
export interface IAmenityInRoomGroup {
  name: string;
  room_group_id: string;
}

export interface IRoomGroupSuggest {
  id: string;
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
}

export interface IRoomGroupSuggestPayload {
  id?: string;
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
  id: string;
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
