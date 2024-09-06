import { FilterAlt } from "@mui/icons-material";

import { CButton } from "../CButton";

import { ICFilterButtonProps } from "./types";

export const CFilterButton = ({
  children = "Bộ lọc",
  sx,
  ...props
}: ICFilterButtonProps) => {
  return (
    <CButton
      variant="outlined"
      startIcon={<FilterAlt />}
      sx={{ flexShrink: 0, ...sx }}
      {...props}
    >
      {children}
    </CButton>
  );
};
