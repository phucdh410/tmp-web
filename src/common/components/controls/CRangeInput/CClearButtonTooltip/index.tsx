import { ReactElement } from "react";

import { Loop } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";

export const CClearButtonTooltip = ({
  onClick,
  children,
}: {
  onClick?: () => void;
  children: ReactElement;
}) => {
  return (
    <Tooltip
      arrow={false}
      placement="top-end"
      leaveDelay={600}
      title={
        <IconButton onClick={onClick} color="error" sx={{ p: 0.45 }}>
          <Loop
            sx={{
              height: "0.95em",
              width: "0.95em",
              transform: "rotate(-30deg)",
            }}
          />
        </IconButton>
      }
      slotProps={{
        tooltip: {
          sx: {
            p: 0,
            m: 0,
            mr: 1,
            marginBottom: "-5px!important",
            backgroundColor: "#ffffff",
            border: "1px solid #ADAAAA4D",
            borderRadius: "100%",
          },
        },
      }}
    >
      {children!}
    </Tooltip>
  );
};
