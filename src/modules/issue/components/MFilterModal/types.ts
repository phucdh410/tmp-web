import { IParams } from "@modules/issue/types";

export interface IMFilterModalRef {
  open: (currentParams: IParams) => void;
}

export interface IMFilterModalProps {
  onSearch: (newParams: IParams) => void;
}
