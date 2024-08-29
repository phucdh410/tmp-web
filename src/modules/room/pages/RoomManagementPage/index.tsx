import { useMemo, useRef, useState } from "react";

import { roomGroupSuggestApi } from "@apis/room-group-suggests.api";
import { roomsApi } from "@apis/rooms.api";
import { storesApi } from "@apis/stores.api";
import { ICTableHeader } from "@components/others/CTable/types";
import { CButton } from "@controls";
import { confirm } from "@funcs/confirm";
import { toast } from "@funcs/toast";
import { useTitle } from "@hooks/title";
import { IRoom } from "@interfaces/rooms";
import { MFilter, MModal } from "@modules/room/components";
import { IMModalRef } from "@modules/room/components/MModal/types";
import { IParams } from "@modules/room/types";
import { Box, Stack, Typography } from "@mui/material";
import { CTable } from "@others";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

const RoomManagementPage = () => {
  useTitle("Quản lý phòng");

  //#region Data
  const modalRef = useRef<null | IMModalRef>(null);

  const [params, setParams] = useState<IParams>({
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

  const { data: STORES_OPTIONS } = useQuery({
    queryKey: ["danh-sach-chi-nhanh"],
    queryFn: () => storesApi.getAll(),
    select: (response) =>
      response?.data?.data?.map((e) => ({ id: e?.code, label: e?.name })),
  });

  const { data: ROOM_GROUPS_OPTIONS } = useQuery({
    queryKey: ["danh-sach-nhom-phong"],
    queryFn: () => roomGroupSuggestApi.getAll(),
    select: (response) =>
      response?.data?.data?.map((e) => ({ id: Number(e?.id), label: e?.name })),
  });
  //#endregion

  //#region Event
  const onPageChange = (newPage: number) => {
    setParams((prev) => ({ ...prev, page: newPage }));
  };

  const onSearch = (newParams: IParams) => {
    setParams(newParams);
  };

  const onAdd = () => {
    modalRef.current?.open();
  };

  const onEdit = () => {};

  const onRemove = (id: string) => () => {
    confirm({
      title: "Xóa",
      content: "Xóa phòng?",
      onProceed: async () => {
        try {
          await roomsApi.remove(id);
          toast.success("Xóa phòng thành công");
          refetch();
        } catch (error: any) {
          toast.error(error?.message ?? "Có lỗi xảy ra");
        }
      },
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
      key: "place_position_name",
      label: "vị trí phòng",
      align: "left",
    },
    {
      key: "store_name",
      label: "chi nhánh",
    },
    {
      key: "created_at",
      label: "ngày tạo",
      cellRender: (value, record, index) => (
        <>{dayjs(value).format("DD/MM/YYYY")}</>
      ),
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
        <Stack direction="row" alignItems="center" justifyContent="center">
          <CButton onClick={onEdit} variant="text" sx={{ minWidth: "unset" }}>
            Edit
          </CButton>
          <CButton
            onClick={onRemove(record?.id)}
            variant="text"
            color="error"
            sx={{ minWidth: "unset" }}
          >
            Xóa
          </CButton>
        </Stack>
      ),
    },
  ];
  return (
    <>
      <Typography variant="header-page">Quản lý phòng</Typography>

      <MFilter
        options={STORES_OPTIONS ?? []}
        room_groups_options={ROOM_GROUPS_OPTIONS ?? []}
        params={params}
        onAdd={onAdd}
        onSearch={onSearch}
      />

      <Box mt={5}>
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
      </Box>

      <MModal
        ref={modalRef}
        refetch={refetch}
        stores_options={STORES_OPTIONS ?? []}
        room_groups_options={ROOM_GROUPS_OPTIONS ?? []}
      />
    </>
  );
  //#endregion
};
export default RoomManagementPage;
