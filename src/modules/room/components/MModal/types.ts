import { IAutocompleteOption } from "@components/controls/CAutocomplete/types";
import { IRoom } from "@interfaces/rooms";

export interface IMModalRef {
  open: (data?: IRoom) => void;
}

export interface IMModalProps {
  stores: IAutocompleteOption[];
  room_groups_options: IAutocompleteOption[];
  refetch: () => void;
}
