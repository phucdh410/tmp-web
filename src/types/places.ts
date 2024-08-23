import { Dayjs } from "dayjs";

//! KHU VỰC
export interface IPlacePayload {
  code?: string;
  id?: string;
  name: string;
  store_code: string;
  status: number;
}

export interface IPlace {
  id: string;
  name: string;
  store_name: string;
  store_code: string;
  code: string;
  created_at: string | Date | Dayjs;
  status: number;
}
