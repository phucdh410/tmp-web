import { Controller } from "react-hook-form";

import { assetsApi } from "@apis/assets.api";
import { CAutocomplete } from "@controls";
import { MESSAGES, toast } from "@funcs/toast";

import { IMAssetInputProps } from "./types";

export const MAssetInput = ({
  control,
  assets = [],
  setValue,
}: IMAssetInputProps) => {
  //#region Data
  //#endregion

  //#region Event
  const onGetDetailAsset = async (id: string | number) => {
    try {
      const res = await assetsApi.getById(id);
      const assetData = res.data.data;
      console.log("🚀 ~ onGetDetailAsset ~ assetData:", assetData);
    } catch (error: any) {
      toast.error(error?.message ?? MESSAGES("tài sản").ERROR.GET_DETAIL);
    }
  };

  const onAssetChange =
    (onChangeCallback: (...event: any[]) => void) => (value: any) => {
      onChangeCallback(value);

      onGetDetailAsset(value);
    };
  //#endregion

  //#region Render
  return (
    <Controller
      control={control}
      name="asset_id"
      render={({ field: { onChange, ..._field } }) => (
        <CAutocomplete
          {..._field}
          onChange={onAssetChange(onChange)}
          options={assets}
          placeholder="Chọn mã tài sản"
        />
      )}
    />
  );
  //#endregion
};
