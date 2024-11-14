import { useRef } from "react";
import { useFieldArray } from "react-hook-form";

import { TCTableHeaders } from "@components/others/CTable/types";
import { CButton } from "@controls";
import { IRateInRoomGroupPayload } from "@interfaces/room-group-suggests";
import { Add } from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";
import { CTable } from "@others";

import { IMModalRef } from "./MModal/types";
import { MModal } from "./MModal";
import { IMRatesTableProps } from "./types";

export const MRatesTable = ({ control }: IMRatesTableProps) => {
  //#region Data
  const modalRef = useRef<IMModalRef>(null);

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "rates",
    keyName: "__id",
  });
  //#endregion

  //#region Event
  const onAdd = () => modalRef.current?.open();

  const onCreate = (rateData: IRateInRoomGroupPayload) => {
    append(rateData);
  };

  const onEdit = (rateData: IRateInRoomGroupPayload, index: number) => () => {
    modalRef.current?.open(rateData, index);
  };

  const onUpdate = (rateData: IRateInRoomGroupPayload, index: number) => {
    update(index, rateData);
  };

  const onRemove = (index: number) => () => {
    remove(index);
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
          <CButton variant="text" size="small" onClick={onEdit(record, index)}>
            Edit
          </CButton>
          <CButton
            variant="text"
            color="error"
            size="small"
            onClick={onRemove(index)}
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
        data={fields ?? []}
        rowKey="__id"
      />

      <MModal onCreate={onCreate} onUpdate={onUpdate} ref={modalRef} />
    </>
  );
  //#endregion
};
