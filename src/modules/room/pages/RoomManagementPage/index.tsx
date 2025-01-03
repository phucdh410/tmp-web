import { useMemo, useRef, useState } from "react";

import { roomGroupSuggestApi } from "@apis/room-group-suggests.api";
import { roomsApi } from "@apis/rooms.api";
import { ICTableHeader } from "@components/others/CTable/types";
import { CButton, CButtonGroup } from "@controls";
import { confirm } from "@funcs/confirm";
import { MESSAGES, noti } from "@funcs/toast";
import { useGetAllStores } from "@hooks/options";
import { useTitle } from "@hooks/title";
import { IRoom, IRoomPaginationParams } from "@interfaces/rooms";
import { MDetailModal, MFilter, MModal } from "@modules/room/components";
import { IMDetailModalRef } from "@modules/room/components/MDetailModal/types";
import { IMModalRef } from "@modules/room/components/MModal/types";
import { Typography } from "@mui/material";
import { CTable } from "@others";
import { useQuery } from "@tanstack/react-query";

const RoomManagementPage = () => {
  useTitle("Quản lý phòng");

  //#region Data
  const modalRef = useRef<IMModalRef>(null);
  const detailModalRef = useRef<IMDetailModalRef>(null);

  const [params, setParams] = useState<IRoomPaginationParams>({
    page: 1,
    limit: 10,
    store_code: "",
    room_group_id: "",
    status: "",
  });

  const { data, refetch } = useQuery({
    queryKey: ["danh-sach-phong", params],
    queryFn: () => roomsApi.getPaginate(params),
    select: (response) => response?.data?.data,
  });

  const listData = useMemo(() => data?.data ?? [], [data]);

  const { stores } = useGetAllStores();

  const { data: ROOM_GROUPS_OPTIONS } = useQuery({
    queryKey: ["danh-sach-nhom-phong"],
    queryFn: () => roomGroupSuggestApi.getAll(),
    select: (response) =>
      response?.data?.data?.map((e) => ({ id: e?.id, label: e?.name })),
  });
  //#endregion

  //#region Event
  const onPageChange = (newPage: number) => {
    setParams((prev) => ({ ...prev, page: newPage }));
  };

  const onSearch = (newParams: IRoomPaginationParams) => {
    setParams(newParams);
  };

  const onAdd = () => {
    modalRef.current?.open();
  };

  const onEdit = (id: number) => () => {
    detailModalRef.current?.open(id);
  };

  const onRemove = (id: number) => () => {
    confirm({
      title: "Xóa phòng",
      content: "Thao tác này không thể khôi phục, bạn chắc chắn?",
      onProceed: () => roomsApi.remove(id),
      onSuccess: () => {
        refetch();
        noti.success(MESSAGES("phòng").SUCCESS.REMOVE);
      },
      onError: (error) =>
        noti.error(error?.message ?? MESSAGES("phòng").ERROR.REMOVE),
    });
  };
  //#endregion

  //#region Render
  const headers: ICTableHeader<IRoom>[] = [
    {
      key: "code",
      label: "mã phòng",
    },
    {
      key: "name",
      label: "tên phòng",
      align: "left",
    },
    {
      key: "room_group_name",
      label: "nhóm phòng",
      align: "left",
    },
    {
      key: "region_name",
      label: "vị trí phòng",
      align: "left",
    },
    {
      key: "store_name",
      label: "chi nhánh",
      align: "left",
    },
    {
      key: "created_at",
      label: "ngày tạo",
      columnType: "date",
    },
    {
      key: "status",
      label: "trạng thái",
      cellRender: (value, record, index) => (
        <Typography color={value ? "#3FC27C" : "#C90000"}>
          {value ? "Hoạt động" : "Ngưng"}
        </Typography>
      ),
    },
    {
      key: "action",
      label: "tác vụ",
      cellRender: (value, record, index) => (
        <CButtonGroup variant="text" className="table-actions">
          <CButton onClick={onEdit(record.id)}>Edit</CButton>
          <CButton onClick={onRemove(record?.id)} color="error">
            Xóa
          </CButton>
        </CButtonGroup>
      ),
    },
  ];
  return (
    <>
      <Typography variant="header-page">Quản lý phòng</Typography>

      <MFilter
        stores={stores}
        room_groups_options={ROOM_GROUPS_OPTIONS ?? []}
        params={params}
        onAdd={onAdd}
        onSearch={onSearch}
      />

      <CTable
        showIndexCol={false}
        headers={headers}
        headerTransform="capitalize"
        data={listData}
        pagination={{
          page: params.page ?? 1,
          pages: data?.pages ?? 0,
          limit: params.limit ?? 10,
          onPageChange: onPageChange,
        }}
      />

      <MModal ref={modalRef} refetch={refetch} />

      <MDetailModal ref={detailModalRef} listRefetch={refetch} />
    </>
  );
  //#endregion
};
export default RoomManagementPage;
