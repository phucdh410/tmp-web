//note: PHIẾU KIỂM KÊ
export interface IInventory {
  id: number;
  code: string;
  date: string | Date;
  store_code: string;
  store_name: string;
  user: string;
  remaining_amount: number;
  quantity: number;
  reason: string;
  status: any;
}

export interface IUserInInventoryPayload {
  name: string;
  role: string;
  represent: string;
}

export interface IAssetInInventoryPayload {
  code: string;
  name: string;
  vi_tri: string;
  so_luong_so_sach: number;
  nguyen_gia: number;
  gia_tri_con_lai: number;
  so_luong_kiem_ke: number;
  chat_luong: string;
  kien_nghi_xu_ly: string;
  note: string;
}

export interface IInventoryPayload {
  code?: string;
  check_date: string | Date;
  date: string | Date;
  store_code: string;
  user_check_id: number;
  note?: string;
  chon_ban_kiem_ke: boolean;
  them_nguoi_kiem_ke_tu_lan_nhap_truoc: boolean;
  users: IUserInInventoryPayload[];
  assets: IAssetInInventoryPayload[];
}
