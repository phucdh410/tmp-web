import { Controller, useController } from "react-hook-form";

import { unitsApi } from "@apis/units.api";
import { CAutocomplete } from "@controls";
import { toast } from "@funcs/toast";
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
      toast.success("Đã thêm đơn vị tính");
    } catch (error: any) {
      toast.error(error?.message ?? "Thêm đơn vị tính không thành công");
    }
  };
  //#endregion

  //#region Render
  return (
    <Controller
      control={control}
      name="unit"
      render={({ field }) => (
        <CAutocomplete
          options={units}
          creatable
          hidePopupIcon
          placeholder="Chọn ĐVT"
          easyCreate={onCreateUnit}
          {...field}
        />
      )}
    />
  );
  //#endregion
};
