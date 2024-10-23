import { useState } from "react";

import { CTab, CTabPanel, CTabs } from "@others";

import { MAllocationTable } from "./MAllocationTable";
import { MOriginOfFormation } from "./MOriginOfFormation";
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
      <CTabs value={tab} onChange={onTabChange}>
        <CTab value={1} label="Phân bổ" />
        <CTab value={2} label="Nguồn gốc hình thành" />
      </CTabs>

      <CTabPanel value={tab} tabValue={1}>
        <MAllocationTable control={control} isEdit={isEdit} />
      </CTabPanel>
      <CTabPanel value={tab} tabValue={2}>
        <MOriginOfFormation control={control} />
      </CTabPanel>
    </>
  );
  //#endregion
};
