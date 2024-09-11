import { useMemo, useRef, useState } from "react";

import { placesApi } from "@apis/places.api";
import { ICTableHeader } from "@components/others/CTable/types";
import { CButton, CButtonGroup } from "@controls";
import { confirm } from "@funcs/confirm";
import { toast } from "@funcs/toast";
import { useGetAllStores } from "@hooks/options";
import { useTitle } from "@hooks/title";
import { IPlace } from "@interfaces/places";
import { MFilter, MModal } from "@modules/place/components";
import { IMModalRef } from "@modules/place/components/MModal/types";
import { IParams } from "@modules/place/types";
import { Box, Typography } from "@mui/material";
import { CTable } from "@others";
import { useQuery } from "@tanstack/react-query";

const PlaceManagementPage = () => {
  useTitle("Quản lý khu vực");

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

  const onSearch = (newParams: IParams) => {
    setParams(newParams);
  };

  const onAdd = () => {
    modalRef.current?.open();
  };

  const onEdit = (data: IPlace) => () => {
    modalRef.current?.open(data);
  };

  const onRemove = (id: string) => () => {
    confirm({
      title: "Xóa",
      content: "Xóa khu vực?",
      onProceed: async () => {
        try {
          await placesApi.remove(id);
          toast.success("Xóa khu vực thành công");
          refetch();
        } catch (error: any) {
          toast.error(error?.message ?? "Có lỗi xảy ra");
        }
      },
    });
  };
  //#endregion

  //#region Render
  const headers: ICTableHeader<IPlace>[] = [
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

      <MFilter
        stores={stores}
        params={params}
        onAdd={onAdd}
        onSearch={onSearch}
      />

      <Box mt={5}>
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
      </Box>

      <MModal ref={modalRef} refetch={refetch} stores={stores} />
    </>
  );
  //#endregion
};
export default PlaceManagementPage;
