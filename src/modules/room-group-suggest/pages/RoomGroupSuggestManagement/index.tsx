import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { roomGroupSuggestApi } from "@apis/room-group-suggests.api";
import { TCTableHeaders } from "@components/others/CTable/types";
import { ROOM_GROUP_SUGGEST_STATUSES_OPTIONS } from "@constants/options";
import { CButton, CButtonGroup } from "@controls";
import { useTitle } from "@hooks/title";
import { IRoomGroupSuggest } from "@interfaces/room-group-suggests";
import { MDetailModal, MFilter } from "@modules/room-group-suggest/components";
import { IMDetailModalRef } from "@modules/room-group-suggest/components/MDetailModal/types";
import { IParams } from "@modules/room-group-suggest/types";
import { Typography } from "@mui/material";
import { CTable } from "@others";
import { useQuery } from "@tanstack/react-query";

const RoomGroupSuggestManagement = () => {
  useTitle("Quản lý đề xuất nhóm phòng");

  //#region Data
  const modalRef = useRef<IMDetailModalRef>(null);

  const [params, setParams] = useState<IParams>({
    page: 1,
    limit: 10,
    store_code: "",
    status: "",
  });

  const { data, refetch } = useQuery({
    queryKey: ["danh-sach-de-xuat-nhom-phong", params],
    queryFn: () => roomGroupSuggestApi.getPaginate(params),
    select: (response) => response?.data?.data,
  });

  const listData = useMemo(() => data?.data ?? [], [data]);

  const navigate = useNavigate();
  //#endregion

  //#region Event
  const onPageChange = (newPage: number) => {
    setParams((prev) => ({ ...prev, page: newPage }));
  };

  const onSearch = (newParams: IParams) => {
    setParams(newParams);
  };

  const onAdd = () => {
    navigate("/room/room-group-suggests/create");
  };

  const onViewDetail = (id: number) => () => {
    modalRef.current?.open(id);
  };
  //#endregion

  //#region Render
  const headers: TCTableHeaders<IRoomGroupSuggest> = [
    {
      key: "code",
      label: "mã nhóm",
    },
    {
      key: "name",
      label: "tên nhóm",
      cellRender: (value, record, index) => (
        <Typography variant="text-link" onClick={onViewDetail(record?.id)}>
          {value}
        </Typography>
      ),
    },
    {
      key: "store_name",
      label: "chi nhánh",
    },
    {
      key: "market_price",
      label: "giá thị trường",
      columnType: "number",
      align: "right",
    },
    {
      key: "amenities_price",
      label: "giá tiền giờ dựa\ntrên tiện ích",
      width: 150,
      columnType: "number",
      align: "right",
    },
    {
      key: "created_at",
      label: "ngày tạo nhóm",
      columnType: "date",
    },
    {
      key: "floor_area",
      label: "diện tích",
      cellRender: (value, record, index) => (
        <>{`${record?.floor_area_min}m2-${record?.floor_area_max}m2`}</>
      ),
    },
    {
      key: "amenities",
      label: "tiện ích",
      width: 350,
      columnType: "tags",
      displayTag: "name",
    },
    {
      key: "status",
      label: "trạng thái",
      columnType: "option",
      options: ROOM_GROUP_SUGGEST_STATUSES_OPTIONS,
    },
    {
      key: "action",
      label: "tác vụ",
      cellRender: (value, record, index) => (
        <CButtonGroup variant="text" className="table-actions">
          <CButton onClick={() => {}}>Duyệt</CButton>
          <CButton onClick={() => {}} color="error">
            Từ chối
          </CButton>
        </CButtonGroup>
      ),
    },
  ];
  return (
    <>
      <Typography variant="header-page">quản lý đề xuất nhóm phòng</Typography>

      <MFilter params={params} onAdd={onAdd} onSearch={onSearch} />

      <CTable
        headers={headers}
        data={listData}
        headerMultiline
        headerTransform="capitalize"
        pagination={{
          page: params.page ?? 1,
          pages: data?.pages ?? 0,
          limit: params.limit ?? 10,
          onPageChange: onPageChange,
        }}
      />

      <MDetailModal ref={modalRef} listRefetch={refetch} />
    </>
  );
  //#endregion
};
export default RoomGroupSuggestManagement;
