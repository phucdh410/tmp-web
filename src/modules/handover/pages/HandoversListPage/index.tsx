import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { handoversApi } from "@apis/handovers.api";
import { TCTableHeaders } from "@components/others/CTable/types";
import { HANDOVER_STATUSES } from "@constants/enums";
import { CButton, CButtonGroup } from "@controls";
import { confirm } from "@funcs/confirm";
import { MESSAGES, noti } from "@funcs/toast";
import { useTitle } from "@hooks/title";
import { IHandover } from "@interfaces/handovers";
import { MFilter, MToolbar } from "@modules/handover/components";
import { IParams } from "@modules/handover/types";
import { Typography } from "@mui/material";
import { CTable } from "@others";
import { useQuery } from "@tanstack/react-query";

const HandoversListPage = () => {
  useTitle("Danh sách phiếu bàn giao tài sản");

  //#region Data
  const [params, setParams] = useState<IParams>({
    page: 1,
    limit: 10,
    status: "",
    suggest_date: null,
  });

  const { data, refetch } = useQuery({
    queryKey: ["danh-sach-phieu-ban-giao-tai-san", params],
    queryFn: () => handoversApi.getPaginate(params),
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
      case HANDOVER_STATUSES.DONE:
        return <Typography color="success">Hoàn thành</Typography>;
      case HANDOVER_STATUSES.INIT:
        return <Typography color="warning">Mới tạo</Typography>;
      default:
        return <Typography color="warning">Từ chối</Typography>;
    }
  };

  const onCreate = () => navigate("/handover/create");

  const onEdit = (id: string) => () => navigate(`/handover/update/${id}`);

  const onRemove = (id: string) => () => {
    confirm({
      title: "Xóa phiếu bàn giao",
      content: "Thao tác này không thể khôi phục, bạn chắc chắn?",
      onProceed: async () => {
        try {
          await handoversApi.remove(id);
          refetch();
          noti.success(MESSAGES("phiếu bàn giao tài sản").SUCCESS.REMOVE);
        } catch (error: any) {
          noti.error(
            error?.message ?? MESSAGES("phiếu bàn giao tài sản").ERROR.REMOVE
          );
        }
      },
    });
  };
  //#endregion

  //#region Render
  const headers: TCTableHeaders<IHandover> = [
    {
      key: "code",
      label: "số chứng từ",
      cellRender: (value, record, index) => (
        <>
          <Link
            to={`/handover/detail/${record.id}`}
            style={{ fontWeight: 500, color: "#4b7cff" }}
          >
            {value}
          </Link>
        </>
      ),
    },
    {
      key: "date",
      label: "ngày bàn giao",
      columnType: "date",
    },
    {
      key: "handover_user",
      label: "nhân viên bàn giao",
      align: "left",
      cellRender: (value, record, index) => <>{value?.name}</>,
    },
    {
      key: "receiver_user",
      label: "nhân viên nhận bàn giao",
      align: "left",
      cellRender: (value, record, index) => <>{value?.name}</>,
    },
    {
      key: "reason",
      label: "lý do bàn giao",
      align: "left",
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
      <Typography variant="header-page">
        Danh sách phiếu bàn giao tài sản
      </Typography>

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
export default HandoversListPage;
