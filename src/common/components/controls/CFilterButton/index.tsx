import { FilterAlt } from "@mui/icons-material";

import { CButton } from "../CButton";

import { ICFilterButtonProps } from "./types";

export const CFilterButton = ({
  children = "Bộ lọc",
  ...props
}: ICFilterButtonProps) => {
  return (
    <CButton variant="outlined" startIcon={<FilterAlt />} {...props}>
      {children}
    </CButton>
  );
};
