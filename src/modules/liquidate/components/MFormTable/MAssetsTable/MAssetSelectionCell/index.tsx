import { Controller, useWatch } from "react-hook-form";

import { assetsApi } from "@apis/assets.api";
import { CAutocomplete } from "@controls";
import { useQuery } from "@tanstack/react-query";

import { IMAssetSelectionCellProps } from "./types";

export const MAssetSelectionCell = ({
  control,
  setValue,
  index,
  display,
}: IMAssetSelectionCellProps) => {
  //#region Data
  const store_code = useWatch({ control, name: "store_code" });
  const region_id = useWatch({ control, name: `assets.${index}.region_id` });

  const { data: assets = [] } = useQuery({
    queryKey: ["danh-sach-tai-san-tai-chi-nhanh", store_code, region_id],
    queryFn: () => assetsApi.getAll({ store_code, region_id }),
    enabled: !!store_code && !!region_id,
    select: (response) =>
      response?.data?.data?.map((e) => ({
        ...e,
        databaseId: e.id,
        label: e.name,
        id: e.code,
      })),
  });
  //#endregion

  //#region Event
  const onAssetChange =
    (onChangeCallback: (...event: any[]) => void, index: number) =>
    (
      value: string,
      event: React.SyntheticEvent<Element, Event> | undefined,
      selectedOption: any
    ) => {
      onChangeCallback(value);
      // setValue(
      //   `assets.${index}.original_price`,
      //   (selectedOption as IAssetInAll).original_price
      // );
      // setValue(
      //   `assets.${index}.depreciation_accumulation`,
      //   (selectedOption as IAssetInAll).depreciation_accumulation
      // );
      // setValue(
      //   `assets.${index}.depreciation_duration`,
      //   (selectedOption as IAssetInAll).depreciation_duration
      // );
    };
  //#endregion

  //#region Render
  return (
    <Controller
      control={control}
      name={`assets.${index}.code`}
      render={({ field: { onChange, ..._field }, fieldState: { error } }) => (
        <CAutocomplete
          {..._field}
          disabled={!region_id}
          display={display}
          error={!!error}
          placeholder="Chọn tài sản"
          options={assets}
          onChange={onAssetChange(onChange, index)}
        />
      )}
    />
  );
  //#endregion
  return <></>;
};
