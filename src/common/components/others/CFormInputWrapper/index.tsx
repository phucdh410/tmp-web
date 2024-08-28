import { Stack } from "@mui/material";

import { ICFormInputWrapperProps } from "./types";

export const CFormInputWrapper = ({
  children,
  sx,
  percent,
  direction = "row",
  alignItems = "center",
  ...props
}: ICFormInputWrapperProps) => {
  return (
    <Stack
      direction={direction}
      alignItems={alignItems}
      sx={{
        label: { flexBasis: percent ? `${percent.label}%` : "auto" },
        "> div": { flexBasis: percent ? `${percent.input}%` : "auto" },
        ...sx,
      }}
      {...props}
    >
      {children}
    </Stack>
  );
};
