import { CExcelButton } from "@controls";
import { Stack } from "@mui/material";

import { IMToolbarProps } from "./types";

export const MToolbar = ({ onExport }: IMToolbarProps) => {
  return (
    <Stack
      mt={4}
      mb={2}
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Stack direction="row" gap={1}>
        <CExcelButton purpose="export" onClick={onExport} />
      </Stack>
    </Stack>
  );
};
