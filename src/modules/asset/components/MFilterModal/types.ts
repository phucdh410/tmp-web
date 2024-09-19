import { IParams } from "@modules/asset/types";

export interface IMFilterModalRef {
  open: (currentParams: IParams) => void;
}

export interface IMFilterModalProps {
  onSearch: (newParams: IParams) => void;
}
