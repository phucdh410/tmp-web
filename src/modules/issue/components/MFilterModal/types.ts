import { IIssuePaginationParams } from "@interfaces/issues";

export interface IMFilterModalRef {
  open: (currentParams: IIssuePaginationParams) => void;
}

export interface IMFilterModalProps {
  onSearch: (newParams: IIssuePaginationParams) => void;
}
