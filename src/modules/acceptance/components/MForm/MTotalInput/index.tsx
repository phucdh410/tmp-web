import { useEffect } from "react";
import { Controller, useController, useWatch } from "react-hook-form";

import { CNumberInput } from "@controls";

import { IMTotalInputProps } from "./types";

export const MTotalInput = ({ control }: IMTotalInputProps) => {
  //#region Data
  const assets = useWatch({ control, name: "assets" });

  const {
    field: { onChange },
  } = useController({ control, name: "total" });
  //#endregion

  useEffect(() => {
    const total = assets.reduce((prev, cur) => prev + cur.total, 0);
    onChange(total);
  }, [assets]);

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
