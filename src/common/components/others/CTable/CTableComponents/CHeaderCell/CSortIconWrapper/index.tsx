import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { Stack } from "@mui/material";

import { ICSortIconWrapperProps } from "./types";

export const CSortIconWrapper = ({ sorter }: ICSortIconWrapperProps) => {
  //#region Render
  return (
    <Stack display="inline-flex" ml={0.2}>
      <KeyboardArrowUp
        sx={{
          fontSize: "1.35rem",
          marginBlock: "-6.5px",
          color:
            sorter === "asc"
              ? "#7bff61"
              : sorter !== "default"
              ? "#ffffff70"
              : "white",
        }}
      />
      <KeyboardArrowDown
        sx={{
          fontSize: "1.35rem",
          marginBlock: "-6.5px",
          color:
            sorter === "desc"
              ? "#7bff61"
              : sorter !== "default"
              ? "#ffffff70"
              : "white",
        }}
      />
    </Stack>
  );
  //#endregion
};
