import { Tooltip } from "@mui/material";
import classNames from "classnames";

import { ICTooltipProps } from "./types";

export const CTooltip = ({ children, className, ...props }: ICTooltipProps) => {
  return (
    <Tooltip className={classNames("c-tooltip", className)} {...props}>
      <span>{children}</span>
    </Tooltip>
  );
};
