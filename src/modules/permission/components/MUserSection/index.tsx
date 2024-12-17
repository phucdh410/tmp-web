import { createContext, useRef, useState } from "react";

import { permissionsApi } from "@apis/permissions.api";
import { confirm } from "@funcs/confirm";
import { MESSAGES, noti } from "@funcs/toast";
import { useTitle } from "@hooks/title";
import { CONTROL_STATUS, IControlContext } from "@interfaces/permissions";
import { Stack } from "@mui/material";

import { IMUserDetailRef } from "./MUserDetail/types";
import { MToolbar } from "./MToolbar";
import { MUserDetail } from "./MUserDetail";
import { IMUsersListRef, MUsersList } from "./MUsersList";

export const UserSectionContext = createContext<IControlContext>({
  status: CONTROL_STATUS.IDLE,
  setStatus: () => {},
  id: "",
  setId: () => {},
});

export const MUserSection = () => {
  //#region Data
  useTitle("Phân quyền người dùng");

  const usersListRef = useRef<IMUsersListRef>(null);
  const userDetailRef = useRef<IMUserDetailRef>(null);

  const [status, setStatus] = useState<CONTROL_STATUS>(CONTROL_STATUS.IDLE);
  const [id, setId] = useState<string | number>("");
  //#endregion

  //#region Event
  const onAdd = () => usersListRef.current?.openAddUserModal();

  const onEdit = () => setStatus(CONTROL_STATUS.EDITING);

  const refetchUserList = () => usersListRef.current?.refetch();

  const onDelete = () => {
    confirm({
      title: "Xóa người dùng khỏi hệ thống",
      content: "Thao tác này không thể khôi phục, bạn chắc chắn?",
      onProceed: async () => permissionsApi.removeUser(id),
      onSuccess: () => {
        refetchUserList();
        setStatus(CONTROL_STATUS.IDLE);
        noti.success(MESSAGES("nhân viên").SUCCESS.REMOVE);
      },
      onError: (error) =>
        noti.error(error?.message ?? MESSAGES("nhân viên").SUCCESS.REMOVE),
    });
  };

  const onCancel = () => {
    confirm({
      title: "Xác nhận",
      content: "Hủy bỏ các thay đổi đã điều chỉnh?",
      onProceed: () => {
        userDetailRef.current?.reset();
        setStatus(CONTROL_STATUS.VIEWING);
      },
    });
  };

  const onSave = async () => {
    try {
      await userDetailRef.current?.submit();
      userDetailRef.current?.refetch();
      noti.success(MESSAGES("thông tin người dùng").SUCCESS.UPDATE);
      setStatus(CONTROL_STATUS.VIEWING);
    } catch (error: any) {
      noti.error(
        error?.message ?? MESSAGES("thông tin người dùng").ERROR.UPDATE
      );
    }
  };
  //#endregion

  //#region Render
  return (
    <UserSectionContext.Provider value={{ status, setStatus, id, setId }}>
      <MToolbar
        status={status}
        onAdd={onAdd}
        onEdit={onEdit}
        onDelete={onDelete}
        onCancel={onCancel}
        onSave={onSave}
      />

      <Stack direction="row" gap={3}>
        <MUsersList ref={usersListRef} />

        <MUserDetail ref={userDetailRef} />
      </Stack>
    </UserSectionContext.Provider>
  );
  //#endregion
};
