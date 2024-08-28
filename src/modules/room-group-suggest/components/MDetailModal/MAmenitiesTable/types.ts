import { IAutocompleteOption } from "@components/controls/CAutocomplete/types";
import { IAmenityInRoomGroupDetail } from "@interfaces/room-group-suggests";

export interface IMAmenitiesTableProps {
  refetch: () => void;
  criteria_code: string;
  amenitiesRoot: IAmenityInRoomGroupDetail[];
  room_group_id: number;
  all_criteria_options: IAutocompleteOption[];
}
