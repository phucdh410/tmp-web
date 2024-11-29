import { IBasePaginationParams } from "@interfaces/request";

export interface IParams extends IBasePaginationParams {
  start_date: string | Date;
  end_date: string | Date;
  code?: string;
  from_store_code?: string;
  from_user?: string;
  to_store_code?: string;
  to_user?: string;
}
