import { Controller } from "react-hook-form";

import { IMPORT_ASSET_TYPES_OPTIONS } from "@constants/options";
import { CAutocomplete } from "@controls";

import { IMImportTypeInputProps } from "./types";

export const MImportTypeInput = ({
  control,
  resetField,
  isEdit,
}: IMImportTypeInputProps) => {
  //#region Data
  //#endregion

  //#region Event
  const onTypeChange =
    (onChangeCallback: (...event: any[]) => void) => (value: any) => {
      onChangeCallback(value);
      resetField("asset_name");
      resetField("asset_id");
      resetField("category_id");
      resetField("price");
      resetField("unit");
      resetField("reason");
    };
  //#endregion

  //#region Render
  return (
    <Controller
      control={control}
      name="type_import"
      render={({ field: { onChange, ..._field }, fieldState: { error } }) => (
        <CAutocomplete
          {..._field}
          onChange={onTypeChange(onChange)}
          disabled={isEdit}
          options={IMPORT_ASSET_TYPES_OPTIONS}
          placeholder="Chọn loại nhập kho"
          error={!!error}
        />
      )}
    />
  );
  //#endregion
};
