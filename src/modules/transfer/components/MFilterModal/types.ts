import { ITransferPaginationParams } from "@interfaces/transfers";

export interface IMFilterModalRef {
  open: (currentParams: ITransferPaginationParams) => void;
}

export interface IMFilterModalProps {
  onSearch: (newParams: ITransferPaginationParams) => void;
}
