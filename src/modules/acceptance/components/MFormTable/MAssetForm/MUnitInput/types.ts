import { Control } from "react-hook-form";

import { IAssetInAcceptancePayload } from "@interfaces/acceptances";

export interface IMUnitInputProps {
  control: Control<IAssetInAcceptancePayload, any>;
}
