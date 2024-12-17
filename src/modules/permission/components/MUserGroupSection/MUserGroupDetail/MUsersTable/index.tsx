import { useContext, useRef } from "react";
import { useFieldArray, useWatch } from "react-hook-form";

import { TCTableHeaders } from "@components/others/CTable/types";
import {
  CONTROL_STATUS,
  IUserCodeInAssignPermissionPayload,
  IUserInSystem,
} from "@interfaces/permissions";
import { AddCircleOutlineOutlined, Close } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { CTable } from "@others";

import { UserGroupSectionContext } from "../..";

import { IMUsersModalRef } from "./MUsersModal/types";
import { MUsersModal } from "./MUsersModal";
import { IMUsersTableProps } from "./types";

export const MUsersTable = ({ control }: IMUsersTableProps) => {
  //#region Data
  const { status } = useContext(UserGroupSectionContext);

  const usersModalRef = useRef<IMUsersModalRef>(null);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "user_codes",
    keyName: "__id",
  });

  const currentUsers = useWatch({ control, name: "user_codes" });
  //#endregion

  //#region Event
  const openAddUserModal = () => usersModalRef.current?.open();

  const onRemove = (index: number) => () => remove(index);

  const onAddUsers = (newUsers: IUserInSystem[]) => {
    const result: IUserCodeInAssignPermissionPayload[] = newUsers.map((e) => ({
      code: e.code,
      name: e.fullname,
    }));
    append(result);
  };
  //#endregion

  //#region Render
  const headers: TCTableHeaders<IUserCodeInAssignPermissionPayload> = [
    { key: "code", label: "mã nhân viên" },
    { key: "name", label: "tên nhân viên", align: "left" },
    {
      key: "action",
      label: "",
      width: 70,
      style: { padding: 0 },
      render: () => (
        <IconButton
          disabled={status !== CONTROL_STATUS.EDITING}
          color="white"
          size="small"
          onClick={openAddUserModal}
        >
          <AddCircleOutlineOutlined />
        </IconButton>
      ),
      cellRender: (value, record, index) => (
        <IconButton
          disabled={status !== CONTROL_STATUS.EDITING}
          color="error"
          size="small"
          onClick={onRemove(index)}
        >
          <Close />
        </IconButton>
      ),
    },
  ];
  return (
    <>
      <CTable
        showIndexCol={false}
        headers={headers}
        headerTransform="capitalize"
        data={fields}
        dense
      />

      <MUsersModal
        ref={usersModalRef}
        existingUsers={currentUsers}
        onAddUsers={onAddUsers}
      />
    </>
  );
  //#endregion
};
