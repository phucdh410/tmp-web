import { Controller, useWatch } from "react-hook-form";

import { CAutocomplete } from "@controls";
import { useGetAllRegions } from "@hooks/options";

import { IMRegionInputProps } from "./types";

export const MRegionInput = ({ control }: IMRegionInputProps) => {
  //#region Data
  const store_code = useWatch({ control, name: "store_code" });

  const { regions } = useGetAllRegions({ store_code });
  //#endregion

  //#region Render
  return (
    <Controller
      control={control}
      name="region_id"
      render={({ field, fieldState: { error } }) => (
        <CAutocomplete
          {...field}
          options={regions}
          error={!!error}
          errorText={error?.message}
        />
      )}
    />
  );
  //#endregion
};
