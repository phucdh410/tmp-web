import { useNavigate } from "react-router-dom";

import { CToolbarButtons } from "@controls";
import { Stack } from "@mui/material";

import { IMToolbar } from "./types";

export const MToolbar = ({ onOpenFilter, onExport }: IMToolbar) => {
  //#region Data

  const navigate = useNavigate();
  //#endregion

  //#region Event
  const onGoCreatePage = () => navigate("create");
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
        <CToolbarButtons.Add onClick={onGoCreatePage}>Thêm</CToolbarButtons.Add>
        <CToolbarButtons.Export onClick={onExport} />
      </Stack>
      <CToolbarButtons.Filter onClick={onOpenFilter}>
        Bộ lọc
      </CToolbarButtons.Filter>
    </Stack>
  );
  //#endregion
};
