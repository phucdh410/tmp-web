import { IBasePaginationParams } from "@interfaces/request";

export interface IParams extends IBasePaginationParams {
  start_date?: null | string | Date;
  end_date?: null | string | Date;
  store_code?: string;
}
