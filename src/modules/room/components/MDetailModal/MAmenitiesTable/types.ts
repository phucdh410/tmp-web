import { IAutocompleteOption } from "@components/controls/CAutocomplete/types";
import { IAmenityInRoomGroupDetail } from "@interfaces/room-group-suggests";

export interface IMAmenitiesTableProps {
  refetch: () => void;
  amenities: IAmenityInRoomGroupDetail[];
  room_id: number;
  all_criteria_options: IAutocompleteOption[];
}
