import { IParams } from "@modules/transfer/types";

export interface IMFilterModalRef {
  open: (currentParams: IParams) => void;
}

export interface IMFilterModalProps {
  onSearch: (newParams: IParams) => void;
}
