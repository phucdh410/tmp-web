import { IBasePaginationParams } from "@interfaces/request";

export interface IParams extends IBasePaginationParams {
  start_date: string | Date;
  end_date: string | Date;
  code?: string;
}
