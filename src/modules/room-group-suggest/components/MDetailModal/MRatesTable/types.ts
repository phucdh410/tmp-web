import { IRateInRoomGroupPayload } from "@interfaces/room-group-suggests";

export interface IMRatesTableProps {
  refetch: () => void;
  ratesData: IRateInRoomGroupPayload[];
  room_group_id: number;
}
