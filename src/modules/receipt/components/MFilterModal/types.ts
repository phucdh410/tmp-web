import { IReceiptPaginationParams } from "@interfaces/receipts";

export interface IMFilterModalRef {
  open: (currentParams: IReceiptPaginationParams) => void;
}

export interface IMFilterModalProps {
  onSearch: (newParams: IReceiptPaginationParams) => void;
}
