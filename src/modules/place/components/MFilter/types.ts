import { IAutocompleteOption } from "@components/controls/CAutocomplete/types";
import { IPlacePaginationParams } from "@interfaces/places";

export interface IMFilterProps {
  stores: IAutocompleteOption[];
  params: IPlacePaginationParams;
  onAdd: () => void;
  onSearch: (newParams: IPlacePaginationParams) => void;
}
