import { Dayjs } from "dayjs";

import { IBasePaginationParams } from "./request";

//note: KHU VỰC
export interface IPlacePaginationParams extends IBasePaginationParams {
  code?: string;
  name?: string;
  status?: number;
  store_code?: string;
}

export interface IPlacePayload {
  code?: string;
  id?: number;
  name: string;
  store_code: string;
  status: number;
}

export interface IPlaceResponse {
  id: number;
  name: string;
  store_name: string;
  store_code: string;
  code: string;
  created_at: string | Date | Dayjs;
  status: number;
}
