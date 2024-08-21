import { Button } from "@mui/material";
import classNames from "classnames";

import { ICButtonProps } from "./types";

export const CButton: React.FC<ICButtonProps> = ({
  loading,
  className,
  disabled,
  children,
  ...props
}) => {
  return (
    <Button
      className={classNames("c-button", className)}
      disabled={loading || disabled}
      {...props}
    >
      {children}
    </Button>
  );
};
