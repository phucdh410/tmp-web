import { Controller, Path } from "react-hook-form";

import { CAutocomplete } from "@controls";
import { useGetAllStores } from "@hooks/options";

import { ICStoreInputProps, IStoreInput } from "./types";

export const CStoreInput = <T extends IStoreInput>({
  control,
  isEdit,
}: ICStoreInputProps<T>) => {
  //#region Data
  const { stores } = useGetAllStores();
  //#endregion

  //#region Render
  return (
    <Controller
      control={control}
      name={"store_code" as Path<T>}
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
