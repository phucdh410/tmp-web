import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { acceptancesApi } from "@apis/acceptances.api";
import { TCTableHeaders } from "@components/others/CTable/types";
import { ACCEPTANCE_STATUSES } from "@constants/enums";
import { CButton, CButtonGroup } from "@controls";
import { confirm } from "@funcs/confirm";
import { MESSAGES, toast } from "@funcs/toast";
import { useTitle } from "@hooks/title";
import { IAcceptance } from "@interfaces/acceptances";
import { MFilter, MToolbar } from "@modules/acceptance/components";
import { IParams } from "@modules/acceptance/types";
import { Typography } from "@mui/material";
import { CTable } from "@others";
import { useQuery } from "@tanstack/react-query";

const AcceptancesListPage = () => {
  useTitle("Danh sách phiếu nghiệm thu");

  //#region Data
  const [params, setParams] = useState<IParams>({
    page: 1,
    limit: 10,
    status: "",
    suggest_date: null,
  });

  const { data, refetch } = useQuery({
    queryKey: ["danh-sach-phieu-nghiem-thu", params],
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

  const renderStatus = (status: number) => {
    switch (status) {
      case ACCEPTANCE_STATUSES.ACCEPTANCE:
        return <Typography color="success">Nghiệm thu</Typography>;
      case ACCEPTANCE_STATUSES.SUGGEST:
        return <Typography color="warning">Đề xuất</Typography>;
      default:
        return <Typography color="warning">Đề xuất</Typography>;
    }
  };

  const onCreate = () => navigate("/acceptance/create");

  const onEdit = (id: string) => () => navigate(`/acceptance/update/${id}`);

  const onRemove = (id: string) => () => {
    confirm({
      title: "Xóa phiếu nghiệm thu",
      content: "Thao tác này không thể khôi phục, bạn chắc chắn?",
      onProceed: async () => {
        try {
          await acceptancesApi.remove(id);
          refetch();
          toast.success(MESSAGES("phiếu nghiệm thu").SUCCESS.REMOVE);
        } catch (error: any) {
          toast.error(
            error?.message ?? MESSAGES("phiếu nghiệm thu").SUCCESS.REMOVE
          );
        }
      },
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
            to="#"
            // to={`detail/${record.id}`}
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
            to="#"
            // to={`detail/${record.id}`}
            style={{ fontWeight: 500, color: "#4b7cff" }}
          >
            {value}
          </Link>
        </>
      ),
    },
    {
      key: "date",
      label: "ngày đề xuất",
      columnType: "date",
    },
    {
      key: "proposed_type",
      label: "loại đề xuất",
    },
    {
      key: "asset_name",
      label: "tên tài sản",
      align: "left",
    },
    {
      key: "quantity",
      label: "số lượng",
      columnType: "number",
    },
    {
      key: "suggest_by",
      label: "nhân viên đề xuất",
    },
    {
      key: "status",
      label: "trạng thái",
      cellRender: (value, record, index) => <>{renderStatus(value)}</>,
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
      <Typography variant="header-page">Danh sách phiếu nghiệm thu</Typography>

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
export default AcceptancesListPage;
