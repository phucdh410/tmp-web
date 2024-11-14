import { useRef } from "react";

import { roomsApi } from "@apis/rooms.api";
import { TCTableHeaders } from "@components/others/CTable/types";
import { CButton } from "@controls";
import { noti } from "@funcs/toast";
import { IRateInRoom } from "@interfaces/rooms";
import { Add } from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";
import { CTable } from "@others";

import { IMModalRef } from "./MModal/types";
import { MModal } from "./MModal";
import { IMRatesTableProps } from "./types";

export const MRatesTable = ({
  refetch,
  ratesData,
  room_id,
}: IMRatesTableProps) => {
  //#region Data
  const modalRef = useRef<IMModalRef>(null);
  //#endregion

  //#region Event
  const onAdd = () => {
    modalRef.current?.open(room_id);
  };

  const onEdit = (rateData: IRateInRoom) => () => {
    modalRef.current?.open(room_id, rateData);
  };

  const onRemove = (id: number) => async () => {
    try {
      await roomsApi.removeRateFromRoom(id);
      noti.success("Xóa giá khỏi phòng thành công");
      refetch();
    } catch (error: any) {
      noti.error(error?.message ?? "Có lỗi xảy ra");
    }
  };
  //#endregion

  //#region Render
  const headers: TCTableHeaders<IRateInRoom> = [
    {
      key: "tool",
      label: "",
      style: { padding: 0 },
      render: () => (
        <IconButton color="white" onClick={onAdd}>
          <Add />
        </IconButton>
      ),
    },
    {
      key: "day_of_week",
      label: "ngày",
      cellRender: (value: number, record, index) => (
        <>{value + 1 > 7 ? "Chủ nhật" : `Thứ ${value + 1}`}</>
      ),
    },
    { key: "start_time", label: "từ" },
    { key: "end_time", label: "đến" },
    {
      key: "apply_from",
      label: "ngày áp dụng",
      columnType: "date",
    },
    {
      key: "price",
      label: "giá ngày thường",
      columnType: "number",
    },
    {
      key: "holiday_price",
      label: "giá ngày lễ",
      columnType: "number",
    },
    {
      key: "action",
      label: "tác vụ",
      cellRender: (value, record, index) => (
        <Stack direction="row" justifyContent="center" alignItems="center">
          <CButton variant="text" size="small" onClick={onEdit(record)}>
            Edit
          </CButton>
          <CButton
            variant="text"
            color="error"
            size="small"
            onClick={onRemove(record?.id!)}
          >
            Xóa
          </CButton>
        </Stack>
      ),
    },
  ];
  return (
    <>
      <CTable
        showIndexCol={false}
        headers={headers}
        headerTransform="capitalize"
        data={ratesData ?? []}
      />

      {room_id && <MModal ref={modalRef} refetch={refetch} />}
    </>
  );
  //#endregion
};
