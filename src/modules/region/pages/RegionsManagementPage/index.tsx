import { useMemo, useRef, useState } from "react";

import { regionsApi } from "@apis/regions.api";
import { TCTableHeaders } from "@components/others/CTable/types";
import { CButton, CButtonGroup } from "@controls";
import { confirm } from "@funcs/confirm";
import { MESSAGES, noti } from "@funcs/toast";
import { useTitle } from "@hooks/title";
import { IRegionPaginationParams, IRegionResponse } from "@interfaces/regions";
import { MRegionModal, MToolbar } from "@modules/region/components";
import { IMRegionModalRef } from "@modules/region/components/MRegionModal/types";
import { Typography } from "@mui/material";
import { CTable } from "@others";
import { useQuery } from "@tanstack/react-query";

const RegionsManagementPage = () => {
  useTitle("Danh sách vị trí");

  //#region Data
  const modalRef = useRef<IMRegionModalRef>(null);

  const [params, setParams] = useState<IRegionPaginationParams>({
    page: 1,
    limit: 10,
  });

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

  const onRemove = (id: number) => () => {
    confirm({
      title: "Xóa vị trí",
      content: "Thao tác này không thể khôi phục, bạn chắc chắn?",
      onProceed: () => regionsApi.remove(id),
      onSuccess: () => {
        refetch();
        noti.success(MESSAGES("vị trí").SUCCESS.REMOVE);
      },
      onError: (error) =>
        noti.error(error?.message ?? MESSAGES("vị trí").ERROR.REMOVE),
    });
  };
  //#endregion

  //#region Render
  const headers: TCTableHeaders<IRegionResponse> = [
    { key: "name", label: "tên vị trí", align: "left" },
    { key: "code", label: "mã vị trí" },
    { key: "store_name", label: "chi nhánh", align: "left" },
    { key: "place_name", label: "khu vực", align: "left" },
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
