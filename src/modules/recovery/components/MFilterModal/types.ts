import { IRecoveryPaginationParams } from "@interfaces/recoveries";

export interface IMFilterModalRef {
  open: (currentParams: IRecoveryPaginationParams) => void;
}

export interface IMFilterModalProps {
  onSearch: (newParams: IRecoveryPaginationParams) => void;
}
