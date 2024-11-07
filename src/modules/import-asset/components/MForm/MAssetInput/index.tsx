import { Controller } from "react-hook-form";

import { assetsApi } from "@apis/assets.api";
import { IAutocompleteOption } from "@components/controls/CAutocomplete/types";
import { CAutocomplete } from "@controls";
import { MESSAGES, noti } from "@funcs/toast";

import { IMAssetInputProps } from "./types";

export const MAssetInput = ({
  control,
  assets = [],
  setValue,
}: IMAssetInputProps) => {
  //#region Data
  //#endregion

  //#region Event
  const onGetDetailAsset = async (code: string) => {
    try {
      const res = await assetsApi.getByCode(code);
      const assetData = res.data.data;
      setValue("asset_name", assetData.name);
      setValue("reason", assetData.reason);
      setValue("price", assetData.price);
      setValue("unit", assetData.unit);
      setValue("category_id", Number(assetData.category.id));
    } catch (error: any) {
      noti.error(error?.message ?? MESSAGES("tài sản").ERROR.GET_DETAIL);
    }
  };

  const onAssetChange =
    (onChangeCallback: (...event: any[]) => void) =>
    (
      value: any,
      event?: React.SyntheticEvent,
      selectedOption?: IAutocompleteOption | IAutocompleteOption[] | null
    ) => {
      onChangeCallback(value);

      onGetDetailAsset((selectedOption as IAutocompleteOption)?.code);
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
          isDirtyOptions
          virtual
        />
      )}
    />
  );
  //#endregion
};
