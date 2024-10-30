import { Stack } from "@mui/material";

import { ICFormInputWrapperProps } from "./types";

export const CFormInputWrapper = ({
  children,
  sx,
  percent,
  direction = "row",
  alignItems = "center",
  justifyContent = "space-between",
  ...props
}: ICFormInputWrapperProps) => {
  return (
    <Stack
      direction={direction}
      alignItems={alignItems}
      justifyContent={justifyContent}
      sx={{
        "> label": { flexBasis: percent ? `${percent.label}%` : "auto" },
        "> div": {
          flexBasis: percent ? `${percent.input}%` : "auto",
          maxWidth: percent ? `${percent.input}%` : "none",
        },
        ...sx,
      }}
      {...props}
    >
      {children}
    </Stack>
  );
};
