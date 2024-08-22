import { Button, CircularProgress } from "@mui/material";
import classNames from "classnames";

import { ICButtonProps } from "./types";

export const CButton: React.FC<ICButtonProps> = ({
  loading,
  className,
  disabled,
  children,
  startIcon,
  ...props
}) => {
  return (
    <Button
      className={classNames("c-button", className)}
      disabled={loading || disabled}
      startIcon={
        loading ? (
          <CircularProgress id="c-button-loading-icon" />
        ) : (
          startIcon ?? undefined
        )
      }
      {...props}
    >
      {children}
    </Button>
  );
};
