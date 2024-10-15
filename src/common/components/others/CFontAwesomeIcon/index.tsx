import React from "react";

import { Icon } from "@mui/material";
import classNames from "classnames";

import { ICFontAwesomeIconProps } from "./types";

export const CFontAwesomeIcon = ({
  icon,
  className,
  ...props
}: ICFontAwesomeIconProps) => {
  const fontawesomeClassName = React.isValidElement(icon)
    ? (icon.props as any).className
    : "";
  return (
    <Icon {...props} className={classNames(fontawesomeClassName, className)} />
  );
};
