import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import { receiptsApi } from "@apis/receipts.api";
import { ICImportPluginRef } from "@components/controls/CExcelButton/types";
import { CImportPlugin, CToolbarButtons } from "@controls";
import { noti } from "@funcs/toast";
import { Stack } from "@mui/material";

import { IMToolbar } from "./types";

export const MToolbar = ({ onOpenFilter, onExport }: IMToolbar) => {
  //#region Data
  const inputRef = useRef<ICImportPluginRef>(null);

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
      noti.success("Import dữ liệu thành công");
    } catch (error: any) {
      noti.error(error?.message ?? "Import dữ liệu không thành công");
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
        <CToolbarButtons.Add onClick={onGoCreatePage}>Thêm</CToolbarButtons.Add>
        <CToolbarButtons.Import onClick={onImport} />
        <CToolbarButtons.Export onClick={onExport} />
      </Stack>
      <CToolbarButtons.Filter onClick={onOpenFilter}>
        Bộ lọc
      </CToolbarButtons.Filter>

      <CImportPlugin ref={inputRef} onProceed={onInsertData} />
    </Stack>
  );
  //#endregion
};
