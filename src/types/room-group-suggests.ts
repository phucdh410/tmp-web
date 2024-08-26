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
