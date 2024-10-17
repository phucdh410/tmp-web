import React from "react";

import { Stack, StackProps } from "@mui/material";
import classNames from "classnames";

export interface ICFontAwesomeWrapperProps extends StackProps {
  icon: React.ReactElement<{ className: string }>;
}

export const CFontAwesomeWrapper = ({
  icon,
  className,
  height = 24,
  width = 24,
  ...props
}: ICFontAwesomeWrapperProps) => {
  //#region Data
  const iconClassName = React.isValidElement(icon) ? icon.props?.className : "";
  //#endregion
  return (
    <Stack
      component="i"
      alignItems="center"
      justifyContent="center"
      height={height}
      width={width}
      className={classNames(iconClassName, className)}
      {...props}
    ></Stack>
  );
};
