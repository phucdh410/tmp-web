import { AxiosResponse } from "axios";

//note: INTERFACE CHO AXIOS RESPONSE
export type IApiResponse<T, E = any> = AxiosResponse<IDataResponse<T>, E>;

export interface IDataResponse<T> {
  data: T;
  errorCode: number;
  message: string;
  errors?: any;
}

export interface IPaginateResponse<T> {
  amount: number;
  data: T[];
  page: number;
  pages: number;
}
