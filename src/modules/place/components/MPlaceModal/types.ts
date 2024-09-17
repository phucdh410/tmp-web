import { IAutocompleteOption } from "@components/controls/CAutocomplete/types";
import { IPlaceResponse } from "@interfaces/places";

export interface IMModalRef {
  open: (data?: IPlaceResponse) => void;
}

export interface IMModalProps {
  stores: IAutocompleteOption[];
  refetch: () => void;
}
