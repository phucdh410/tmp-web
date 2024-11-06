import { useEffect } from "react";
import { Controller, useController, useWatch } from "react-hook-form";

import { CNumberInput } from "@controls";

import { IAllocationAmountInputProps } from "./types";

export const MAllocationAmountInput = ({
  control,
  disabled,
}: IAllocationAmountInputProps) => {
  //#region Data
  const allocation_period = useWatch({
    control,
    name: "allocation_period",
  });
  const price = useWatch({ control, name: "price" });
  const total = useWatch({ control, name: "total" });

  const {
    field: { onChange },
  } = useController({ control, name: "allocation_amount" });
  //#endregion

  useEffect(() => {
    if (allocation_period === 0) {
      onChange(0);
    } else {
      const result = total / allocation_period;
      onChange(result);
    }
  }, [allocation_period, price, total]);

  //#region Render
  return (
    <Controller
      control={control}
      name="allocation_amount"
      render={({ field }) => (
        <CNumberInput readOnly {...field} disabled={disabled} suffix="VNĐ/kỳ" />
      )}
    />
  );
  //#endregion
};
