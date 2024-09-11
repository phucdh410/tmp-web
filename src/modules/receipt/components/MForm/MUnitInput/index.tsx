import { Controller } from "react-hook-form";

import { CAutocomplete } from "@controls";
import { useGetAllUnits } from "@hooks/options";

import { IMUnitInputProps } from "./types";

export const MUnitInput = ({ control }: IMUnitInputProps) => {
  //#region Data
  const { units } = useGetAllUnits();
  //#endregion

  //#region Render
  return (
    <Controller
      control={control}
      name="unit"
      render={({ field }) => (
        <CAutocomplete options={units} creatable {...field} />
      )}
    />
  );
  //#endregion
};
