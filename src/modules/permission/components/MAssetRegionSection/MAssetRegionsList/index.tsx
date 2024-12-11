import { permissionsApi } from "@apis/permissions.api";
import { TCTableHeaders } from "@components/others/CTable/types";
import { IArea } from "@interfaces/permissions";
import { Stack } from "@mui/material";
import { CTable } from "@others";
import { useQuery } from "@tanstack/react-query";

import { MAssetRegionForm } from "./MAssetRegionForm";

export const MAssetRegionsList = () => {
  //#region Data
  const { data: areas = [], refetch } = useQuery({
    queryKey: ["danh-sach-vung-tai-san"],
    queryFn: () => permissionsApi.getAreas(),
    select: (response) => response.data.data,
  });
  //#endregion

  //#region Event
  //#endregion

  //#region Render
  const headers: TCTableHeaders<IArea> = [
    { key: "code", label: "mã nhóm" },
    { key: "name", label: "tên nhóm", align: "left", width: 280 },
  ];
  return (
    <Stack>
      <CTable
        showIndexCol={false}
        title="Danh sách vùng tài sản"
        headerTransform="capitalize"
        height={380}
        headers={headers}
        data={areas}
        dense
      />
      <MAssetRegionForm refetch={refetch} />
    </Stack>
  );
  //#endregion
};
