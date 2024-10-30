import { Control } from "react-hook-form";

import { IHandoverPayload } from "@interfaces/handovers";

export interface IMFormProps {
  control: Control<IHandoverPayload, any>;
  isEdit?: boolean;
}
