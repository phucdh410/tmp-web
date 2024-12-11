import { useState } from "react";

import { Stack } from "@mui/material";
import { CTab, CTabPanel, CTabs } from "@others";

import { MStoresTable } from "./MStoresTable";

type TAssetRegionDetailTabs = "store";

export const MAssetRegionDetail = () => {
  //#region Data
  const [tab, setTab] = useState<TAssetRegionDetailTabs>("store");
  //#endregion

  //#region Event
  const onTabChange = (
    event: React.SyntheticEvent,
    value: TAssetRegionDetailTabs
  ) => setTab(value);
  //#endregion

  //#region Render
  return (
    <Stack flex={1}>
      <CTabs value={tab} onChange={onTabChange}>
        <CTab value="store" label="Chi nhánh" />
      </CTabs>

      <CTabPanel value="store" tabValue={tab}>
        <MStoresTable />
      </CTabPanel>
    </Stack>
  );
  //#endregion
};
