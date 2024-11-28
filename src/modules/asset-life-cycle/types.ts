export interface IParams {
  page: number;
  limit: number;
  category_id?: number | "";
  name?: string;
  store_code?: string;
  region_id?: number | "";
  repair_count?: number;
  date?: string | Date | null;
}
