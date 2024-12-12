import { forwardRef, useContext, useImperativeHandle, useMemo } from "react";

import { permissionsApi } from "@apis/permissions.api";
import { TCTableHeaders } from "@components/others/CTable/types";
import { confirm } from "@funcs/confirm";
import { IUserInSystem } from "@interfaces/permissions";
import { CONTROL_STATUS } from "@modules/permission/types";
import { CTable } from "@others";
import { useQuery } from "@tanstack/react-query";

import { UserSectionContext } from "..";

export interface IMUsersListRef {
  refetch: () => void;
}

export interface IMUsersListProps {}

export const MUsersList = forwardRef<IMUsersListRef, IMUsersListProps>(
  (props, ref) => {
    //#region Data
    const { id, setId, status, setStatus } = useContext(UserSectionContext);

    const { data: users_in_system = [], refetch } = useQuery({
      queryKey: ["danh-sach-nhan-vien-trong-he-thong"],
      queryFn: () => permissionsApi.getUsersInSystem(),
      select: (response) => response.data.data,
    });

    const selectedList = useMemo(() => {
      if (!id || !(users_in_system.length > 0)) return [];
      const found = users_in_system.find((e) => e.id === id);
      if (found) return [found];
    }, [id, users_in_system]);
    //#endregion

    //#region Event
    const onView = (newSelection: IUserInSystem[]) => {
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
    const headers: TCTableHeaders<IUserInSystem> = [
      { key: "code", label: "mã nhân viên" },
      { key: "fullname", label: "tên nhân viên", align: "left", width: 280 },
    ];
    return (
      <CTable
        showIndexCol={false}
        title="Danh sách người dùng"
        headerTransform="capitalize"
        height={450}
        headers={headers}
        data={users_in_system}
        selection={{
          hideSelectCol: true,
          selectByClickingRow: true,
          type: "radio",
          selectedList: selectedList,
          onSelect: onView,
        }}
        dense
      />
    );
    //#endregion
  }
);
