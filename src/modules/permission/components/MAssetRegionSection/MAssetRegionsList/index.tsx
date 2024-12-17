import { forwardRef, useContext, useImperativeHandle, useMemo } from "react";

import { permissionsApi } from "@apis/permissions.api";
import { TCTableHeaders } from "@components/others/CTable/types";
import { confirm } from "@funcs/confirm";
import { IArea } from "@interfaces/permissions";
import { CONTROL_STATUS } from "@interfaces/permissions";
import { Stack } from "@mui/material";
import { CTable } from "@others";
import { useQuery } from "@tanstack/react-query";

import { AssetRegionSectionContext } from "..";

import { MAssetRegionForm } from "./MAssetRegionForm";

export interface IMAssetRegionsListRef {
  refetch: () => void;
}

export interface IMAssetRegionsListProps {}

export const MAssetRegionsList = forwardRef<
  IMAssetRegionsListRef,
  IMAssetRegionsListProps
>((props, ref) => {
  //#region Data
  const { id, setId, status, setStatus } = useContext(
    AssetRegionSectionContext
  );

  const { data: areas = [], refetch } = useQuery({
    queryKey: ["danh-sach-vung-tai-san"],
    queryFn: () => permissionsApi.getAreas(),
    select: (response) => response.data.data,
  });

  const selectedList = useMemo(() => {
    if (!id || !(areas.length > 0)) return [];
    const found = areas.find((e) => e.id === id);
    if (found) return [found];
  }, [id, areas]);
  //#endregion

  //#region Event
  const onView = (newSelection: IArea[]) => {
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
        selection={{
          hideSelectCol: true,
          selectByClickingRow: true,
          type: "radio",
          selectedList: selectedList,
          onSelect: onView,
        }}
        dense
      />
      <MAssetRegionForm refetch={refetch} />
    </Stack>
  );
  //#endregion
});
