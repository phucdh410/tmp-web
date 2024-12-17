import { useState } from "react";

import { CTab, CTabPanel, CTabs } from "@others";

import { MAssetsTable } from "./MAssetsTable";
import { MDocumentsTable } from "./MDocumentsTable";
import { IMFormTableProps } from "./types";

export const MFormTable = ({
  control,
  isEdit = false,
  setValue,
}: IMFormTableProps) => {
  //#region Data
  const [tab, setTab] = useState<1 | 2>(1);
  //#endregion

  //#region Event
  const onTabChange = (event: React.SyntheticEvent, value: 1 | 2) => {
    setTab(value);
  };
  //#endregion

  //#region Render
  return (
    <>
      <CTabs value={tab} onChange={onTabChange}>
        <CTab value={1} label="Tài sản" />
        <CTab value={2} label="Chứng từ" />
      </CTabs>

      <CTabPanel value={tab} tabValue={1}>
        <MAssetsTable control={control} isEdit={isEdit} setValue={setValue} />
      </CTabPanel>
      <CTabPanel value={tab} tabValue={2}>
        <MDocumentsTable control={control} />
      </CTabPanel>
    </>
  );
  //#endregion
};
