import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { acceptancesApi } from "@apis/acceptances.api";
import { TCTableHeaders } from "@components/others/CTable/types";
import { ACCEPTANCE_STATUSES_OPTIONS } from "@constants/options";
import { CButton, CButtonGroup } from "@controls";
import { confirm } from "@funcs/confirm";
import { MESSAGES, noti } from "@funcs/toast";
import { useTitle } from "@hooks/title";
import { IAcceptance } from "@interfaces/acceptances";
import { MFilter, MToolbar } from "@modules/acceptance/components";
import { IParams } from "@modules/asset-life-cycle/types";
import { Typography } from "@mui/material";
import { CTable } from "@others";
import { useQuery } from "@tanstack/react-query";

const AssetLifeCyclesListPage = () => {
  useTitle("Danh sách tài sản");

  //#region Data
  const [params, setParams] = useState<IParams>({
    page: 1,
    limit: 10,
    category_id: "",
    name: "",
    region_id: "",
    repair_count: undefined,
    store_code: "",
    date: null,
  });

  const { data, refetch } = useQuery({
    queryKey: ["danh-sach-tai-san", params],
    queryFn: () => acceptancesApi.getPaginate(params),
    select: (response) => response?.data?.data,
  });

  const listData = useMemo(() => data?.data ?? [], [data]);

  const navigate = useNavigate();
  //#endregion

  //#region Event
  const onPageChange = (newPage: number) => {
    setParams((prev) => ({ ...prev, page: newPage }));
  };

  const onCreate = () => navigate("create");

  const onEdit = (id: number) => () => navigate(`update/${id}`);

  const onRemove = (id: number) => () => {
    confirm({
      title: "Xóa tài sản",
      content: "Thao tác này không thể khôi phục, bạn chắc chắn?",
      onProceed: () => acceptancesApi.remove(id),
      onSuccess: () => {
        refetch();
        noti.success(MESSAGES("tài sản").SUCCESS.REMOVE);
      },
      onError: (error) =>
        noti.error(error?.message ?? MESSAGES("tài sản").SUCCESS.REMOVE),
    });
  };
  //#endregion

  //#region Render
  const headers: TCTableHeaders<IAcceptance> = [
    {
      key: "code",
      label: "số chứng từ",
      cellRender: (value, record, index) => (
        <>
          <Link
            to={`detail/${record.id}`}
            style={{ fontWeight: 500, color: "#4b7cff" }}
          >
            {value}
          </Link>
        </>
      ),
    },
    {
      key: "document_code",
      label: "SCT đề xuất",
      cellRender: (value, record, index) => (
        <>
          <Link
            to={`detail/${record.id}`}
            style={{ fontWeight: 500, color: "#4b7cff" }}
          >
            {value}
          </Link>
        </>
      ),
    },
    {
      key: "date",
      label: "ngày nghiệm thu",
      columnType: "date",
    },
    {
      key: "store_name",
      label: "chi nhánh",
      align: "left",
    },
    {
      key: "total",
      label: "tổng tiền",
      align: "right",
      columnType: "number",
    },
    {
      key: "vendor_name",
      label: "nhà cung cấp",
      align: "left",
    },
    {
      key: "description",
      label: "mô tả",
      align: "left",
    },
    {
      key: "status",
      label: "trạng thái",
      columnType: "option",
      options: ACCEPTANCE_STATUSES_OPTIONS,
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
      <Typography variant="header-page">Danh sách tài sản</Typography>

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
export default AssetLifeCyclesListPage;
