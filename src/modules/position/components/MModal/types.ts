import { IAutocompleteOption } from "@components/controls/CAutocomplete/types";
import { IPosition } from "@interfaces/positions";

export interface IMModalRef {
  open: (data?: IPosition) => void;
}

export interface IMModalProps {
  STORES_OPTIONS: IAutocompleteOption[];
  PLACES_OPTIONS: IAutocompleteOption[];
  refetch: () => void;
}
