import { ICommonObjectValue } from "./commons";
import { IBasePaginationParams } from "./request";

//note: PHIẾU KHẤU HAO
export interface IDeprecate {
  id: number;
  code: string;
  store: ICommonObjectValue;
  month: number;
  year: number;
  created_date: string | Date;
  deprecate_date: string | Date;
  note: string;
  sum_of_amount: number;
  sum_of_depreciation_amount: number;
  depreciation_accumulation: number;
  progress_status: number;
}

export interface IDeprecatePaginationParams extends IBasePaginationParams {
  start_date: string | Date;
  end_date: string | Date;
  code?: string;
}

export interface IDeprecatePayload {
  code?: string;
  id?: number;
  created_date: string | Date;
  deprecate_date: string | Date;
  store_code: string;
  month: number;
  year: number;
  note: string;
  time?: string | Date;
}
