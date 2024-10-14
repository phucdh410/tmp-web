import { Controller } from "react-hook-form";

import { CAutocomplete } from "@controls";
import { useGetAllStores } from "@hooks/options";

import { IMStoreInputProps } from "./types";

export const MStoreInput = ({ control, isEdit }: IMStoreInputProps) => {
  //#region Data
  const { stores } = useGetAllStores();
  //#endregion

  //#region Render
  return (
    <Controller
      control={control}
      name="store_code"
      render={({ field, fieldState: { error } }) => (
        <CAutocomplete
          disabled={isEdit}
          options={stores}
          error={!!error}
          placeholder="Chọn chi nhánh"
          {...field}
        />
      )}
    />
  );
  //#endregion
};
