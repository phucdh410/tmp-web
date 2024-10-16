import { ACCEPTANCE_STATUSES } from "@constants/enums";

//note: PHIẾU NGHIỆM THU
export interface IAcceptance {
  id: string;
  code: string;
  suggest_code: string;
  suggest_date: string | Date;
  type: string;
  name: string;
  quantity: number;
  suggest_by: string;
  status: ACCEPTANCE_STATUSES;
}

export interface IAcceptancePayload {
  id?: string;
  so_phieu_de_xuat_mua_hang?: string;
  ngay_de_xuat_thanh_toan: string | Date;
  name: string;
  category_id: number;
  so_ct_thanh_toan?: string;
  price: number;
  store_code: string;
  vendor_id: number;
  unit: string;
  quantity: number;
  reason: string;
  note: string;
  amount: number;
  status: ACCEPTANCE_STATUSES;
}
