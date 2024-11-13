export interface IParams {
  page: number;
  limit: number;
  from: string | Date;
  to: string | Date;
  code?: string;
  from_store_code?: string;
  from_user?: string;
  to_store_code?: string;
  to_user?: string;
}
