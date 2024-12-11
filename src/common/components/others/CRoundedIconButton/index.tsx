import { Avatar, ButtonBase } from "@mui/material";

import { ICRoundedIconButtonProps } from "./types";

const SIZE_STYLES = {
  small: { iconSize: 14, buttonSize: 22, borderRadius: 8, borderWidth: 1 },
  medium: { iconSize: 18, buttonSize: 28, borderRadius: 8, borderWidth: 2 },
  large: { iconSize: 24, buttonSize: 34, borderRadius: 10, borderWidth: 2 },
};

export const CRoundedIconButton = ({
  children,
  size = "medium",
  ...props
}: ICRoundedIconButtonProps) => {
  return (
    <ButtonBase
      sx={{
        padding: "6px",
        borderRadius: `${SIZE_STYLES[size].borderRadius}px`,
        ...props.sx,
      }}
      {...props}
    >
      <Avatar
        variant="rounded"
        sx={{
          height: SIZE_STYLES[size].buttonSize,
          width: SIZE_STYLES[size].buttonSize,
          padding: "4px",
          borderRadius: `${SIZE_STYLES[size].borderRadius}px`,
          background: "white",
          color: "currentcolor",
          border: "2px solid currentColor",
          borderWidth: `${SIZE_STYLES[size].borderWidth}px`,
          ".MuiSvgIcon-root": {
            height: SIZE_STYLES[size].iconSize,
            width: SIZE_STYLES[size].iconSize,
          },
        }}
      >
        {children}
      </Avatar>
    </ButtonBase>
  );
};
