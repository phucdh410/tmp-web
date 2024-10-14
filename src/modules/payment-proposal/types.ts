import dayjs from "dayjs";

export interface IParams {
  page: number;
  limit: number;
  status: "" | number;
  suggest_date: null | "" | string | dayjs.Dayjs | Date;
}
