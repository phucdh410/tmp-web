import { useRef } from "react";

import { roomsApi } from "@apis/rooms.api";
import { TCTableHeaders } from "@components/others/CTable/types";
import { CButton } from "@controls";
import { MESSAGES, noti } from "@funcs/toast";
import { IAmenityInRoom } from "@interfaces/rooms";
import { Add } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { CTable } from "@others";

import { IMModalRef } from "./MModal/types";
import { MModal } from "./MModal";
import { IMAmenitiesTableProps } from "./types";

export const MAmenitiesTable = ({
  refetch,
  amenities,
  room_id,
  all_criteria_options,
}: IMAmenitiesTableProps) => {
  //#region Data
  const modalRef = useRef<IMModalRef>(null);
  //#endregion

  //#region Event
  const onRemove = (id: number) => async () => {
    try {
      const payload = {
        room_id,
        amenities: amenities.filter((e) => e.id !== id).map((e) => e.id),
      };

      await roomsApi.updateAmenitiesInRoom(payload);
      noti.success(MESSAGES("tiện ích phòng").SUCCESS.SAVE);
      refetch();
    } catch (error: any) {
      noti.error(error?.message ?? MESSAGES("tiện ích phòng").ERROR.SAVE);
    }
  };

  const onAdd = () => {
    modalRef.current?.open(room_id, amenities);
  };
  //#endregion

  //#region Render
  const headers: TCTableHeaders<IAmenityInRoom> = [
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
      key: "code",
      label: "mã tiện ích",
    },
    {
      key: "name",
      label: "tên tiện ích",
      align: "left",
    },
    {
      key: "price",
      label: "giá tiện ích",
      columnType: "number",
    },
    {
      key: "action",
      label: "tác vụ",
      cellRender: (value, record, index) => (
        <CButton variant="text" color="error" onClick={onRemove(record.id)}>
          Xóa
        </CButton>
      ),
    },
  ];
  return (
    <>
      <CTable
        showIndexCol={false}
        headerTransform="capitalize"
        headers={headers}
        data={amenities}
      />

      {room_id && (
        <MModal
          ref={modalRef}
          all_criteria_options={all_criteria_options}
          refetch={refetch}
        />
      )}
    </>
  );
  //#endregion
};
