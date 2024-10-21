import { Control } from "react-hook-form";

import { IDeprecatePayload } from "@interfaces/deprecates";

export interface IMFormProps {
  control: Control<IDeprecatePayload, any>;
  isEdit?: boolean;
  onSubmit: () => void;
}
