import { Control } from "react-hook-form";

import { IAssetInHandoverPayload } from "@interfaces/handover-of-assets";

export interface IMAmountInputProps {
  control: Control<IAssetInHandoverPayload, any>;
}
