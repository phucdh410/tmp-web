import { Control } from "react-hook-form";

import { IRoomPayload } from "@interfaces/rooms";

export interface IMStoreInputProps {
  control: Control<IRoomPayload, any>;
}
