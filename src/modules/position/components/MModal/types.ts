import { IAutocompleteOption } from "@components/controls/CAutocomplete/types";
import { IPosition } from "@interfaces/positions";

export interface IMModalRef {
  open: (data?: IPosition) => void;
}

export interface IMModalProps {
  stores: IAutocompleteOption[];
  PLACES_OPTIONS: IAutocompleteOption[];
  refetch: () => void;
}
