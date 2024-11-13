export interface IParams {
  page: number;
  limit: number;
  start_date?: null | string | Date;
  end_date?: null | string | Date;
  store_code?: string;
}
