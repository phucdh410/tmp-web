//note: CHI NHÁNH
export interface IStoreResponse {
  id: number;
  code: string;
  address: string;
  name: string;
  note: string;
  phone: string;
  databaseId?: number;
}

export interface IStorePayload {
  id?: number;
  code: string;
  name: string;
  address: string;
  phone: string;
  note?: string;
}
