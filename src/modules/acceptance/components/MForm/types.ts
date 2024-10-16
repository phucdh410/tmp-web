import { Control } from "react-hook-form";

import { IAcceptancePayload } from "@interfaces/acceptances";

export interface IMFormProps {
  control: Control<IAcceptancePayload, any>;
  isEdit?: boolean;
}
