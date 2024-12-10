import { useRef } from "react";

import { useTitle } from "@hooks/title";
import { Stack } from "@mui/material";

import { IMUsersModalRef } from "./MUsersModal/types";
import { MToolbar } from "./MToolbar";
import { MUserDetail } from "./MUserDetail";
import { MUsersList } from "./MUsersList";
import { MUsersModal } from "./MUsersModal";

export const MUserSection = () => {
  //#region Data
  useTitle("Phân quyền người dùng");

  const usersModalRef = useRef<IMUsersModalRef>(null);
  //#endregion

  //#region Event
  const onAdd = () => usersModalRef.current?.open();
  //#endregion

  //#region Render
  return (
    <>
      <MToolbar onAdd={onAdd} />

      <Stack direction="row" gap={3}>
        <MUsersList />

        <MUserDetail />
      </Stack>

      <MUsersModal ref={usersModalRef} />
    </>
  );
  //#endregion
};
