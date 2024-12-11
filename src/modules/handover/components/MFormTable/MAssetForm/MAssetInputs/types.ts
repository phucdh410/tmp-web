import { Control, UseFormSetValue } from "react-hook-form";

import { IAssetInHandoverPayload } from "@interfaces/handovers";

import { ASSET_TYPE } from "../types";

export interface IMAssetInputsProps {
  control: Control<IAssetInHandoverPayload, any>;
  setValue: UseFormSetValue<IAssetInHandoverPayload>;
  type: ASSET_TYPE;
  onTypeChange: (event: React.MouseEvent<HTMLElement>, value: any) => void;
}
