import { useContext, useState } from "react";

import { permissionsApi } from "@apis/permissions.api";
import { Stack } from "@mui/material";
import { CTab, CTabPanel, CTabs } from "@others";
import { useQuery } from "@tanstack/react-query";

import { UserSectionContext } from "..";

import { MRegionsTable } from "./MRegionsTable";
import { MStoresTable } from "./MStoresTable";

type TUserDetailTabs = "store" | "region";

export const MUserDetail = () => {
  //#region Data
  const { id } = useContext(UserSectionContext);

  const [tab, setTab] = useState<TUserDetailTabs>("store");

  const { data } = useQuery({
    queryKey: ["thong-tin-cua-hang-va-vung-tai-san-cua-nhan-vien", id],
    queryFn: () => permissionsApi.getUserDatById(id),
    enabled: !!id,
    select: (response) => response?.data?.data,
  });
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
        <MStoresTable stores={data?.stores ?? []} />
      </CTabPanel>
      <CTabPanel value="region" tabValue={tab}>
        <MRegionsTable regions={data?.areas ?? []} />
      </CTabPanel>
    </Stack>
  );
  //#endregion
};
