//note: VỊ TRÍ
export interface IRegionResponse {
  id: string;
  name: string;
  store_name: string;
  store_code: string;
  place_id: string;
  place_name: string;
  code: string;
  created_at: string | Date;
  status: number;
}

export interface IRegionPayload {
  code?: string;
  id?: string;
  name: string;
  store_code: string;
  place_id: string;
}
