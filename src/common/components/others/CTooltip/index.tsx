import { styled, Tooltip } from "@mui/material";
import classNames from "classnames";

import { ICTooltipProps } from "./types";

const StyledTooltip = styled(Tooltip)(() => ({
  width: "100%",
}));

export const CTooltip = ({ children, className, ...props }: ICTooltipProps) => {
  return (
    <StyledTooltip className={classNames("c-tooltip", className)} {...props}>
      <span>{children}</span>
    </StyledTooltip>
  );
};
