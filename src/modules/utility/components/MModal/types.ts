import { IAutocompleteOption } from "@components/controls/CAutocomplete/types";
import { IAmenity } from "@interfaces/amenities";

export interface IMModalRef {
  open: (data?: IAmenity) => void;
}

export interface IMModalProps {
  TIEU_CHI_OPTIONS: IAutocompleteOption[];
  refetch: () => void;
}
