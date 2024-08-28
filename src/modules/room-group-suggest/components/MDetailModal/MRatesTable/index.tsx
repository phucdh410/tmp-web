import { TCTableHeaders } from "@components/others/CTable/types";
import { CButton } from "@controls";
import { IRateInRoomGroupPayload } from "@interfaces/room-group-suggests";
import { Add } from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";
import { CTable } from "@others";
import dayjs from "dayjs";

import { IMRatesTableProps } from "./types";

export const MRatesTable = ({ refetch, ratesData }: IMRatesTableProps) => {
  //#region Data
  //#endregion

  //#region Event
  const onAdd = () => {};

  const onEdit = () => {};

  const onRemove = () => {};
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
      cellRender: (value, record, index) => (
        <>{dayjs(value).format("DD/MM/YYYY")}</>
      ),
    },
    {
      key: "price",
      label: "giá ngày thường",
      cellRender: (value, record, index) => <>{value?.toLocaleString()}</>,
    },
    {
      key: "holiday_price",
      label: "giá ngày lễ",
      cellRender: (value, record, index) => <>{value?.toLocaleString()}</>,
    },
    {
      key: "action",
      label: "tác vụ",
      cellRender: (value, record, index) => (
        <Stack direction="row" justifyContent="center" alignItems="center">
          <CButton variant="text" size="small" onClick={onEdit}>
            Edit
          </CButton>
          <CButton variant="text" color="error" size="small" onClick={onRemove}>
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
        rowKey=""
      />
    </>
  );
  //#endregion
};
