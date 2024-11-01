import { Control, UseFormSetValue } from "react-hook-form";

import { IAssetInHandoverPayload } from "@interfaces/handovers";

export interface IMAssetInputsProps {
  control: Control<IAssetInHandoverPayload, any>;
  setValue: UseFormSetValue<IAssetInHandoverPayload>;
}
