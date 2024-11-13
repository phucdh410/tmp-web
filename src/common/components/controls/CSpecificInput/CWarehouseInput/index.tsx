import { Controller, Path } from "react-hook-form";

import { CAutocomplete } from "@controls";
import { useGetAllWarehouses } from "@hooks/options";

import { ICWarehouseInputProps, IWarehouseInput } from "./types";

export const CWarehouseInput = <T extends IWarehouseInput>({
  control,
  isEdit,
}: ICWarehouseInputProps<T>) => {
  //#region Data
  const { warehouses } = useGetAllWarehouses();
  //#endregion

  //#region Render
  return (
    <Controller
      control={control}
      name={"warehouse_id" as Path<T>}
      render={({ field, fieldState: { error } }) => (
        <CAutocomplete
          disabled={isEdit}
          options={warehouses}
          error={!!error}
          placeholder="Chọn kho tài sản"
          {...field}
        />
      )}
    />
  );
  //#endregion
};
