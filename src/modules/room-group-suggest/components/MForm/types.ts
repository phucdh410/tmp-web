import { Control } from "react-hook-form";

import { IRoomGroupSuggestPayload } from "@interfaces/room-group-suggests";

export interface IMForm {
  control: Control<IRoomGroupSuggestPayload>;
}
