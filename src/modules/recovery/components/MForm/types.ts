import { Control } from "react-hook-form";

import { IRecoveryPayload } from "@interfaces/recoveries";

export interface IMFormProps {
  control: Control<IRecoveryPayload, any>;
  isEdit?: boolean;
}
