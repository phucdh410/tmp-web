import { CButton } from "@controls";
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
      <CButton color="success" onClick={onCreate}>
        Thêm
      </CButton>
    </Stack>
  );
  //#endregion
};
