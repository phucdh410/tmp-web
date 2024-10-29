import { Control } from "react-hook-form";

import { IAssetInHandoverPayload } from "@interfaces/handover-of-assets";

export interface IMUnitInputProps {
  control: Control<IAssetInHandoverPayload, any>;
}
