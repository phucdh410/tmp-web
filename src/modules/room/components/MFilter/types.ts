import { IAutocompleteOption } from "@components/controls/CAutocomplete/types";
import { IRoomPaginationParams } from "@interfaces/rooms";

export interface IMFilterProps {
  stores: IAutocompleteOption[];
  params: IRoomPaginationParams;
  onAdd: () => void;
  onSearch: (newParams: IRoomPaginationParams) => void;
  room_groups_options: IAutocompleteOption[];
}
