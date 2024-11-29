import { IBasePaginationParams } from "@interfaces/request";

export interface IParams extends IBasePaginationParams {
  code?: string;
  name?: string;
  status?: number;
  store_code?: string;
}
