import { ButtonGroup } from "@mui/material";
import classNames from "classnames";

import { ICButtonGroupProps } from "./types";

export const CButtonGroup = ({
  variant = "contained",
  className,
  children,
}: ICButtonGroupProps) => {
  return (
    <ButtonGroup
      className={classNames("c-button-group", className)}
      variant={variant}
    >
      {children}
    </ButtonGroup>
  );
};
