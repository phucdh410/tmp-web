import { IAutocompleteOption } from "@components/controls/CAutocomplete/types";
import { IParams } from "@modules/utility/types";

export interface IMFilterProps {
  options: IAutocompleteOption[];
  params: IParams;
  onAdd: () => void;
  onSearch: (newParams: IParams) => void;
}
