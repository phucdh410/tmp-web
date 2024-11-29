import { IBasePaginationParams } from "@interfaces/request";
import dayjs from "dayjs";

export interface IParams extends IBasePaginationParams {
  status: "" | number;
  suggest_date: null | "" | string | dayjs.Dayjs | Date;
}
