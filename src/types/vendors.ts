import { ICategoryResponse } from "./categories";

//! NHÀ CUNG CẤP
export interface IVendorResponse {
  id: string;
  name: string;
  address: string;
  phone: string;
  contact: string;
  note: string;
  categories: ICategoryResponse[];
}

export interface IVendorPayload {
  id?: string | number;
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
