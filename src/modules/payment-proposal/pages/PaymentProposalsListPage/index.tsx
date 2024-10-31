import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { paymentProposalsApi } from "@apis/payment-proposals.api";
import { TCTableHeaders } from "@components/others/CTable/types";
import { PAYMENT_PROPOSAL_STATUSES } from "@constants/enums";
import { PAYMENT_PHASES_OPTIONS } from "@constants/options";
import { CButton, CButtonGroup } from "@controls";
import { confirm } from "@funcs/confirm";
import { MESSAGES, toast } from "@funcs/toast";
import { useTitle } from "@hooks/title";
import { IPaymentProposal } from "@interfaces/payment-proposals";
import { MFilter, MToolbar } from "@modules/payment-proposal/components";
import { IParams } from "@modules/payment-proposal/types";
import { Typography } from "@mui/material";
import { CTable } from "@others";
import { useQuery } from "@tanstack/react-query";

const PaymentProposalsListPage = () => {
  useTitle("Danh sách phiếu đề xuất thanh toán");

  //#region Data
  const [params, setParams] = useState<IParams>({
    page: 1,
    limit: 10,
    status: "",
    suggest_date: null,
  });

  const { data, refetch } = useQuery({
    queryKey: ["danh-sach-phieu-de-xuat-thanh-toan", params],
    queryFn: () => paymentProposalsApi.getPaginate(params),
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
      case PAYMENT_PROPOSAL_STATUSES.APPROVED:
        return <Typography color="success">Xác nhận</Typography>;
      case PAYMENT_PROPOSAL_STATUSES.SUGGEST:
        return <Typography color="warning">Đề xuất</Typography>;
      default:
        return <Typography color="error">Không xác nhận</Typography>;
    }
  };

  const onCreate = () => navigate("/payment-proposal/create");

  const onEdit = (id: string) => () =>
    navigate(`/payment-proposal/update/${id}`);

  const onRemove = (id: string) => () => {
    confirm({
      title: "Xóa phiếu đề xuất thanh toán",
      content: "Thao tác này không thể khôi phục, bạn chắc chắn?",
      onProceed: async () => {
        try {
          await paymentProposalsApi.remove(id);
          refetch();
          toast.success(MESSAGES("phiếu đề xuất thanh toán").SUCCESS.REMOVE);
        } catch (error: any) {
          toast.error(
            error?.message ?? MESSAGES("phiếu đề xuất thanh toán").ERROR.REMOVE
          );
        }
      },
    });
  };
  //#endregion

  //#region Render
  const headers: TCTableHeaders<IPaymentProposal> = [
    {
      key: "code",
      label: "số chứng từ",
      cellRender: (value, record, index) => (
        <>
          <Link
            to={`/payment-proposal/detail/${record.id}`}
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
            to={`/payment-proposal/detail/${record.id}`}
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
      key: "tracking_type",
      label: "giai đoạn",
      cellRender: (value, record, index) => (
        <>{PAYMENT_PHASES_OPTIONS.find((e) => e.id === value)?.label}</>
      ),
    },
    {
      key: "total",
      label: "tổng tiền",
      columnType: "number",
    },
    {
      key: "user_fullname",
      label: "nhân viên đề xuất",
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
        Danh sách phiếu đề xuất thanh toán
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
export default PaymentProposalsListPage;
