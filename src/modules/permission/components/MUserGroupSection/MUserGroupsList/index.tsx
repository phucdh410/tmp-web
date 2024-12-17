import { forwardRef, useContext, useImperativeHandle, useMemo } from "react";

import { permissionsApi } from "@apis/permissions.api";
import { TCTableHeaders } from "@components/others/CTable/types";
import { confirm } from "@funcs/confirm";
import { CONTROL_STATUS, IUserGroup } from "@interfaces/permissions";
import { Stack } from "@mui/material";
import { CTable } from "@others";
import { useQuery } from "@tanstack/react-query";

import { UserGroupSectionContext } from "..";

import { MUserGroupForm } from "./MUserGroupForm";

export interface IMUserGroupsListRef {
  refetch: () => void;
}

export interface IMUserGroupsListProps {}

export const MUserGroupsList = forwardRef<
  IMUserGroupsListRef,
  IMUserGroupsListProps
>((props, ref) => {
  //#region Data
  const { id, setId, status, setStatus } = useContext(UserGroupSectionContext);

  const { data: user_groups = [], refetch } = useQuery({
    queryKey: ["danh-sach-nhom-nguoi-dung"],
    queryFn: () => permissionsApi.getUserGroups({ active: 1 }),
    select: (response) => response.data.data,
  });

  const selectedList = useMemo(() => {
    if (!id || !(user_groups.length > 0)) return [];
    const found = user_groups.find((e) => e.id === id);
    if (found) return [found];
  }, [id, user_groups]);
  //#endregion

  //#region Event
  const onView = (newSelection: IUserGroup[]) => {
    if (status === CONTROL_STATUS.EDITING) {
      confirm({
        title: "Đang điều chỉnh",
        content: "Bạn đang điều chỉnh, xác nhận hủy?",
        onProceed: () => {
          setId(newSelection[0]?.id);
          setStatus(CONTROL_STATUS.VIEWING);
        },
      });
    } else {
      setId(newSelection[0]?.id);
      setStatus(CONTROL_STATUS.VIEWING);
    }
  };
  //#endregion

  useImperativeHandle(ref, () => ({
    refetch,
  }));

  //#region Render
  const headers: TCTableHeaders<IUserGroup> = [
    { key: "code", label: "mã nhóm" },
    { key: "name", label: "tên nhóm", align: "left", width: 280 },
  ];
  return (
    <Stack>
      <CTable
        showIndexCol={false}
        title="Danh sách nhóm người dùng"
        headerTransform="capitalize"
        height={380}
        headers={headers}
        data={user_groups}
        selection={{
          hideSelectCol: true,
          selectByClickingRow: true,
          type: "radio",
          selectedList: selectedList,
          onSelect: onView,
        }}
        dense
      />
      <MUserGroupForm refetch={refetch} />
    </Stack>
  );
  //#endregion
});
