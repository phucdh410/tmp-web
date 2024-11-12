import { Controller, Path } from "react-hook-form";

import { Stack } from "@mui/material";
import classNames from "classnames";

import { CNumberInput } from "../CNumberInput";

import { MUnitInput } from "./MUnitInput";
import { ICQuantityItemProps, IQuantityAndUnit } from "./types";

import "./styles.scss";

export const CQuantityItem = <T extends IQuantityAndUnit>({
  control,
  disabled,
}: ICQuantityItemProps<T>) => {
  return (
    <Stack direction="row" className={classNames("c-quantity-item")}>
      <Controller
        control={control}
        name={"quantity" as Path<T>}
        render={({ field, fieldState: { error } }) => (
          <CNumberInput
            {...field}
            disabled={disabled?.quantity}
            min={1}
            error={!!error}
            errorText={error?.message}
          />
        )}
      />
      <MUnitInput control={control} disabled={disabled?.unit} />
    </Stack>
  );
};
