import { createContext, useRef, useState } from "react";

import { permissionsApi } from "@apis/permissions.api";
import { confirm } from "@funcs/confirm";
import { MESSAGES, noti } from "@funcs/toast";
import { useTitle } from "@hooks/title";
import { CONTROL_STATUS, IControlContext } from "@interfaces/permissions";
import { Stack } from "@mui/material";

import { IMUserGroupDetailRef } from "./MUserGroupDetail/types";
import { MToolbar } from "./MToolbar";
import { MUserGroupDetail } from "./MUserGroupDetail";
import { IMUserGroupsListRef, MUserGroupsList } from "./MUserGroupsList";

export const UserGroupSectionContext = createContext<IControlContext>({
  status: CONTROL_STATUS.IDLE,
  setStatus: () => {},
  id: "",
  setId: () => {},
});

export const MUserGroupSection = () => {
  //#region Data
  useTitle("Phân quyền nhóm người dùng");

  const userGroupsListRef = useRef<IMUserGroupsListRef>(null);
  const userGroupDetailRef = useRef<IMUserGroupDetailRef>(null);

  const [status, setStatus] = useState<CONTROL_STATUS>(CONTROL_STATUS.IDLE);
  const [id, setId] = useState<string | number>("");
  //#endregion

  //#region Event
  const onEdit = () => setStatus(CONTROL_STATUS.EDITING);

  const onDelete = () => {
    confirm({
      title: "Xóa nhóm người dùng khỏi hệ thống",
      content: "Thao tác này không thể khôi phục, bạn chắc chắn?",
      onProceed: async () => permissionsApi.removeUserGroup(id),
      onSuccess: () => {
        userGroupsListRef.current?.refetch();
        setStatus(CONTROL_STATUS.IDLE);
        noti.success(MESSAGES("nhóm người dùng").SUCCESS.REMOVE);
      },
      onError: (error) =>
        noti.error(
          error?.message ?? MESSAGES("nhóm người dùng").SUCCESS.REMOVE
        ),
    });
  };

  const onCancel = () => {
    confirm({
      title: "Xác nhận",
      content: "Hủy bỏ các thay đổi đã điều chỉnh?",
      onProceed: () => {
        userGroupDetailRef.current?.reset();
        setStatus(CONTROL_STATUS.VIEWING);
      },
    });
  };

  const onSave = async () => {
    try {
      await userGroupDetailRef.current?.submit();
      userGroupDetailRef.current?.refetch();
      noti.success(MESSAGES("thông tin nhóm người dùng").SUCCESS.UPDATE);
      setStatus(CONTROL_STATUS.VIEWING);
    } catch (error: any) {
      noti.error(
        error?.message ?? MESSAGES("thông tin nhóm người dùng").ERROR.UPDATE
      );
    }
  };
  //#endregion

  //#region Render
  return (
    <UserGroupSectionContext.Provider value={{ status, setStatus, id, setId }}>
      <MToolbar
        status={status}
        onEdit={onEdit}
        onDelete={onDelete}
        onCancel={onCancel}
        onSave={onSave}
      />

      <Stack direction="row" gap={3}>
        <MUserGroupsList ref={userGroupsListRef} />

        <MUserGroupDetail ref={userGroupDetailRef} />
      </Stack>
    </UserGroupSectionContext.Provider>
  );
  //#endregion
};
