import { Control } from "react-hook-form";

import { IImportAssetPayload } from "@interfaces/import-assets";

export interface IMFormProps {
  control: Control<IImportAssetPayload, any>;
  isEdit?: boolean;
}
