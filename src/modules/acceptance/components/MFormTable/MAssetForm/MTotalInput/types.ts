import { Control } from "react-hook-form";

import { IAssetInAcceptancePayload } from "@interfaces/acceptances";

export interface IMTotalInputProps {
  control: Control<IAssetInAcceptancePayload, any>;
}
