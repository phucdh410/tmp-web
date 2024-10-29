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

export interface IAssetInHandoverPayload {
  asset_code: string;
  nguoi_ban_giao: string | Date;
  nguoi_nhan_ban_giao: string;
  quantity: number;
  reason: string;
  description: string;
  file_id: string;
}

export interface IHandoverOfAssetPayload {
  id?: string;
  document_code?: string;
  code?: string;
  date: string | Date;
  assets: IAssetInHandoverPayload[];
}
