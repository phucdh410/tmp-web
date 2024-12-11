import { useState } from "react";

import { Stack } from "@mui/material";
import { CTab, CTabPanel, CTabs } from "@others";

type TUserGroupDetailTabs = "user" | "function" | "report";

export const MUserGroupDetail = () => {
  //#region Data
  const [tab, setTab] = useState<TUserGroupDetailTabs>("user");
  //#endregion

  //#region Event
  const onTabChange = (
    event: React.SyntheticEvent,
    value: TUserGroupDetailTabs
  ) => setTab(value);
  //#endregion

  //#region Render
  return (
    <Stack flex={1}>
      <CTabs value={tab} onChange={onTabChange}>
        <CTab value="user" label="Người dùng" />
        <CTab value="function" label="Chức năng" />
        <CTab value="report" label="Báo cáo" />
      </CTabs>

      <CTabPanel value="user" tabValue={tab}>
        <div>Người dùng</div>
      </CTabPanel>
      <CTabPanel value="function" tabValue={tab}>
        <div>Chức năng</div>
      </CTabPanel>
      <CTabPanel value="report" tabValue={tab}>
        <div>Báo cáo</div>
      </CTabPanel>
    </Stack>
  );
  //#endregion
};
