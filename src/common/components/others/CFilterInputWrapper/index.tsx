import { Stack } from "@mui/material";

import { CFormLabel } from "../CFormLabel";

import { ICFilterInputWrapperProps } from "./types";

export const CFilterInputWrapper = ({
  children,
  sx,
  direction = "column",
  alignItems = "start",
  label,
  gap,
  ...props
}: ICFilterInputWrapperProps) => {
  return (
    <Stack direction={direction} alignItems={alignItems} gap={0.5} {...props}>
      <CFormLabel sx={{ fontWeight: 500 }}>{label}</CFormLabel>
      {children}
    </Stack>
  );
};
