import { Controller } from "react-hook-form";

import { CAutocomplete } from "@controls";
import { useGetAllStores } from "@hooks/options";

import { IMStoreInputProps } from "./types";

export const MStoreInput = ({ control }: IMStoreInputProps) => {
  //#region Data
  const { stores } = useGetAllStores();
  //#endregion

  //#region Render
  return (
    <Controller
      control={control}
      name="store_code"
      render={({ field }) => <CAutocomplete options={stores} {...field} />}
    />
  );
  //#endregion
};
