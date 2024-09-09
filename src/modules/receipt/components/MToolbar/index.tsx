import { useRef } from "react";

import { receiptsApi } from "@apis/receipts.api";
import { ICImportPluginRef } from "@components/controls/CExcelButton/types";
import { CButton, CExcelButton, CFilterButton, CImportPlugin } from "@controls";
import { toast } from "@funcs/toast";
import { Print } from "@mui/icons-material";
import { Stack } from "@mui/material";

import { IMToolbar } from "./types";

export const MToolbar = ({ onCodesPrint }: IMToolbar) => {
  //#region Data
  const inputRef = useRef<null | ICImportPluginRef>(null);
  //#endregion

  //#region Event
  const onImport = () => {
    inputRef.current?.click();
  };

  const onInsertData = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      await receiptsApi.importExcel(formData);
      toast.success("Import dữ liệu thành công");
    } catch (error: any) {
      toast.error(error?.message ?? "Import dữ liệu không thành công");
    }
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
        <CButton disabled={!onCodesPrint} startIcon={<Print />}>
          In mã
        </CButton>
      </Stack>
      <CFilterButton />

      <CImportPlugin ref={inputRef} onProceed={onInsertData} />
    </Stack>
  );
  //#endregion
};
