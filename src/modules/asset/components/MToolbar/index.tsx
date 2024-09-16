import { CButton, CExcelButton, CFilterButton } from "@controls";
import { Print } from "@mui/icons-material";
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
        <CExcelButton purpose="export" />
        <CButton
          disabled={!printable}
          onClick={onCodesPrint}
          startIcon={<Print />}
        >
          In mã
        </CButton>
      </Stack>
      <CFilterButton onClick={onOpenFilter} />
    </Stack>
  );
  //#endregion
};
