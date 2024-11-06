import { useEffect } from "react";
import { Controller, useController, useWatch } from "react-hook-form";

import { CNumberInput } from "@controls";

import { IMDepreciationCostInputProps } from "./types";

export const MDepreciationCostInput = ({
  control,
  disabled,
}: IMDepreciationCostInputProps) => {
  //#region Data
  const depreciation_duration = useWatch({
    control,
    name: "depreciation_duration",
  });
  const price = useWatch({ control, name: "price" });
  const total = useWatch({ control, name: "total" });

  const {
    field: { onChange },
  } = useController({ control, name: "depreciation_cost" });
  //#endregion

  useEffect(() => {
    if (depreciation_duration === 0) {
      onChange(0);
    } else {
      const result = total / depreciation_duration;
      onChange(result);
    }
  }, [depreciation_duration, price, total]);

  //#region Render
  return (
    <Controller
      control={control}
      name="depreciation_cost"
      render={({ field }) => (
        <CNumberInput readOnly {...field} disabled={disabled} suffix="VNĐ/kỳ" />
      )}
    />
  );
  //#endregion
};
