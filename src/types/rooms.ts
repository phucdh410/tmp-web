//note: PHÒNG
export interface IRoom {
  id: string;
  code: string;
  created_at: string | Date;
  name: string;
  region_id: string;
  region_name: string;
  room_group_id: string;
  room_group_name: string;
  status: number;
  store_code: string;
  store_name: string;
  apply_from: string | Date;
}

export interface IRoomPayload {
  id?: string;
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
  id?: string;
  room_id?: string;
}

export interface IAmenityInRoom {
  amenity_criteria_code: string;
  code: string;
  id: string;
  name: string;
  price: number;
}

export interface IRoomDetail {
  amenities: IAmenityInRoom[];
  code: string;
  created_at: string | Date;
  id: string;
  name: string;
  place_position_id: string;
  place_position_name: string;
  rates: IRateInRoom[];
  room_group_id: string;
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
