import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { handoversApi } from "@apis/handovers.api";
import { TCTableHeaders } from "@components/others/CTable/types";
import { HANDOVER_STATUSES_OPTIONS } from "@constants/options";
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
    code: "",
    store_code: "",
    status: "",
    start_date: null,
    end_date: null,
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

  const onCreate = () => navigate("create");

  const onEdit = (id: number) => () => navigate(`update/${id}`);

  const onRemove = (id: number) => () => {
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
      label: "ngày bàn giao",
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
      columnType: "option",
      options: HANDOVER_STATUSES_OPTIONS,
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
