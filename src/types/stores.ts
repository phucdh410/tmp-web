//note: CHI NHÁNH
export interface IStoreResponse {
  id: string;
  code: string;
  address: string;
  name: string;
  note: string;
  phone: string;
}

export interface IStorePayload {
  id?: string;
  code: string;
  name: string;
  address: string;
  phone: string;
  note?: string;
}
