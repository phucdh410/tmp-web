import { useRef, useState } from "react";

import { ICImportPluginRef } from "@components/controls/CExcelButton/types";
import {
  CButton,
  CExcelButton,
  CFilterButton,
  CImportPlugin,
  CRadioButton,
} from "@controls";
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
  const [value, setValue] = useState(1);
  console.log("🚀 ~ MToolbar ~ value:", value);
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
      <CRadioButton
        value={value}
        onChange={setValue}
        options={[
          { value: 1, label: "Barcode" },
          { value: 2, label: "QR Code" },
        ]}
      />
      <CFilterButton />

      <CImportPlugin ref={inputRef} onProceed={onInsertData} />
    </Stack>
  );
  //#endregion
};
