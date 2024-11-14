export interface IParams {
  page: number;
  limit: number;
  start_date: string | Date;
  end_date: string | Date;
  code?: string;
  from_store_code?: string;
  from_user?: string;
  to_store_code?: string;
  to_user?: string;
}
