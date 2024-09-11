import { ICategory } from "./categories";

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
