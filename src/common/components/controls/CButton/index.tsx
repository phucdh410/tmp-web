import { Button, CircularProgress } from "@mui/material";
import classNames from "classnames";

import { ICButtonProps } from "./types";

export const CButton: React.FC<ICButtonProps> = ({
  loading,
  className,
  disabled,
  children,
  startIcon,
  highlight = false,
  ...props
}) => {
  return (
    <Button
      className={classNames("c-button", highlight && "highlight", className)}
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
