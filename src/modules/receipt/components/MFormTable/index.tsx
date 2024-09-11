import { useState } from "react";

import { MAllocationTable } from "./MAllocationTable";
import { MOriginOfFormation } from "./MOriginOfFormation";
import { StyledTab, StyledTabs } from "./StyledComponents";
import { IMFormTableProps } from "./types";

export const MFormTable = ({ control }: IMFormTableProps) => {
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
        <StyledTab value={1} label="Phân bổ" />
        <StyledTab value={2} label="Nguồn gốc hình thành" />
      </StyledTabs>

      {tab === 1 ? (
        <MAllocationTable control={control} />
      ) : (
        <MOriginOfFormation />
      )}
    </>
  );
  //#endregion
};
