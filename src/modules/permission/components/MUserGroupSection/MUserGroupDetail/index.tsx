import { useState } from "react";

import { permissionsApi } from "@apis/permissions.api";
import { Stack } from "@mui/material";
import { CTab, CTabPanel, CTabs } from "@others";
import { useQuery } from "@tanstack/react-query";

import { MFunctionsTable } from "./MFunctionsTable";
import { MReportsTable } from "./MReportsTable";
import { MUsersTable } from "./MUsersTable";

type TUserGroupDetailTabs = "user" | "function" | "report";

export const MUserGroupDetail = () => {
  //#region Data
  const [tab, setTab] = useState<TUserGroupDetailTabs>("user");

  const { data: permissions } = useQuery({
    queryKey: ["danh-sach-quyen"],
    queryFn: () => permissionsApi.getPermissions(),
    select: (response) => response?.data?.data,
  });
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
        <MUsersTable />
      </CTabPanel>
      <CTabPanel value="function" tabValue={tab}>
        <MFunctionsTable features={permissions?.features ?? []} />
      </CTabPanel>
      <CTabPanel value="report" tabValue={tab}>
        <MReportsTable reports={permissions?.reports ?? []} />
      </CTabPanel>
    </Stack>
  );
  //#endregion
};
