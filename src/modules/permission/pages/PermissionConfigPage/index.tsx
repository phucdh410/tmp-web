import { useState } from "react";

import { useURLSearchParams } from "@hooks/query-params-url";
import {
  MAssetRegionSection,
  MenuTabItem,
  MUserGroupSection,
  MUserSection,
} from "@modules/permission/components";
import { PERMISSION_TAB } from "@modules/permission/types";
import { Stack } from "@mui/material";
import { CPageHeader } from "@others";

const PermissionConfigPage = () => {
  //#region Name
  const { searchParams, setSearchParams } = useURLSearchParams<{
    tab: PERMISSION_TAB;
  }>();

  const [tab, setTab] = useState<PERMISSION_TAB>(
    searchParams?.tab
      ? (searchParams.tab as PERMISSION_TAB)
      : PERMISSION_TAB.USER
  );
  //#endregion

  //#region Event
  const onTabChange = (tabValue: PERMISSION_TAB) => () => {
    setTab(tabValue);
    setSearchParams("tab", tabValue);
  };
  //#endregion

  //#region Render
  return (
    <>
      <CPageHeader>Phân quyền</CPageHeader>

      <Stack my={4} gap={1} direction="row" justifyContent="center">
        <MenuTabItem
          onClick={onTabChange(PERMISSION_TAB.USER)}
          selected={tab === PERMISSION_TAB.USER}
        >
          Người dùng
        </MenuTabItem>
        <MenuTabItem
          onClick={onTabChange(PERMISSION_TAB.GROUP)}
          selected={tab === PERMISSION_TAB.GROUP}
        >
          Nhóm người dùng
        </MenuTabItem>
        <MenuTabItem
          onClick={onTabChange(PERMISSION_TAB.REGION)}
          selected={tab === PERMISSION_TAB.REGION}
        >
          Vùng tài sản
        </MenuTabItem>
      </Stack>

      {tab === PERMISSION_TAB.USER && <MUserSection />}
      {tab === PERMISSION_TAB.GROUP && <MUserGroupSection />}
      {tab === PERMISSION_TAB.REGION && <MAssetRegionSection />}
    </>
  );
  //#endregion
};
export default PermissionConfigPage;
