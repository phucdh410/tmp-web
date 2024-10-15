import { Control } from "react-hook-form";

import { IHandoverOfAssetPayload } from "@interfaces/handover-of-assets";

export interface IMFormProps {
  control: Control<IHandoverOfAssetPayload, any>;
  isEdit?: boolean;
}
