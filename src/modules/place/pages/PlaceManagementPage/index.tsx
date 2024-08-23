import { useMemo, useRef, useState } from "react";

import { placesApi } from "@apis/places.api";
import { storesApi } from "@apis/stores.api";
import { ICTableHeader } from "@components/others/CTable/types";
import { CButton } from "@controls";
import { confirm } from "@funcs/confirm";
import { toast } from "@funcs/toast";
import { useTitle } from "@hooks/title";
import { IPlace } from "@interfaces/places";
import { MFilter, MModal } from "@modules/place/components";
import { IMModalRef } from "@modules/place/components/MModal/types";
import { IParams } from "@modules/place/types";
import { Box, Stack, Typography } from "@mui/material";
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
    queryFn: () => placesApi.getAll(params),
    select: (response) => response?.data?.data,
  });
  console.log("🚀 ~ PlaceManagementPage ~ data:", data);

  const listData = useMemo(() => data?.data ?? [], [data]);

  const { data: STORES_OPTIONS } = useQuery({
    queryKey: ["danh-sach-chi-nhanh"],
    queryFn: () => storesApi.getAll(),
    select: (response) =>
      response?.data?.data?.map((e) => ({ id: e?.code, label: e?.name })),
  });
  //#endregion

  //#region Event
  const onPageChange = (newPage: number) => {
    setParams((prev) => ({ ...prev, page: newPage }));
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
      label: "",
      cellRender: (value, record, index) => (
        <Stack direction="row" alignItems="center" justifyContent="center">
          <CButton
            onClick={onEdit(record)}
            variant="text"
            sx={{ minWidth: "unset" }}
          >
            Edit
          </CButton>
          <CButton
            onClick={onRemove(record?.id)}
            variant="text"
            color="error"
            sx={{ minWidth: "unset" }}
          >
            Xóa
          </CButton>
        </Stack>
      ),
    },
  ];
  return (
    <>
      <Typography variant="header-page">Quản lý khu vực</Typography>

      <MFilter options={STORES_OPTIONS} params={params} onAdd={onAdd} />

      <Box mt={5}>
        <CTable
          headers={headers}
          headerTransform="capitalize"
          data={listData}
          pagination={{
            page: params.page,
            pages: data?.pages ?? 0,
            limit: params.limit,
            onPageChange: onPageChange,
          }}
        />
      </Box>

      <MModal
        ref={modalRef}
        refetch={refetch}
        STORES_OPTIONS={STORES_OPTIONS ?? []}
      />
    </>
  );
  //#endregion
};
export default PlaceManagementPage;
