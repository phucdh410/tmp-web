import { useState } from "react";

import { Stack } from "@mui/material";
import { CTab, CTabPanel, CTabs } from "@others";

import { MRegionsTable } from "./MRegionsTable";
import { MStoresTable } from "./MStoresTable";

type TUserDetailTabs = "store" | "region";

export const MUserDetail = () => {
  //#region Data
  const [tab, setTab] = useState<TUserDetailTabs>("store");
  //#endregion

  //#region Event
  const onTabChange = (event: React.SyntheticEvent, value: TUserDetailTabs) =>
    setTab(value);
  //#endregion

  //#region Render
  return (
    <Stack flex={1}>
      <CTabs value={tab} onChange={onTabChange}>
        <CTab value="store" label="Chi nhánh" />
        <CTab value="region" label="Vùng tài sản" />
      </CTabs>

      <CTabPanel value="store" tabValue={tab}>
        <MStoresTable />
      </CTabPanel>
      <CTabPanel value="region" tabValue={tab}>
        <MRegionsTable />
      </CTabPanel>
    </Stack>
  );
  //#endregion
};
