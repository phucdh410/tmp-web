import { IDeprecatePaginationParams } from "@interfaces/deprecates";

export interface IMFilterModalRef {
  open: (currentParams: IDeprecatePaginationParams) => void;
}

export interface IMFilterModalProps {
  onSearch: (newParams: IDeprecatePaginationParams) => void;
}
