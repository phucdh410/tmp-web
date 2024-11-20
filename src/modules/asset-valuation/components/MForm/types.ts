import { Control } from "react-hook-form";

import { IAssetValuationPayload } from "@interfaces/asset-valuations";

export interface IMFormProps {
  control: Control<IAssetValuationPayload>;
  isEdit?: boolean;
}
