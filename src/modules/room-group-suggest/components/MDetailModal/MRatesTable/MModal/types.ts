import { IRateInRoomGroupPayload } from "@interfaces/room-group-suggests";

import { IMRatesTableProps } from "../types";

export interface IMModalRef {
  open: (room_group_id?: number, rateData?: IRateInRoomGroupPayload) => void;
}

export interface IMModalProps extends Pick<IMRatesTableProps, "refetch"> {}
