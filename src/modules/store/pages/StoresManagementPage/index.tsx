import { useMemo, useRef, useState } from "react";

import { storesApi } from "@apis/stores.api";
import { TCTableHeaders } from "@components/others/CTable/types";
import { CButton, CButtonGroup } from "@controls";
import { confirm } from "@funcs/confirm";
import { MESSAGES, toast } from "@funcs/toast";
import { useTitle } from "@hooks/title";
import { IStoreResponse } from "@interfaces/stores";
import { MStoreModal, MToolbar } from "@modules/store/components";
import { IMStoreModalRef } from "@modules/store/components/MStoreModal/types";
import { IParams } from "@modules/store/types";
import { Typography } from "@mui/material";
import { CTable } from "@others";
import { useQuery } from "@tanstack/react-query";

const StoresManagementPage = () => {
  useTitle("Danh sách chi nhánh");

  //#region Data
  const modalRef = useRef<null | IMStoreModalRef>(null);

  const [params, setParams] = useState<IParams>({ page: 1, limit: 10 });

  const { data, refetch } = useQuery({
    queryKey: ["danh-sach-chi-nhanh", params],
    queryFn: () => storesApi.getPaginate(params),
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

  const onEdit = (editData: IStoreResponse) => () => {
    modalRef.current?.open(editData);
  };

  const onRemove = (id: string) => () => {
    confirm({
      title: "Xóa chi nhánh",
      content: "Thao tác này không thể khôi phục",
      onProceed: async () => {
        try {
          await storesApi.remove(id);
          refetch();
          toast.success(MESSAGES("chi nhánh").SUCCESS.REMOVE);
        } catch (error: any) {
          toast.error(error?.message ?? MESSAGES("chi nhánh").ERROR.REMOVE);
        }
      },
    });
  };
  //#endregion

  //#region Render
  const headers: TCTableHeaders<IStoreResponse> = [
    { key: "name", label: "tên chi nhánh", align: "left" },
    { key: "code", label: "mã chi nhánh" },
    { key: "address", label: "địa chỉ", align: "left" },
    { key: "phone", label: "SĐT" },
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
      <Typography variant="header-page">danh sách chi nhánh</Typography>

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

      <MStoreModal ref={modalRef} refetch={refetch} />
    </>
  );
  //#endregion
};
export default StoresManagementPage;
