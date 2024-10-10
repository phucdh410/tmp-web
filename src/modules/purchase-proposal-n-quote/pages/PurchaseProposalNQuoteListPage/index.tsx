import { useMemo, useState } from "react";

import { TCTableHeaders } from "@components/others/CTable/types";
import { PURCHASE_PROPOSAL_N_QUOTE_STATUSES } from "@constants/enums";
import { useTitle } from "@hooks/title";
import { MToolbar } from "@modules/purchase-proposal-n-quote/components";
import { IParams } from "@modules/purchase-proposal-n-quote/types";
import { Typography } from "@mui/material";
import { CTable } from "@others";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

export interface IPurchaseProposalNQuote {
  id: string;
  code: string;
  suggest_date: string | Date;
  store_name: string;
  created_by: string;
  suggest_by: string;
  type: string;
  status: PURCHASE_PROPOSAL_N_QUOTE_STATUSES;
}

const MOCK: IPurchaseProposalNQuote[] = [
  {
    id: "1",
    code: "PĐXMTS.0001",
    suggest_date: dayjs().toDate(),
    store_name: "ICOOL Ung Văn Khiêm",
    created_by: "0001 - Lê Khánh Phương Béo",
    suggest_by: "0002 - Trần Nguyên Khánh Tê Liệt",
    type: "Mua mới",
    status: 0,
  },
  {
    id: "2",
    code: "PĐXMTS.0002",
    suggest_date: dayjs().toDate(),
    store_name: "ICOOL Ung Văn Khiêm",
    created_by: "0001 - Lê Khánh Phương Béo",
    suggest_by: "0002 - Trần Nguyên Khánh Tê Liệt",
    type: "Mua mới",
    status: 1,
  },
  {
    id: "3",
    code: "PĐXMTS.0003",
    suggest_date: dayjs().toDate(),
    store_name: "ICOOL Ung Văn Khiêm",
    created_by: "0001 - Lê Khánh Phương Béo",
    suggest_by: "0002 - Trần Nguyên Khánh Tê Liệt",
    type: "Mua mới",
    status: 1,
  },
  {
    id: "4",
    code: "PĐXMTS.0004",
    suggest_date: dayjs().toDate(),
    store_name: "ICOOL Ung Văn Khiêm",
    created_by: "0001 - Lê Khánh Phương Béo",
    suggest_by: "0002 - Trần Nguyên Khánh Tê Liệt",
    type: "Mua mới",
    status: 2,
  },
  {
    id: "5",
    code: "PĐXMTS.0005",
    suggest_date: dayjs().toDate(),
    store_name: "ICOOL Ung Văn Khiêm",
    created_by: "0001 - Lê Khánh Phương Béo",
    suggest_by: "0002 - Trần Nguyên Khánh Tê Liệt",
    type: "Mua mới",
    status: 0,
  },
  {
    id: "6",
    code: "PĐXMTS.0006",
    suggest_date: dayjs().toDate(),
    store_name: "ICOOL Ung Văn Khiêm",
    created_by: "0001 - Lê Khánh Phương Béo",
    suggest_by: "0002 - Trần Nguyên Khánh Tê Liệt",
    type: "Mua mới",
    status: 2,
  },
  {
    id: "7",
    code: "PĐXMTS.0007",
    suggest_date: dayjs().toDate(),
    store_name: "ICOOL Ung Văn Khiêm",
    created_by: "0001 - Lê Khánh Phương Béo",
    suggest_by: "0002 - Trần Nguyên Khánh Tê Liệt",
    type: "Mua mới",
    status: 1,
  },
];

const PurchaseProposalNQuoteListPage = () => {
  useTitle("Danh sách phiếu đề xuất mua tài sản");

  //#region Data
  const [params, setParams] = useState<IParams>({
    page: 1,
    limit: 10,
    status: "",
    suggest_date: null,
  });

  const { data } = useQuery({
    queryKey: ["danh-sach-phieu-de-xuat-mua-hang", params],
    queryFn: () => {},
    select: (response) => response?.data?.data,
  });

  const listData = useMemo(() => data?.data ?? [], [data]);
  //#endregion

  //#region Event
  const onPageChange = (newPage: number) => {
    setParams((prev) => ({ ...prev, page: newPage }));
  };

  const renderStatus = (status: number) => {
    switch (status) {
      case PURCHASE_PROPOSAL_N_QUOTE_STATUSES.DONE:
        return <Typography color="success">Hoàn thành</Typography>;
      case PURCHASE_PROPOSAL_N_QUOTE_STATUSES.PENDING:
        return <Typography color="warning">Đang xử lý</Typography>;
      default:
        return <Typography color="error">Mới tạo</Typography>;
    }
  };
  //#endregion

  //#region Render
  const headers: TCTableHeaders<IPurchaseProposalNQuote> = [
    {
      key: "code",
      label: "số chứng từ",
    },
    {
      key: "suggest_date",
      label: "ngày đề xuất",
      columnType: "date",
    },
    {
      key: "store_name",
      label: "chi nhánh",
    },
    {
      key: "created_by",
      label: "nhân viên tạo phiếu",
    },
    {
      key: "suggest_by",
      label: "nhân viên đề xuất",
    },
    {
      key: "type",
      label: "loại đề xuất",
    },
    {
      key: "status",
      label: "trạng thái",
      cellRender: (value, record, index) => <>{renderStatus(value)}</>,
    },
  ];
  return (
    <>
      <Typography variant="header-page">
        Danh sách phiếu đề xuất mua tài sản
      </Typography>

      <MToolbar params={params} setParams={setParams} />

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
export default PurchaseProposalNQuoteListPage;
