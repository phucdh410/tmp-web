import { CToolbarButtons } from "@controls";
import { Stack } from "@mui/material";

import { IMToolbar } from "./types";

export const MToolbar = ({
  printable,
  onCodesPrint,
  onOpenFilter,
}: IMToolbar) => {
  //#region Data
  //#endregion

  //#region Event
  //#endregion

  //#region Render
  return (
    <Stack
      mt={4}
      mb={2}
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Stack direction="row" gap={1}>
        <CToolbarButtons.Export />
        <CToolbarButtons.Print>In mã</CToolbarButtons.Print>
      </Stack>
      <CToolbarButtons.Filter onClick={onOpenFilter}>
        Bộ lọc
      </CToolbarButtons.Filter>
    </Stack>
  );
  //#endregion
};
