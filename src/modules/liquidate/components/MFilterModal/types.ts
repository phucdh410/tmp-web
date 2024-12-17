import { ILiquidatePaginationParams } from "@interfaces/liquidates";

export interface IMFilterModalRef {
  open: (currentParams: ILiquidatePaginationParams) => void;
}

export interface IMFilterModalProps {
  onSearch: (newParams: ILiquidatePaginationParams) => void;
}
