import { Control } from "react-hook-form";

import { ISellAssetPayload } from "@interfaces/sell-assets";

export interface IMFormProps {
  control: Control<ISellAssetPayload>;
  isEdit?: boolean;
}
