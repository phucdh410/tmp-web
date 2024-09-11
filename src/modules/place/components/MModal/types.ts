import { IAutocompleteOption } from "@components/controls/CAutocomplete/types";
import { IPlace } from "@interfaces/places";

export interface IMModalRef {
  open: (data?: IPlace) => void;
}

export interface IMModalProps {
  stores: IAutocompleteOption[];
  refetch: () => void;
}
