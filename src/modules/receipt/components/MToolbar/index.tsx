import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import { receiptsApi } from "@apis/receipts.api";
import { ICImportPluginRef } from "@components/controls/CExcelButton/types";
import { CButton, CExcelButton, CFilterButton, CImportPlugin } from "@controls";
import { toast } from "@funcs/toast";
import { Print } from "@mui/icons-material";
import { Stack } from "@mui/material";

import { IMToolbar } from "./types";

export const MToolbar = ({
  printable,
  onCodesPrint,
  onOpenFilter,
}: IMToolbar) => {
  //#region Data
  const inputRef = useRef<null | ICImportPluginRef>(null);

  const navigate = useNavigate();
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
        <CButton color="success" onClick={onGoCreatePage}>
          Thêm
        </CButton>
        <CExcelButton purpose="import" onClick={onImport} />
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

      <CImportPlugin ref={inputRef} onProceed={onInsertData} />
    </Stack>
  );
  //#endregion
};
