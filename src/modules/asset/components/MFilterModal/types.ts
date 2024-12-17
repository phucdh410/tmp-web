import { IAssetPaginationParams } from "@interfaces/assets";

export interface IMFilterModalRef {
  open: (currentParams: IAssetPaginationParams) => void;
}

export interface IMFilterModalProps {
  onSearch: (newParams: IAssetPaginationParams) => void;
}
