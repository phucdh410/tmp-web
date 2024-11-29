import { IBasePaginationParams } from "@interfaces/request";

export interface IParams extends IBasePaginationParams {
  start_at?: string | Date;
  end_at?: string | Date;
  store_code?: string;
  place_id?: number | "";
  region_id?: number | "";
  code?: string;
  category_id?: number | "";
  date?: string | Date;
  price?: number;
  reason?: string;
  amount?: number;
  quantity?: number;
  unit?: string;
  barcode?: string | number;
}
