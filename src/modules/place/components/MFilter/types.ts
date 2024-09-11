import { IAutocompleteOption } from "@components/controls/CAutocomplete/types";
import { IParams } from "@modules/place/types";

export interface IMFilterProps {
  stores: IAutocompleteOption[];
  params: IParams;
  onAdd: () => void;
  onSearch: (newParams: IParams) => void;
}
