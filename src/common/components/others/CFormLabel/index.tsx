import { FormLabel } from "@mui/material";
import classNames from "classnames";

import { ICFormLabelProps } from "./types";

export const CFormLabel = ({
  className,
  sx,
  children,
  ...props
}: ICFormLabelProps) => {
  return (
    <FormLabel
      className={classNames("c-form-label", className)}
      sx={{ flexShrink: 0, ...sx }}
      {...props}
    >
      {children}
    </FormLabel>
  );
};
