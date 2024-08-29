export interface IRoom {
  id: string;
  code: string;
  created_at: string | Date;
  name: string;
  place_position_id: string;
  place_position_name: string;
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
  place_position_id: number;
  apply_from: string;
}

export interface IRoomDetail {}
