//note: INTERFACE SỬ DỤNG CHUNG
export interface ICommonObjectValue {
  id: string;
  name: string;
  code?: string;
}

export interface ICommonObjectValueParsedNumber {
  id: number;
  name: string;
  code?: string;
}
