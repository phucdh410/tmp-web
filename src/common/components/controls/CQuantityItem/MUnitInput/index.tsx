import { useEffect } from "react";
import { Controller, Path, useController } from "react-hook-form";

import { unitsApi } from "@apis/units.api";
import { CAutocomplete } from "@controls";
import { MESSAGES, noti } from "@funcs/toast";
import { useGetAllUnits } from "@hooks/options";

import { IQuantityAndUnit } from "../types";

import { ICUnitInputProps } from "./types";

export const MUnitInput = <T extends IQuantityAndUnit>({
  control,
}: ICUnitInputProps<T>) => {
  //#region Data
  const { units, refetch } = useGetAllUnits();

  const {
    field: { value: currentUnitValue, onChange },
  } = useController({ control, name: "unit" as Path<T> });
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

  useEffect(() => {
    if (units.length && !currentUnitValue) {
      onChange(units[0].id);
    }
  }, [units, currentUnitValue]);

  //#region Render
  return (
    <Controller
      control={control}
      name={"unit" as Path<T>}
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
