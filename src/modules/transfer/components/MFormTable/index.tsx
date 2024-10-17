import { useState } from "react";

import { CTabPanel } from "@others";

import { MAssetsTable } from "./MAssetsTable";
import { MDocumentsTable } from "./MDocumentsTable";
import { StyledTab, StyledTabs } from "./StyledComponents";
import { IMFormTableProps } from "./types";

export const MFormTable = ({ control, isEdit = false }: IMFormTableProps) => {
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
      <StyledTabs value={tab} onChange={onTabChange}>
        <StyledTab value={1} label="Tài sản" />
        <StyledTab value={2} label="Chứng từ" />
      </StyledTabs>

      <CTabPanel value={tab} tabValue={1}>
        <MAssetsTable control={control} isEdit={isEdit} />
      </CTabPanel>
      <CTabPanel value={tab} tabValue={2}>
        <MDocumentsTable control={control} />
      </CTabPanel>
    </>
  );
  //#endregion
};
