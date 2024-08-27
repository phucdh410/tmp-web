import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { roomGroupSuggestApi } from "@apis/room-group-suggests.api";
import { TCTableHeaders } from "@components/others/CTable/types";
import { CButton } from "@controls";
import { useTitle } from "@hooks/title";
import {
  IAmenityInRoomGroup,
  IRoomGroupSuggest,
} from "@interfaces/room-group-suggests";
import { MFilter } from "@modules/room-group-suggest/components";
import { IParams } from "@modules/room-group-suggest/types";
import { Box, Stack, Typography } from "@mui/material";
import { CTable } from "@others";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

const RoomGroupSuggestManagement = () => {
  useTitle("Quản lý đề xuất nhóm phòng");

  //#region Data
  const [params, setParams] = useState<IParams>({
    page: 1,
    limit: 10,
    store_code: "",
    status: "",
  });

  const { data } = useQuery({
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
    navigate("/category/room-group-suggests/create");
  };

  const renderStatus = (status: number) => {
    switch (status) {
      case 1:
        return (
          <Typography color="#117DB7" whiteSpace="nowrap">
            Tạo mới
          </Typography>
        );
      case 2:
        return (
          <Typography color="#0FE171" whiteSpace="nowrap">
            Duyệt
          </Typography>
        );
      default:
        return (
          <Typography color="#FF0606" whiteSpace="nowrap">
            Không duyệt
          </Typography>
        );
    }
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
    },
    {
      key: "store_name",
      label: "chi nhánh",
    },
    {
      key: "market_price",
      label: "giá thị trường",
      cellRender: (value, record, index) => <>{value?.toLocaleString()}</>,
    },
    {
      key: "amenities_price",
      label: "giá tiền giờ dựa\ntrên tiện ích",
      width: 150,
      cellRender: (value, record, index) => <>{value?.toLocaleString()}</>,
    },
    {
      key: "created_at",
      label: "ngày tạo nhóm",
      cellRender: (value, record, index) => (
        <>{dayjs(value).format("DD/MM/YYYY")}</>
      ),
    },
    {
      key: "floor_area",
      label: "diện tích",
      cellRender: (value, record, index) => (
        <span>{`${record?.floor_area_min}m2-${record?.floor_area_max}m2`}</span>
      ),
    },
    {
      key: "amenities",
      label: "tiện ích",
      width: 350,
      cellRender: (value: IAmenityInRoomGroup[], record, index) => (
        <Typography className="line-clamp-2">
          {value.map((e) => e?.name).join(", ")}
        </Typography>
      ),
    },
    {
      key: "status",
      label: "trạng thái",
      cellRender: (value, record, index) => renderStatus(value as number),
    },
    {
      key: "action",
      label: "tác vụ",
      cellRender: (value, record, index) => (
        <Stack direction="row" alignItems="center" justifyContent="center">
          <CButton onClick={() => {}} variant="text" sx={{ minWidth: "unset" }}>
            Duyệt
          </CButton>
          <CButton
            onClick={() => {}}
            variant="text"
            color="error"
            sx={{ minWidth: "unset" }}
          >
            Từ chối
          </CButton>
        </Stack>
      ),
    },
  ];
  return (
    <>
      <Typography variant="header-page">quản lý đề xuất nhóm phòng</Typography>

      <MFilter params={params} onAdd={onAdd} onSearch={onSearch} />

      <Box mt={5}>
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
      </Box>
    </>
  );
  //#endregion
};
export default RoomGroupSuggestManagement;
