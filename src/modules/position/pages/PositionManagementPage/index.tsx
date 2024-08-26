import { useMemo, useRef, useState } from "react";

import { placesApi } from "@apis/places.api";
import { positionsApi } from "@apis/positions.api";
import { storesApi } from "@apis/stores.api";
import { ICTableHeader } from "@components/others/CTable/types";
import { CButton } from "@controls";
import { confirm } from "@funcs/confirm";
import { toast } from "@funcs/toast";
import { useTitle } from "@hooks/title";
import { IPosition } from "@interfaces/positions";
import { MFilter, MModal } from "@modules/position/components";
import { IMModalRef } from "@modules/position/components/MModal/types";
import { IParams } from "@modules/position/types";
import { Box, Stack, Typography } from "@mui/material";
import { CTable } from "@others";
import { useQuery } from "@tanstack/react-query";

const PlaceManagementPage = () => {
  useTitle("Quản lý vị trí");

  //#region Data
  const modalRef = useRef<null | IMModalRef>(null);

  const [params, setParams] = useState<IParams>({
    page: 1,
    limit: 10,
    code: "",
    name: "",
    place_code: "",
    store_code: "",
  });

  const { data, refetch } = useQuery({
    queryKey: ["danh-sach-vi-tri", params],
    queryFn: () => positionsApi.getPaginate(params),
    select: (response) => response?.data?.data,
  });

  const listData = useMemo(() => data?.data ?? [], [data]);

  const { data: STORES_OPTIONS } = useQuery({
    queryKey: ["danh-sach-chi-nhanh"],
    queryFn: () => storesApi.getAll(),
    select: (response) =>
      response?.data?.data?.map((e) => ({ id: e?.code, label: e?.name })),
  });

  const { data: PLACES_OPTIONS } = useQuery({
    queryKey: ["danh-sach-tat-ca-khu-vuc"],
    queryFn: () => placesApi.getAll(),
    select: (response) =>
      response?.data?.data?.map((e) => ({ id: e?.code, label: e?.name })),
  });
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

  const onEdit = (data: IPosition) => () => {
    modalRef.current?.open(data);
  };

  const onRemove = (id: string) => () => {
    confirm({
      title: "Xóa",
      content: "Xóa vị trí?",
      onProceed: async () => {
        try {
          await positionsApi.remove(id);
          toast.success("Xóa vị trí thành công");
          refetch();
        } catch (error: any) {
          toast.error(error?.message ?? "Có lỗi xảy ra");
        }
      },
    });
  };
  //#endregion

  //#region Render
  const headers: ICTableHeader<IPosition>[] = [
    {
      key: "code",
      label: "mã vị trí",
    },
    {
      key: "name",
      label: "tên vị trí",
      align: "left",
    },
    {
      key: "store_name",
      label: "Chi Nhánh/Phòng Ban",
    },
    {
      key: "place_name",
      label: "Khu vực",
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
      <Typography variant="header-page">Quản lý vị trí</Typography>

      <MFilter
        options={STORES_OPTIONS ?? []}
        PLACES_OPTIONS={PLACES_OPTIONS ?? []}
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

      <MModal
        ref={modalRef}
        refetch={refetch}
        STORES_OPTIONS={STORES_OPTIONS ?? []}
        PLACES_OPTIONS={PLACES_OPTIONS ?? []}
      />
    </>
  );
  //#endregion
};
export default PlaceManagementPage;
