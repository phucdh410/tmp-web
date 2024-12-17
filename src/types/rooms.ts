import { IBasePaginationParams } from "./request";

//note: PHÒNG
export interface IUtilityPaginationParams extends IBasePaginationParams {
  amenity_criteria_code?: string;
  status: number;
}

export interface IRoomPaginationParams extends IBasePaginationParams {
  status?: number | string;
  store_code?: string;
  room_group_id?: number | "";
}

export interface IRoom {
  id: number;
  code: string;
  created_at: string | Date;
  name: string;
  region_id: number;
  region_name: string;
  room_group_id: number;
  room_group_name: string;
  status: number;
  store_code: string;
  store_name: string;
  apply_from: string | Date;
}

export interface IRoomPayload {
  id?: number;
  code?: string;
  name: string;
  store_code: string;
  room_group_id: number;
  status: number;
  region_id: number;
  apply_from: string;
}

export interface IRateInRoom {
  day_of_week: number;
  apply_from: Date | string;
  start_time: number;
  end_time: number;
  price: number;
  holiday_price: number;
  id?: number;
  room_id?: number;
}

export interface IAmenityInRoom {
  amenity_criteria_code: string;
  code: string;
  id: number;
  name: string;
  price: number;
}

export interface IRoomDetail {
  amenities: IAmenityInRoom[];
  code: string;
  created_at: string | Date;
  id: number;
  name: string;
  place_position_id: number;
  place_position_name: string;
  rates: IRateInRoom[];
  room_group_id: number;
  room_group_name: string;
  status: number;
  store_code: string;
  store_name: string;
  apply_from: string | Date;
}

export interface IUpdateAmenitiesInRoomPayload {
  room_id: number;
  amenities: number[];
}
