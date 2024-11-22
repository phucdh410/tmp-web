import { RadioGroup } from "@mui/material";

import { ICRadioWrapperProps } from "./types";

export const CRadioWrapper = <T extends object>({
  value,
  onChange,
  type,
  children,
}: ICRadioWrapperProps<T>) => {
  return type === "radio" ? (
    <RadioGroup value={value ?? null} onChange={onChange}>
      {children}
    </RadioGroup>
  ) : (
    children
  );
};
