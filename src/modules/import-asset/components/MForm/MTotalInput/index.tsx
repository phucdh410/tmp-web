import { useEffect } from "react";
import { Controller, useController, useWatch } from "react-hook-form";

import { CNumberInput } from "@controls";

import { IMTotalInputProps } from "./types";

export const MTotalInput = ({ control }: IMTotalInputProps) => {
  //#region Data
  const quantity = useWatch({ control, name: "quantity" });
  const price = useWatch({ control, name: "price" });

  const {
    field: { onChange },
  } = useController({ control, name: "total" });
  //#endregion

  useEffect(() => {
    const result = quantity * price;
    onChange(result);
  }, [quantity, price]);

  //#region Render
  return (
    <Controller
      control={control}
      name="total"
      render={({ field }) => <CNumberInput readOnly {...field} suffix="VNĐ" />}
    />
  );
  //#endregion
};
