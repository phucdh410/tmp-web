//note: INTERFACE CHO CÁC RESPONSE GỌI TỪ ICOOL-STAFF
export interface Room {
  id: string;
  code: string;
  area_id: string;
  area_name: string;
}

export interface IAssetProposal {
  asset_code: string;
  asset_name: string;
  created_by: string;
  created_date: string | Date;
  deleted_flag: boolean;
  description: string;
  document_code: string;
  id: string;
  manager_id: string;
  needed_date: string | Date;
  price: number;
  proposed_date: string | Date;
  proposed_type: number;
  quantity: number;
  rooms: Room[];
  status: number;
  store_code: string;
  total: number;
  type: number;
}

export interface IUser {
  code: string;
  sale: string;
  name: string;
  store_code: string;
  store_name: string;
}
