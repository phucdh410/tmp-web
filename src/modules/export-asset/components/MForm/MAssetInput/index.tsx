import { Controller, useWatch } from "react-hook-form";

import { assetsApi } from "@apis/assets.api";
import { CAutocomplete } from "@controls";
import { useQuery } from "@tanstack/react-query";

import { IMAssetInputProps } from "./types";

export const MAssetInput = ({ control }: IMAssetInputProps) => {
  //#region Data
  const warehouse_id = useWatch({ control, name: "warehouse_id" });

  const { data: assets = [] } = useQuery({
    queryKey: ["danh-sach-tai-san-theo-kho", warehouse_id],
    queryFn: () => assetsApi.getByWarehouseId(warehouse_id),
    enabled: !!warehouse_id && warehouse_id !== -1,
    select: (response) =>
      response?.data?.data?.map((e) => ({ id: e.id, label: e.code! })),
  });
  //#endregion

  //#region Event
  //#endregion

  //#region Render
  return (
    <Controller
      control={control}
      name="asset_id"
      render={({ field, fieldState: { error } }) => (
        <CAutocomplete
          {...field}
          options={assets}
          error={!!error}
          placeholder="Chọn tài sản"
        />
      )}
    />
  );
  //#endregion
};
