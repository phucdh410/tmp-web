import { Control } from "react-hook-form";

import { ILiquidatePayload } from "@interfaces/liquidates";

export interface IMFormProps {
  control: Control<ILiquidatePayload, any>;
  isEdit?: boolean;
}
