import { Control } from "react-hook-form";

import { IAssetInAcceptancePayload } from "@interfaces/acceptances";

export interface IMCategoryInputProps {
  control: Control<IAssetInAcceptancePayload, any>;
}
