import { useMemo, useRef, useState } from "react";

import { categoriesApi } from "@apis/categories.api";
import { TCTableHeaders } from "@components/others/CTable/types";
import { CButton, CButtonGroup } from "@controls";
import { confirm } from "@funcs/confirm";
import { MESSAGES, toast } from "@funcs/toast";
import { useTitle } from "@hooks/title";
import { ICategoryResponse } from "@interfaces/categories";
import { MCategoryModal, MToolbar } from "@modules/category/components";
import { IMCategoryModalRef } from "@modules/category/components/MCategoryModal/types";
import { IParams } from "@modules/category/types";
import { Typography } from "@mui/material";
import { CTable } from "@others";
import { useQuery } from "@tanstack/react-query";

const CategoriesManagementPage = () => {
  useTitle("Danh sách loại CCDC");

  //#region Data
  const modalRef = useRef<null | IMCategoryModalRef>(null);

  const [params, setParams] = useState<IParams>({ page: 1, limit: 10 });

  const { data, refetch } = useQuery({
    queryKey: ["danh-sach-loai-ccdc", params],
    queryFn: () => categoriesApi.getPaginate(params),
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

  const onEdit = (editData: ICategoryResponse) => () => {
    modalRef.current?.open(editData);
  };

  const onRemove = (id: string) => () => {
    confirm({
      title: "Xóa loại công cụ dụng cụ",
      content: "Thao tác này không thể khôi phục, bạn chắc chắn?",
      onProceed: async () => {
        try {
          await categoriesApi.remove(id);
          refetch();
          toast.success(MESSAGES("loại công cụ dụng cụ").SUCCESS.REMOVE);
        } catch (error: any) {
          toast.error(
            error?.message ?? MESSAGES("loại công cụ dụng cụ").ERROR.REMOVE
          );
        }
      },
    });
  };
  //#endregion

  //#region Render
  const headers: TCTableHeaders<ICategoryResponse> = [
    { key: "code", label: "mã công dụng cụ" },
    { key: "name", label: "tên công dụng cụ", align: "left" },
    { key: "note", label: "mô tả" },
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
      <Typography variant="header-page">
        danh sách loại công cụ dụng cụ
      </Typography>

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

      <MCategoryModal ref={modalRef} refetch={refetch} />
    </>
  );
  //#endregion
};
export default CategoriesManagementPage;
