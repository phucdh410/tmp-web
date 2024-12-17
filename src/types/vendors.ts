import { ICategoryResponse } from "./categories";
import { IBasePaginationParams } from "./request";

//note: NHÀ CUNG CẤP
export interface IVendorPaginationParams extends IBasePaginationParams {}

export interface IVendorResponse {
  id: number;
  name: string;
  address: string;
  phone: string;
  contact: string;
  note: string;
  categories: ICategoryResponse[];
}

export interface IVendorPayload {
  id?: number;
  name: string;
  address: string;
  phone: string;
  email?: string;
  contact: string;
  note?: string;
  categories: number[];
}

export interface ICreatedVendorResponse {
  id: number;
  name: string;
  address: string;
  phone: string;
  contact: string;
  note: string;
  categories: ICategoryResponse[];
}
