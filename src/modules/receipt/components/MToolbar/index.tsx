import { useRef } from "react";

import { ICImportPluginRef } from "@components/controls/CExcelButton/types";
import { CButton, CExcelButton, CFilterButton, CImportPlugin } from "@controls";
import { Stack } from "@mui/material";

export const MToolbar = () => {
  //#region Data
  const inputRef = useRef<null | ICImportPluginRef>(null);
  //#endregion

  //#region Event
  const onImport = () => {
    inputRef.current?.click();
  };

  const onInsertData = async () => {
    await new Promise((resolve) => setTimeout(resolve, 4000));
  };
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
        <CButton color="success">Thêm</CButton>
        <CExcelButton purpose="import" onClick={onImport} />
        <CExcelButton purpose="export" />
      </Stack>
      <CFilterButton />

      <CImportPlugin ref={inputRef} onProceed={onInsertData} />
    </Stack>
  );
  //#endregion
};
