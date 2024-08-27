import { IParams } from "@modules/room-group-suggest/types";

export interface IMFilterProps {
  params: IParams;
  onAdd: () => void;
  onSearch: (newParams: IParams) => void;
}
