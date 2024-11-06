import { Control, UseFormResetField, UseFormSetValue } from "react-hook-form";

import { IImportAssetPayload } from "@interfaces/import-assets";

export interface IMFormProps {
  control: Control<IImportAssetPayload, any>;
  isEdit?: boolean;
  resetField: UseFormResetField<IImportAssetPayload>;
  setValue: UseFormSetValue<IImportAssetPayload>;
}
