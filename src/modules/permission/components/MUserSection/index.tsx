import { createContext, useRef, useState } from "react";

import { useTitle } from "@hooks/title";
import { CONTROL_STATUS } from "@modules/permission/types";
import { Stack } from "@mui/material";

import { IMUsersModalRef } from "./MUsersModal/types";
import { MToolbar } from "./MToolbar";
import { MUserDetail } from "./MUserDetail";
import { MUsersList } from "./MUsersList";
import { MUsersModal } from "./MUsersModal";

export const UserSectionContext = createContext({
  status: CONTROL_STATUS.IDLE,
  setStatus: (newStatus: CONTROL_STATUS) => {},
});

export const MUserSection = () => {
  //#region Data
  useTitle("Phân quyền người dùng");

  const usersModalRef = useRef<IMUsersModalRef>(null);

  const [status, setStatus] = useState<CONTROL_STATUS>(CONTROL_STATUS.IDLE);
  //#endregion

  //#region Event
  const onAdd = () => usersModalRef.current?.open();
  //#endregion

  //#region Render
  return (
    <UserSectionContext.Provider value={{ status, setStatus }}>
      <MToolbar onAdd={onAdd} status={status} />

      <Stack direction="row" gap={3}>
        <MUsersList />

        <MUserDetail />
      </Stack>

      <MUsersModal ref={usersModalRef} />
    </UserSectionContext.Provider>
  );
  //#endregion
};
