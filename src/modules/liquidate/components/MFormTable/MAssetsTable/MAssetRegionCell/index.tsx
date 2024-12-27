import { Controller, useWatch } from "react-hook-form";

import { regionsApi } from "@apis/regions.api";
import { CAutocomplete } from "@controls";
import { useQuery } from "@tanstack/react-query";

import { IMAssetRegionCellProps } from "./types";

export const MAssetRegionCell = ({
  control,
  index,
}: IMAssetRegionCellProps) => {
  //#region Data
  const store_code = useWatch({ control, name: "store_code" });

  const isSelectedAsset = Boolean(
    useWatch({ control, name: `assets.${index}.code` })
  );

  const { data: regions = [] } = useQuery({
    queryKey: ["danh-sach-vung-tai-san-tai-cua-hang", store_code],
    queryFn: () => regionsApi.getAll({ store_code }),
    enabled: !!store_code,
    select: (response) =>
      response?.data?.data?.map((e) => ({ ...e, label: e.name })),
  });
  //#endregion

  //#region Render
  return (
    <Controller
      control={control}
      name={`assets.${index}.region_id`}
      render={({ field }) => (
        <CAutocomplete
          disabled={isSelectedAsset}
          placeholder="Vùng tài sản"
          options={regions}
          {...field}
        />
      )}
    />
  );
  //#endregion
};
