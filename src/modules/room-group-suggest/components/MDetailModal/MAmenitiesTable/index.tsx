import { useMemo, useRef } from "react";

import { roomGroupSuggestApi } from "@apis/room-group-suggests.api";
import { TCTableHeaders } from "@components/others/CTable/types";
import { CButton } from "@controls";
import { MESSAGES, toast } from "@funcs/toast";
import { IAmenityInRoomGroupDetail } from "@interfaces/room-group-suggests";
import { Add } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { CTable } from "@others";

import { IMModalRef } from "./MModal/types";
import { MModal } from "./MModal";
import { IMAmenitiesTableProps } from "./types";

export const MAmenitiesTable = ({
  refetch,
  criteria_code,
  amenitiesRoot,
  room_group_id,
  all_criteria_options,
}: IMAmenitiesTableProps) => {
  //#region Data
  const modalRef = useRef<null | IMModalRef>(null);

  const amenities = useMemo<IAmenityInRoomGroupDetail[]>(() => {
    if (criteria_code && amenitiesRoot) {
      return amenitiesRoot.filter(
        (e) => e.amenity_criteria_code === criteria_code
      );
    } else return [];
  }, [criteria_code, amenitiesRoot]);
  //#endregion

  //#region Event
  const onRemove = (id: string) => async () => {
    try {
      const payload = {
        room_group_id,
        amenities: amenitiesRoot
          .filter((e) => e.id !== id)
          .map((e) => Number(e.id)),
      };

      await roomGroupSuggestApi.updateAmenitiesInRoomGroup(payload);
      toast.success(MESSAGES("tiện ích đề xuất phòng").SUCCESS.SAVE);
      refetch();
    } catch (error: any) {
      toast.error(
        error?.message ?? MESSAGES("tiện ích đề xuất phòng").ERROR.SAVE
      );
    }
  };

  const onAdd = () => {
    modalRef.current?.open(room_group_id, amenitiesRoot);
  };
  //#endregion

  //#region Render
  const headers: TCTableHeaders<IAmenityInRoomGroupDetail> = [
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

      {room_group_id && (
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
