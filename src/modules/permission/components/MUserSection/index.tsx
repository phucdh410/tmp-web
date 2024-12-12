import { createContext, useRef, useState } from "react";

import { permissionsApi } from "@apis/permissions.api";
import { confirm } from "@funcs/confirm";
import { MESSAGES, noti } from "@funcs/toast";
import { useTitle } from "@hooks/title";
import { CONTROL_STATUS, IControlContext } from "@modules/permission/types";
import { Stack } from "@mui/material";

import { IMUsersModalRef } from "./MUsersModal/types";
import { MToolbar } from "./MToolbar";
import { MUserDetail } from "./MUserDetail";
import { IMUsersListRef, MUsersList } from "./MUsersList";
import { MUsersModal } from "./MUsersModal";

export const UserSectionContext = createContext<IControlContext>({
  status: CONTROL_STATUS.IDLE,
  setStatus: () => {},
  id: "",
  setId: () => {},
});

export const MUserSection = () => {
  //#region Data
  useTitle("Phân quyền người dùng");

  const usersModalRef = useRef<IMUsersModalRef>(null);
  const usersListRef = useRef<IMUsersListRef>(null);

  const [status, setStatus] = useState<CONTROL_STATUS>(CONTROL_STATUS.IDLE);
  const [id, setId] = useState<string | number>("");
  //#endregion

  //#region Event
  const onAdd = () => usersModalRef.current?.open();

  const onEdit = () => setStatus(CONTROL_STATUS.EDITING);

  const refetchUserList = () => usersListRef.current?.refetch();

  const onDelete = () => {
    confirm({
      title: "Xóa người dùng khỏi hệ thống",
      content: "Thao tác này không thể khôi phục, bạn chắc chắn?",
      onProceed: async () => permissionsApi.removeUser(id),
      onSuccess: () => {
        refetchUserList();
        noti.success(MESSAGES("nhân viên").SUCCESS.REMOVE);
      },
      onError: (error) =>
        noti.error(error?.message ?? MESSAGES("nhân viên").SUCCESS.REMOVE),
    });
  };
  //#endregion

  //#region Render
  return (
    <UserSectionContext.Provider value={{ status, setStatus, id, setId }}>
      <MToolbar
        onAdd={onAdd}
        onEdit={onEdit}
        onDelete={onDelete}
        status={status}
      />

      <Stack direction="row" gap={3}>
        <MUsersList />

        <MUserDetail />
      </Stack>

      <MUsersModal ref={usersModalRef} refetch={refetchUserList} />
    </UserSectionContext.Provider>
  );
  //#endregion
};
