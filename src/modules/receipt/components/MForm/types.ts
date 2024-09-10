import { Control } from "react-hook-form";

import { IReceiptPayload } from "@interfaces/receipts";

export interface IMFormProps {
  control: Control<IReceiptPayload, any>;
}
