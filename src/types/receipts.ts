export interface IReceipt {
  code: string;
  id: string;
  name: string;
  store_code: string;
  store_name: string;
  loai_ccdc: string;
  unit: string;
  date: string | Date;
  reason: string;
  amount: number;
  price: number;
  total: number;
}
