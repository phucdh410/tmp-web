import { Controller } from "react-hook-form";

import { CAutocomplete } from "@controls";

import { IMAssetInputProps } from "./types";

export const MAssetInput = ({
  control,
  assets = [],
  setValue,
}: IMAssetInputProps) => {
  //#region Data

  //#endregion

  //#region Event
  //#endregion

  //#region Render
  return (
    <Controller
      control={control}
      name="asset_id"
      render={({ field }) => (
        <CAutocomplete
          {...field}
          options={assets}
          placeholder="Chọn mã tài sản"
        />
      )}
    />
  );
  //#endregion
};
