import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { TCTableHeaders } from "@components/others/CTable/types";
import { PAYMENT_PROPOSAL_STATUSES } from "@constants/enums";
import { CButton, CButtonGroup } from "@controls";
import { confirm } from "@funcs/confirm";
import { toast } from "@funcs/toast";
import { useTitle } from "@hooks/title";
import { MFilter, MToolbar } from "@modules/payment-proposal/components";
import { IParams } from "@modules/payment-proposal/types";
import { Typography } from "@mui/material";
import { CTable } from "@others";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

export interface IPurchaseProposalNQuote {
  id: string;
  code: string;
  suggest_code: string;
  suggest_date: string | Date;
  type: string;
  name: string;
  quantity: number;
  suggest_by: string;
  status: PAYMENT_PROPOSAL_STATUSES;
}

const MOCK: IPurchaseProposalNQuote[] = [
  {
    id: "1",
    code: "PĐXMTS.0001",
    suggest_code: "DXMHC000001",
    name: "Chuột",
    quantity: 1,
    suggest_date: dayjs().toDate(),
    suggest_by: "0002 - Trần Nguyên Khánh Tê Liệt",
    type: "Mua mới",
    status: 0,
  },
  {
    id: "2",
    code: "PĐXMTS.0002",
    suggest_code: "DXMHC000002",
    name: "Chuột",
    quantity: 2,
    suggest_date: dayjs().toDate(),
    suggest_by: "0002 - Trần Nguyên Khánh Tê Liệt",
    type: "Bù định mức",
    status: 0,
  },
  {
    id: "3",
    code: "PĐXMTS.0003",
    suggest_code: "DXMHC000003",
    name: "Bàn phím",
    quantity: 3,
    suggest_date: dayjs().toDate(),
    suggest_by: "0002 - Trần Nguyên Khánh Tê Liệt",
    type: "Mua mới",
    status: 2,
  },
  {
    id: "4",
    code: "PĐXMTS.0004",
    suggest_code: "DXMHC000004",
    name: "Loa",
    quantity: 4,
    suggest_date: dayjs().toDate(),
    suggest_by: "0002 - Trần Nguyên Khánh Tê Liệt",
    type: "Kaizen",
    status: 1,
  },
  {
    id: "5",
    code: "PĐXMTS.0005",
    suggest_code: "DXMHC000005",
    name: "Màn hình",
    quantity: 5,
    suggest_date: dayjs().toDate(),
    suggest_by: "0002 - Trần Nguyên Khánh Tê Liệt",
    type: "Thay thế",
    status: 2,
  },
  {
    id: "6",
    code: "PĐXMTS.0006",
    suggest_code: "DXMHC000006",
    name: "Micro",
    quantity: 6,
    suggest_date: dayjs().toDate(),
    suggest_by: "0002 - Trần Nguyên Khánh Tê Liệt",
    type: "Mua mới",
    status: 1,
  },
];

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
    queryFn: () => {},
    select: (response) => response?.data?.data,
  });

  const listData = useMemo(() => data?.data ?? [], [data]);
  console.log("🚀 ~ PaymentProposalsListPage ~ listData:", listData);

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
      title: "Xóa",
      content: "Xác nhận xóa phiếu đề xuất thanh toán?",
      onProceed: async () => {
        try {
          // await removeApi();
          refetch();
          toast.success("Xóa phiếu đề xuất thanh toán thành công");
        } catch (error: any) {
          toast.error(
            error?.message ?? "Xóa phiếu đề xuất thanh toán không thành công"
          );
        }
      },
    });
  };
  //#endregion

  //#region Render
  const headers: TCTableHeaders<IPurchaseProposalNQuote> = [
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
      key: "suggest_code",
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
      key: "suggest_date",
      label: "ngày đề xuất",
      columnType: "date",
    },
    {
      key: "type",
      label: "loại đề xuất",
    },
    {
      key: "name",
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
      <Typography variant="header-page">
        Danh sách phiếu đề xuất thanh toán
      </Typography>

      <MToolbar onCreate={onCreate} />
      <MFilter params={params} setParams={setParams} />

      <CTable
        showIndexCol={false}
        data={MOCK}
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
