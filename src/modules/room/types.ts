import { IBasePaginationParams } from "@interfaces/request";

export interface IParams extends IBasePaginationParams {
  status?: number | string;
  store_code?: string;
  room_group_id?: number | "";
}
