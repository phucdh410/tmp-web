import { IBasePaginationParams } from "@interfaces/request";

export interface IParams extends IBasePaginationParams {
  store_code?: string;
  status?: number | string;
}
