import { permissionsApi } from "@apis/permissions.api";
import { TCTableHeaders } from "@components/others/CTable/types";
import { IUserGroup } from "@interfaces/permissions";
import { Stack } from "@mui/material";
import { CTable } from "@others";
import { useQuery } from "@tanstack/react-query";

import { MUserGroupForm } from "./MUserGroupForm";

export const MUserGroupsList = () => {
  //#region Data
  const { data: user_groups = [], refetch } = useQuery({
    queryKey: ["danh-sach-nhom-nguoi-dung"],
    queryFn: () => permissionsApi.getUserGroups(),
    select: (response) => response.data.data,
  });
  //#endregion

  //#region Event
  //#endregion

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
        dense
      />
      <MUserGroupForm refetch={refetch} />
    </Stack>
  );
  //#endregion
};
