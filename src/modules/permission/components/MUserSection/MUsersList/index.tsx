import { permissionsApi } from "@apis/permissions.api";
import { TCTableHeaders } from "@components/others/CTable/types";
import { IUserInSystem } from "@interfaces/permissions";
import { CTable } from "@others";
import { useQuery } from "@tanstack/react-query";

export const MUsersList = () => {
  //#region Data
  const { data: users_in_system = [] } = useQuery({
    queryKey: ["danh-sach-nhan-vien-trong-he-thong"],
    queryFn: () => permissionsApi.getUsersInSystem(),
    select: (response) => response.data.data,
  });
  //#endregion

  //#region Event
  //#endregion

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
      dense
    />
  );
  //#endregion
};
