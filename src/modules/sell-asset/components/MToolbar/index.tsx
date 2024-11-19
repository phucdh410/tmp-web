import { CButton } from "@controls";
import { Stack } from "@mui/material";

import { IMToolbar } from "./types";

export const MToolbar = ({ onCreate }: IMToolbar) => {
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
        <CButton color="success" onClick={onCreate}>
          Thêm
        </CButton>
      </Stack>
    </Stack>
  );
  //#endregion
};
