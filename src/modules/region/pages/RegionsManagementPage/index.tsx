import { useMemo, useRef, useState } from "react";

import { regionsApi } from "@apis/regions.api";
import { TCTableHeaders } from "@components/others/CTable/types";
import { CButton, CButtonGroup } from "@controls";
import { confirm } from "@funcs/confirm";
import { toast } from "@funcs/toast";
import { useTitle } from "@hooks/title";
import { IRegionResponse } from "@interfaces/regions";
import { MRegionModal, MToolbar } from "@modules/region/components";
import { IMRegionModalRef } from "@modules/region/components/MRegionModal/types";
import { IParams } from "@modules/region/types";
import { Typography } from "@mui/material";
import { CTable } from "@others";
import { useQuery } from "@tanstack/react-query";

const RegionsManagementPage = () => {
  useTitle("Danh sách vị trí");

  //#region Data
  const modalRef = useRef<null | IMRegionModalRef>(null);

  const [params, setParams] = useState<IParams>({ page: 1, limit: 10 });

  const { data, refetch } = useQuery({
    queryKey: ["danh-sach-vi-tri", params],
    queryFn: () => regionsApi.getPaginate(params),
    select: (response) => response?.data?.data,
  });

  const listData = useMemo(() => data?.data ?? [], [data]);
  //#endregion

  //#region Event
  const onPageChange = (newPage: number) => {
    setParams((prev) => ({ ...prev, page: newPage }));
  };

  const onCreate = () => {
    modalRef.current?.open();
  };

  const onEdit = (editData: IRegionResponse) => () => {
    modalRef.current?.open(editData);
  };

  const onRemove = (id: string) => () => {
    confirm({
      title: "Xóa vị trí",
      content: "Thao tác này không thể khôi phục",
      onProceed: async () => {
        try {
          await regionsApi.remove(id);
          refetch();
          toast.success("Xóa vị trí thành công");
        } catch (error: any) {
          toast.error(error?.message ?? "Xóa vị trí không thành công");
        }
      },
    });
  };
  //#endregion

  //#region Render
  const headers: TCTableHeaders<IRegionResponse> = [
    { key: "store_name", label: "tên chi nhánh", align: "left" },
    { key: "store_code", label: "mã chi nhánh" },
    { key: "name", label: "tên vị trí", align: "left" },
    { key: "code", label: "mã vị trí" },
    { key: "note", label: "ghi chú" },
    {
      key: "action",
      label: "thao tác",
      cellRender: (value, record, index) => (
        <CButtonGroup className="table-actions" variant="text">
          <CButton onClick={onEdit(record)}>Edit</CButton>
          <CButton color="error" onClick={onRemove(record.id)}>
            Xóa
          </CButton>
        </CButtonGroup>
      ),
    },
  ];
  return (
    <>
      <Typography variant="header-page">danh sách vị trí</Typography>

      <MToolbar onCreate={onCreate} />

      <CTable
        showIndexCol={false}
        data={listData}
        headers={headers}
        headerTransform="capitalize"
        pagination={{
          page: params.page,
          pages: data?.pages ?? 0,
          limit: params.limit,
          total: data?.amount,
          onPageChange,
        }}
      />

      <MRegionModal ref={modalRef} refetch={refetch} />
    </>
  );
  //#endregion
};
export default RegionsManagementPage;
