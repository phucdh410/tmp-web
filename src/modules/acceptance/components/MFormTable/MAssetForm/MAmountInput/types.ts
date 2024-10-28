import { Control } from "react-hook-form";

import { IAssetInAcceptancePayload } from "@interfaces/acceptances";

export interface IMAmountInputProps {
  control: Control<IAssetInAcceptancePayload, any>;
}
