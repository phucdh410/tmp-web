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
