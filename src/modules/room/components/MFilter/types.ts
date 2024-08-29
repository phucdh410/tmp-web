import { IAutocompleteOption } from "@components/controls/CAutocomplete/types";
import { IParams } from "@modules/room/types";

export interface IMFilterProps {
  options: IAutocompleteOption[];
  params: IParams;
  onAdd: () => void;
  onSearch: (newParams: IParams) => void;
  room_groups_options: IAutocompleteOption[];
}
