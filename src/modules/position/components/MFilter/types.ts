import { IAutocompleteOption } from "@components/controls/CAutocomplete/types";
import { IParams } from "@modules/position/types";

export interface IMFilterProps {
  stores: IAutocompleteOption[];
  params: IParams;
  onAdd: () => void;
  onSearch: (newParams: IParams) => void;
  PLACES_OPTIONS: IAutocompleteOption[];
}
