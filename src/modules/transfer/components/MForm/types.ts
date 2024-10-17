import { Control } from "react-hook-form";

import { ITransferPayload } from "@interfaces/transfers";

export interface IMFormProps {
  control: Control<ITransferPayload, any>;
  isEdit?: boolean;
}
