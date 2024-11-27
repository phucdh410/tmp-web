import { Control } from "react-hook-form";

import { IInventoryPayload } from "@interfaces/inventories";

export interface IMFormProps {
  control: Control<IInventoryPayload, any>;
  isEdit?: boolean;
}
