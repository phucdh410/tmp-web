export interface IParams {
  page: number;
  limit: number;
  start_date: string | Date;
  end_date: string | Date;
  code?: string;
}
