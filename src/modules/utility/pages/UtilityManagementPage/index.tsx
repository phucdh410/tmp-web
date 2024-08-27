import { useMemo, useRef, useState } from "react";

import { amenitiesApi } from "@apis/amenities.api";
import { ICTableHeader } from "@components/others/CTable/types";
import { CButton } from "@controls";
import { confirm } from "@funcs/confirm";
import { toast } from "@funcs/toast";
import { useTitle } from "@hooks/title";
import { IAmenity } from "@interfaces/amenities";
import { MFilter, MModal } from "@modules/utility/components";
import { IMModalRef } from "@modules/utility/components/MModal/types";
import { IParams } from "@modules/utility/types";
import { Box, Stack, Typography } from "@mui/material";
import { CTable } from "@others";
import { useQuery } from "@tanstack/react-query";

const UtilityManagementPage = () => {
  useTitle("Quản lý tiện ích");

  //#region Data
  const modalRef = useRef<null | IMModalRef>(null);

  const [params, setParams] = useState<IParams>({
    page: 1,
    limit: 10,
    amenity_criteria_code: "",
    status: 1,
  });

  const { data, refetch } = useQuery({
    queryKey: ["danh-sach-tien-ich-phong", params],
    queryFn: () => amenitiesApi.getPaginate(params),
    select: (response) => response?.data?.data,
  });

  const listData = useMemo(() => data?.data ?? [], [data]);

  const { data: TIEU_CHI_OPTIONS } = useQuery({
    queryKey: ["danh-sach-tieu-chi-tien-ich"],
    queryFn: () => amenitiesApi.getAllCriteria(),
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

  const onEdit = (data: IAmenity) => () => {
    modalRef.current?.open(data);
  };

  const onRemove = (id: string) => () => {
    confirm({
      title: "Xóa",
      content: "Xóa tiêu chí tiện ích phòng?",
      onProceed: async () => {
        try {
          await amenitiesApi.remove(id);
          toast.success("Xóa tiêu chí tiện ích phòng thành công");
          refetch();
        } catch (error: any) {
          toast.error(error?.message ?? "Có lỗi xảy ra");
        }
      },
    });
  };
  //#endregion

  //#region Render
  const headers: ICTableHeader<IAmenity>[] = [
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
      key: "amenity_criteria_name",
      label: "tiêu chí tiện ích",
    },
    {
      key: "price",
      label: "giá tiện ích",
      align: "right",
      cellRender: (value, record, index) => (
        <span>{value?.toLocaleString()}</span>
      ),
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
      <Typography variant="header-page">Tiêu chí đánh giá tiện ích</Typography>

      <MFilter
        options={TIEU_CHI_OPTIONS ?? []}
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
        TIEU_CHI_OPTIONS={TIEU_CHI_OPTIONS ?? []}
      />
    </>
  );
  //#endregion
};
export default UtilityManagementPage;
