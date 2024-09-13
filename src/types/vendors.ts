import { ICategory } from "./categories";
import { ICommonObjectValue } from "./commons";

//! NHÀ CUNG CẤP
export interface IVendor {
  address: string;
  categories: ICategory[];
  contact: string;
  id: string;
  name: string;
  note: string;
  phone: string;
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
  categories: ICommonObjectValue[];
}
