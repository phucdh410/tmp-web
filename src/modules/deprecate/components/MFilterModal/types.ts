import { IParams } from "@modules/deprecate/types";

export interface IMFilterModalRef {
  open: (currentParams: IParams) => void;
}

export interface IMFilterModalProps {
  onSearch: (newParams: IParams) => void;
}
