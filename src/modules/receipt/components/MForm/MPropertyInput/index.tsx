import { Controller } from "react-hook-form";

import { CAutocomplete } from "@controls";
import { useGetAllProperties } from "@hooks/options";

import { IMPropertyInputProps } from "./types";

export const MPropertyInput = ({ control }: IMPropertyInputProps) => {
  //#region Data
  const { properties } = useGetAllProperties();
  //#endregion

  //#region Render
  return (
    <Controller
      control={control}
      name="properties"
      render={({ field }) => (
        <CAutocomplete multiple options={properties} {...field} />
      )}
    />
  );
  //#endregion
};
