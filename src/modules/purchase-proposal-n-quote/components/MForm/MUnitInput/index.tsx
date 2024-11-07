import { Controller, useController } from "react-hook-form";

import { unitsApi } from "@apis/units.api";
import { CAutocomplete } from "@controls";
import { MESSAGES, noti } from "@funcs/toast";
import { useGetAllUnits } from "@hooks/options";

import { IMUnitInputProps } from "./types";

export const MUnitInput = ({ control }: IMUnitInputProps) => {
  //#region Data
  const { units, refetch } = useGetAllUnits();

  const {
    field: { onChange },
  } = useController({ control, name: "unit" });
  //#endregion

  //#region Event
  const onCreateUnit = async (name: string) => {
    try {
      await unitsApi.create({ name });
      refetch();
      onChange(name);
      noti.success(MESSAGES("đơn vị tính").SUCCESS.CREATE);
    } catch (error: any) {
      noti.error(error?.message ?? MESSAGES("đơn vị tính").ERROR.CREATE);
    }
  };
  //#endregion

  //#region Render
  return (
    <Controller
      control={control}
      name="unit"
      render={({ field, fieldState: { error } }) => (
        <CAutocomplete
          options={units}
          creatable
          hidePopupIcon
          placeholder="Chọn ĐVT"
          easyCreate={onCreateUnit}
          error={!!error}
          {...field}
        />
      )}
    />
  );
  //#endregion
};
