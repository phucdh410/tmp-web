import { Controller, Path } from "react-hook-form";

import { CAutocomplete } from "@controls";
import { useGetAllStores } from "@hooks/options";

import { ICStoreInputProps, IStoreInput } from "./types";

export const CStoreInput = <T extends IStoreInput>({
  control,
  isEdit,
  disabled,
}: ICStoreInputProps<T>) => {
  //#region Data
  const { stores, loading } = useGetAllStores();
  //#endregion

  //#region Render
  return (
    <Controller
      control={control}
      name={"store_code" as Path<T>}
      render={({ field, fieldState: { error } }) => (
        <CAutocomplete
          disabled={disabled || isEdit}
          loading={loading}
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
