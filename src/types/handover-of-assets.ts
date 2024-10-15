//note: PHIẾU BÀN GIAO TÀI SẢN
export interface IHandoverOfAsset {
  id: string;
  code: string;
  ngay_ban_giao: string | Date;
  store_name: string;
  nhan_vien_ban_giao: string;
  nhan_vien_nhan_ban_giao: string;
  reason: string;
  status: any;
}

export interface IHandoverOfAssetPayload {
  id?: string;
  so_phieu_de_xuat_tai_san?: string;
  tai_san_ban_giao: number;
  so_ct_ban_giao: string;
  nguoi_nhan_ban_giao: number;
  ngay_ban_giao: string | Date;
  note: string;
  reason: string;
  file: string;
  assets: [];
}
