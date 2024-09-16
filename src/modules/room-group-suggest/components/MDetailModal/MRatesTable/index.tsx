import { useRef } from "react";

import { roomGroupSuggestApi } from "@apis/room-group-suggests.api";
import { TCTableHeaders } from "@components/others/CTable/types";
import { CButton } from "@controls";
import { toast } from "@funcs/toast";
import { IRateInRoomGroupPayload } from "@interfaces/room-group-suggests";
import { Add } from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";
import { CTable } from "@others";

import { IMModalRef } from "./MModal/types";
import { MModal } from "./MModal";
import { IMRatesTableProps } from "./types";

export const MRatesTable = ({
  refetch,
  ratesData,
  room_group_id,
}: IMRatesTableProps) => {
  //#region Data
  const modalRef = useRef<null | IMModalRef>(null);
  //#endregion

  //#region Event
  const onAdd = () => {
    modalRef.current?.open(room_group_id);
  };

  const onEdit = (rateData: IRateInRoomGroupPayload) => () => {
    modalRef.current?.open(room_group_id, rateData);
  };

  const onRemove = (id: string) => async () => {
    try {
      await roomGroupSuggestApi.removeRateFromRoomGroup(id);
      toast.success("Xóa giá khỏi đề xuất nhóm phòng thành công");
      refetch();
    } catch (error: any) {
      toast.error(error?.message ?? "Có lỗi xảy ra");
    }
  };
  //#endregion

  //#region Render
  const headers: TCTableHeaders<IRateInRoomGroupPayload> = [
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

      {room_group_id && <MModal ref={modalRef} refetch={refetch} />}
    </>
  );
  //#endregion
};
