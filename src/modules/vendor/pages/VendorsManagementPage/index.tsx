import { useMemo, useRef, useState } from "react";

import { vendorsApi } from "@apis/vendors.api";
import { TCTableHeaders } from "@components/others/CTable/types";
import { CButton, CButtonGroup } from "@controls";
import { confirm } from "@funcs/confirm";
import { MESSAGES, noti } from "@funcs/toast";
import { useTitle } from "@hooks/title";
import { IVendorPaginationParams, IVendorResponse } from "@interfaces/vendors";
import { MToolbar, MVendorModal } from "@modules/vendor/components";
import { IMVendorModalRef } from "@modules/vendor/components/MVendorModal/types";
import { Typography } from "@mui/material";
import { CTable } from "@others";
import { useQuery } from "@tanstack/react-query";

const VendorsManagementPage = () => {
  useTitle("Danh sách nhà cung cấp");

  //#region Data
  const modalRef = useRef<IMVendorModalRef>(null);

  const [params, setParams] = useState<IVendorPaginationParams>({
    page: 1,
    limit: 10,
  });

  const { data, refetch } = useQuery({
    queryKey: ["danh-sach-nha-cung-cap", params],
    queryFn: () => vendorsApi.getPaginate(params),
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

  const onEdit = (editData: IVendorResponse) => () => {
    modalRef.current?.open(editData);
  };

  const onRemove = (id: number) => () => {
    confirm({
      title: "Xóa nhà cung cấp",
      content: "Thao tác này không thể khôi phục, bạn chắc chắn?",
      onProceed: () => vendorsApi.remove(id),
      onSuccess: () => {
        refetch();
        noti.success(MESSAGES("nhà cung cấp").SUCCESS.REMOVE);
      },
      onError: (error) =>
        noti.error(error?.message ?? MESSAGES("nhà cung cấp").ERROR.REMOVE),
    });
  };
  //#endregion

  //#region Render
  const headers: TCTableHeaders<IVendorResponse> = [
    { key: "name", label: "nhà cung cấp", align: "left", width: 200 },
    { key: "address", label: "địa chỉ", align: "left", width: 250 },
    { key: "phone", label: "SĐT" },
    { key: "note", label: "ghi chú", width: 260, align: "left" },
    { key: "contact", label: "phụ trách nhà cung cấp" },
    {
      key: "categories",
      label: "thuộc tính",
      align: "left",
      columnType: "tags",
      displayTag: "name",
      tagColor: "#2C95DFFF",
    },
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
      <Typography variant="header-page">danh sách nhà cung cấp</Typography>

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

      <MVendorModal ref={modalRef} refetch={refetch} />
    </>
  );
  //#endregion
};
export default VendorsManagementPage;
