import { Dayjs } from "dayjs";

//! VỊ TRÍ
export interface IPositionPayload {
  code?: string;
  id?: string;
  name: string;
  store_code: string;
  place_code: string;
}

export interface IPosition {
  id: string;
  name: string;
  store_name: string;
  store_code: string;
  place_code: string;
  place_name: string;
  code: string;
  created_at: string | Date | Dayjs;
  status: number;
}
