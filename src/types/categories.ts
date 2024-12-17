import { IBasePaginationParams } from "./request";

//note: LOẠI CÔNG CỤ DỤNG CỤ
export interface ICategoryResponse {
  id: number;
  code: string;
  name: string;
  note: string;
}

export interface ICategoryPaginationParams extends IBasePaginationParams {}

export interface ICategoryPayload {
  id?: number;
  code: string;
  name: string;
  note?: string;
}

export interface ICreatedCategoryResponse {
  id: number;
  code: string;
  name: string;
  note: string;
}
