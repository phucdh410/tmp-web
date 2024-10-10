import { SORT_TYPES } from "@constants/enums";
import dayjs from "dayjs";

export interface IParams {
  page: number;
  limit: number;
  status: "" | number;
  suggest_date: null | "" | string | dayjs.Dayjs | Date;
  store_sort: SORT_TYPES;
}
