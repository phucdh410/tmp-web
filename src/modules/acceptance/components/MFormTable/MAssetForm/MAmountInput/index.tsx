import { useEffect } from "react";
import { Controller, useController, useWatch } from "react-hook-form";

import { CNumberInput } from "@controls";

import { IMAmountInputProps } from "./types";

export const MAmountInput = ({ control }: IMAmountInputProps) => {
  //#region Data
  const price = useWatch({ control, name: "price" });
  const quantity = useWatch({ control, name: "quantity" });

  const {
    field: { onChange },
  } = useController({ control, name: "amount" });
  //#endregion

  useEffect(() => {
    onChange(price * quantity);
  }, [price, quantity]);

  //#region Render
  return (
    <>
      <Controller
        control={control}
        name="amount"
        render={({ field }) => <CNumberInput readOnly {...field} />}
      />
    </>
  );
  //#endregion
};
