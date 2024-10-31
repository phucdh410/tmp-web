import { Control } from "react-hook-form";

import { IExportAssetPayload } from "@interfaces/export-assets";

export interface IMFormProps {
  control: Control<IExportAssetPayload, any>;
  isEdit?: boolean;
}
