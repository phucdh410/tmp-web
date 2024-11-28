//note: VÒNG ĐỜI TÀI SẢN
export interface IAssetLifeCycle {
  id: number;
  code: string;
  name: string;
  category_name: string;
  quantity: number;
  unit: string;
  date: string | Date;
  thoi_gian_cho_phep_su_dung: string;
  thoi_gian_da_su_dung: string;
  thoi_gian_con_su_dung: string;
  repair_count: number;
  repair_cost: number;
  store_name: string;
  region_name: string;
}
