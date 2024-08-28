import { IAmenityInRoomGroupDetail } from "@interfaces/room-group-suggests";

import { IMAmenitiesTableProps } from "../types";

export interface IMModalRef {
  open: (room_group_id: number, amenities: IAmenityInRoomGroupDetail[]) => void;
}

export interface IMModalProps
  extends Pick<IMAmenitiesTableProps, "all_criteria_options" | "refetch"> {}
