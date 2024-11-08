import { useMemo, useRef, useState } from "react";

import { placesApi } from "@apis/places.api";
import { TCTableHeaders } from "@components/others/CTable/types";
import { CButton, CButtonGroup } from "@controls";
import { confirm } from "@funcs/confirm";
import { MESSAGES, noti } from "@funcs/toast";
import { useGetAllStores } from "@hooks/options";
import { useTitle } from "@hooks/title";
import { IPlaceResponse } from "@interfaces/places";
import { MPlaceModal, MToolbar } from "@modules/place/components";
import { IMModalRef } from "@modules/place/components/MPlaceModal/types";
import { IParams } from "@modules/place/types";
import { Typography } from "@mui/material";
import { CTable } from "@others";
import { useQuery } from "@tanstack/react-query";

const PlacesManagementPage = () => {
  useTitle("Danh sách khu vực");

  //#region Data
  const modalRef = useRef<null | IMModalRef>(null);

  const [params, setParams] = useState<IParams>({
    page: 1,
    limit: 10,
    code: "",
    name: "",
    status: 1,
    store_code: "",
  });

  const { data, refetch } = useQuery({
    queryKey: ["danh-sach-khu-vuc", params],
    queryFn: () => placesApi.getPaginate(params),
    select: (response) => response?.data?.data,
  });

  const listData = useMemo(() => data?.data ?? [], [data]);

  const { stores } = useGetAllStores();
  //#endregion

  //#region Event
  const onPageChange = (newPage: number) => {
    setParams((prev) => ({ ...prev, page: newPage }));
  };

  const onCreate = () => {
    modalRef.current?.open();
  };

  const onEdit = (editData: IPlaceResponse) => () => {
    modalRef.current?.open(editData);
  };

  const onRemove = (id: number) => () => {
    confirm({
      title: "Xóa khu vực",
      content: "Thao tác này không thể khôi phục, bạn chắc chắn?",
      onProceed: async () => {
        try {
          await placesApi.remove(id);
          refetch();
          noti.success(MESSAGES("khu vực").SUCCESS.REMOVE);
        } catch (error: any) {
          noti.error(error?.message ?? MESSAGES("khu vực").ERROR.REMOVE);
        }
      },
    });
  };
  //#endregion

  //#region Render
  const headers: TCTableHeaders<IPlaceResponse> = [
    {
      key: "code",
      label: "mã khu vực",
    },
    {
      key: "name",
      label: "tên khu vực",
      align: "left",
    },
    {
      key: "store_name",
      label: "Chi Nhánh/Phòng Ban",
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
          <CButton onClick={onEdit(record)}>Edit</CButton>
          <CButton onClick={onRemove(record?.id)} color="error">
            Xóa
          </CButton>
        </CButtonGroup>
      ),
    },
  ];
  return (
    <>
      <Typography variant="header-page">Quản lý khu vực</Typography>

      <MToolbar onCreate={onCreate} />

      <CTable
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

      <MPlaceModal ref={modalRef} refetch={refetch} stores={stores} />
    </>
  );
  //#endregion
};
export default PlacesManagementPage;
