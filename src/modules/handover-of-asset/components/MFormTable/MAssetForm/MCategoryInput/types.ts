import { Control } from "react-hook-form";

import { IAssetInHandoverPayload } from "@interfaces/handover-of-assets";

export interface IMCategoryInputProps {
  control: Control<IAssetInHandoverPayload, any>;
}
