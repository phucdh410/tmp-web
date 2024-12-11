import { createContext, useState } from "react";

import { useTitle } from "@hooks/title";
import { CONTROL_STATUS } from "@modules/permission/types";
import { Stack } from "@mui/material";

import { MToolbar } from "./MToolbar";
import { MUserGroupDetail } from "./MUserGroupDetail";
import { MUserGroupsList } from "./MUserGroupsList";

export const UserGroupSectionContext = createContext({
  status: CONTROL_STATUS.IDLE,
  setStatus: (newStatus: CONTROL_STATUS) => {},
});

export const MUserGroupSection = () => {
  //#region Data
  useTitle("Phân quyền nhóm người dùng");

  const [status, setStatus] = useState<CONTROL_STATUS>(CONTROL_STATUS.IDLE);
  //#endregion

  //#region Event
  //#endregion

  //#region Render
  return (
    <UserGroupSectionContext.Provider value={{ status, setStatus }}>
      <MToolbar status={status} />

      <Stack direction="row" gap={3}>
        <MUserGroupsList />

        <MUserGroupDetail />
      </Stack>
    </UserGroupSectionContext.Provider>
  );
  //#endregion
};
