import { IAutocompleteOption } from "@components/controls/CAutocomplete/types";
import { IUtilityPaginationParams } from "@interfaces/rooms";

export interface IMFilterProps {
  options: IAutocompleteOption[];
  params: IUtilityPaginationParams;
  onAdd: () => void;
  onSearch: (newParams: IUtilityPaginationParams) => void;
}
