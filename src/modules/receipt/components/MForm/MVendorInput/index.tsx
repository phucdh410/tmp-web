import { Controller } from "react-hook-form";

import { CAutocomplete } from "@controls";
import { useGetAllVendors } from "@hooks/options";

import { IMVendorInputProps } from "./types";

export const MVendorInput = ({ control }: IMVendorInputProps) => {
  //#region Data
  const { vendors } = useGetAllVendors();
  //#endregion

  //#region Render
  return (
    <Controller
      control={control}
      name="vendor_id"
      render={({ field }) => (
        <CAutocomplete options={vendors} creatable {...field} />
      )}
    />
  );
  //#endregion
};
