import { useEffect } from "react";
import { Controller, useController, useWatch } from "react-hook-form";

import { CNumberInput } from "@controls";

import { IDepreciationCostInputProps } from "./types";

export const MDepreciationCostInput = ({
  control,
}: IDepreciationCostInputProps) => {
  //#region Data
  const depreciation_duration = useWatch({
    control,
    name: "depreciation_duration",
  });
  const price = useWatch({ control, name: "price" });
  const amount = useWatch({ control, name: "amount" });

  const {
    field: { onChange },
  } = useController({ control, name: "depreciation_cost" });
  //#endregion

  useEffect(() => {
    if (depreciation_duration === 0) {
      onChange(0);
    } else {
      const result = amount / depreciation_duration;
      onChange(result);
    }
  }, [depreciation_duration, price, amount]);

  //#region Render
  return (
    <Controller
      control={control}
      name="depreciation_cost"
      render={({ field }) => (
        <CNumberInput readOnly {...field} suffix="VNĐ/kỳ" />
      )}
    />
  );
  //#endregion
};
