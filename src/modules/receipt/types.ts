export interface IParams {
  page: number;
  limit: number;
  start_at?: string | Date;
  end_at?: string | Date;
  store_code?: string;
  place_id?: string;
  code?: string;
  category_id?: string;
  date?: string | Date;
  price?: number;
  reason?: string;
  amount?: number;
  quantity?: number;
  unit?: string;
  barcode?: string | number;
  region_id?: string;
}
