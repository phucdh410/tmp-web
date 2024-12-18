import { CToolbarButtons } from "@controls";
import { Stack } from "@mui/material";

import { IMToolbarProps } from "./types";

export const MToolbar = ({ onCreate }: IMToolbarProps) => {
  //#region Render
  return (
    <Stack
      mt={4}
      mb={2}
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <CToolbarButtons.Add onClick={onCreate}>Thêm</CToolbarButtons.Add>
    </Stack>
  );
  //#endregion
};
