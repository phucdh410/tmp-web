export interface IRegion {
  code: string;
  created_at: string | Date;
  id: string;
  name: string;
  place_code: string;
  place_name: string;
  status: number;
  store_code: string;
  store_name: string;
}

export interface IRegionResponse {
  id: string;
  code: string;
  name: string;
  note: string;
  store_code: string;
  store_name: string;
}

export interface IRegionPayload {
  id?: string;
  code: string;
  name: string;
  note?: string;
  store_code: string;
}
