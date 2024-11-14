import { IParams } from "@modules/recovery/types";

export interface IMFilterModalRef {
  open: (currentParams: IParams) => void;
}

export interface IMFilterModalProps {
  onSearch: (newParams: IParams) => void;
}
