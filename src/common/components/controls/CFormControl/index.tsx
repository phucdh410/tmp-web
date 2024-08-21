import { Box, FormHelperText } from "@mui/material";
import classNames from "classnames";

import { ICFormControlProps } from "./types";

export const CFormControl = ({
  error,
  errorText,
  fullWidth,
  children,
}: ICFormControlProps) => {
  return (
    <Box
      className={classNames("c-form-control form-control")}
      width={fullWidth ? "100%" : undefined}
    >
      {children}
      {!!error && errorText && <FormHelperText>{errorText}</FormHelperText>}
    </Box>
  );
};
