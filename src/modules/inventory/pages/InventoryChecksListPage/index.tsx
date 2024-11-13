import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { inventoriesApi } from "@apis/inventories.api";
import { TCTableHeaders } from "@components/others/CTable/types";
import { CButton, CButtonGroup } from "@controls";
import { confirm } from "@funcs/confirm";
import { MESSAGES, noti } from "@funcs/toast";
import { useTitle } from "@hooks/title";
import { IInventory } from "@interfaces/inventories";
import { MFilter, MToolbar } from "@modules/inventory/components";
import { IParams } from "@modules/inventory/types";
import { Typography } from "@mui/material";
import { CTable } from "@others";
import { useQuery } from "@tanstack/react-query";

const InventoryChecksListPage = () => {
  useTitle("Danh sách phiếu kiểm kê");

  //#region Data
  const [params, setParams] = useState<IParams>({
    page: 1,
    limit: 10,
    store_code: "",
    start_date: null,
    end_date: null,
  });

  const { data, refetch } = useQuery({
    queryKey: ["danh-sach-phieu-kiem-ke", params],
    queryFn: () => inventoriesApi.getPaginate(params),
    select: (response) => response?.data?.data,
  });

  const listData = useMemo(() => data?.data ?? [], [data]);

  const navigate = useNavigate();
  //#endregion

  //#region Event
  const onPageChange = (newPage: number) => {
    setParams((prev) => ({ ...prev, page: newPage }));
  };

  const onCreate = () => navigate("/paper/inventories/create");

  const onEdit = (id: number) => () =>
    navigate(`/paper/inventories/update/${id}`);

  const onRemove = (id: number) => () => {
    confirm({
      title: "Xóa phiếu kiểm kê",
      content: "Thao tác này không thể khôi phục, bạn chắc chắn?",
      onProceed: async () => {
        try {
          await inventoriesApi.remove(id);
          refetch();
          noti.success(MESSAGES("phiếu kiểm kê").SUCCESS.REMOVE);
        } catch (error: any) {
          noti.error(error?.message ?? MESSAGES("phiếu kiểm kê").ERROR.REMOVE);
        }
      },
    });
  };
  //#endregion

  //#region Render
  const headers: TCTableHeaders<IInventory> = [
    {
      key: "code",
      label: "số chứng từ",
      cellRender: (value, record, index) => (
        <>
          <Link
            to={`/paper/inventories/detail/${record.id}`}
            style={{ fontWeight: 500, color: "#4b7cff" }}
          >
            {value}
          </Link>
        </>
      ),
    },
    {
      key: "date",
      label: "ngày kiểm kê",
      columnType: "date",
    },
    {
      key: "store",
      label: "chi nhánh",
      align: "left",
      cellRender: (value, record, index) => <>{value?.name}</>,
    },
    {
      key: "handover_user",
      label: "nhân viên kiểm kê",
      align: "left",
      cellRender: (value, record, index) => <>{value?.name}</>,
    },
    {
      key: "receiver_user",
      label: "nhân viên nhận kiểm kê",
      align: "left",
      cellRender: (value, record, index) => <>{value?.name}</>,
    },
    {
      key: "reason",
      label: "lý do kiểm kê",
      align: "left",
    },
    {
      key: "status",
      label: "trạng thái",
    },
    {
      key: "action",
      label: "thao tác",
      cellRender: (value, record, index) => (
        <CButtonGroup className="table-actions" variant="text">
          <CButton onClick={onEdit(record?.id)}>Edit</CButton>
          <CButton color="error" onClick={onRemove(record?.id)}>
            Xóa
          </CButton>
        </CButtonGroup>
      ),
    },
  ];
  return (
    <>
      <Typography variant="header-page">Danh sách phiếu kiểm kê</Typography>

      <MToolbar onCreate={onCreate} />
      <MFilter params={params} setParams={setParams} />

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
    </>
  );
  //#endregion
};
export default InventoryChecksListPage;
