import { Controller, useWatch } from "react-hook-form";

import { CAutocomplete } from "@controls";
import { useGetAllPlaces } from "@hooks/options";

import { IMPlaceInputProps } from "./types";

export const MPlaceInput = ({ control }: IMPlaceInputProps) => {
  //#region Data
  const store_code = useWatch({ control, name: "store_code" });

  const { places } = useGetAllPlaces({ store_code });
  //#endregion

  //#region Render
  return (
    <Controller
      control={control}
      name="place_id"
      render={({ field, fieldState: { error } }) => (
        <CAutocomplete
          {...field}
          disabled={!store_code}
          options={places}
          error={!!error}
        />
      )}
    />
  );
  //#endregion
};
