import { TCTableHeaders } from "@components/others/CTable/types";
import { useTitle } from "@hooks/title";
import { IReceipt } from "@interfaces/receipts";
import { MToolbar } from "@modules/receipt/components";
import { Typography } from "@mui/material";
import { CTable } from "@others";
import dayjs from "dayjs";

const MOCK: IReceipt[] = [
  {
    id: "1",
    code: "PGT.0001",
    name: "Phiếu ghi tăng 1",
    store_code: "UVK",
    store_name: "Ung Văn Khiêm",
    loai_ccdc: "Micro",
    unit: "Cái",
    date: new Date(),
    reason: "Mua hàng",
    amount: 2,
    price: 300000,
    total: 600000,
  },
  {
    id: "2",
    code: "PGT.0002",
    name: "Phiếu ghi tăng 2",
    store_code: "UVK",
    store_name: "Ung Văn Khiêm",
    loai_ccdc: "Loa",
    unit: "Cái",
    date: new Date(),
    reason: "Mua hàng",
    amount: 1,
    price: 450000,
    total: 450000,
  },
];

const ReceiptsListPage = () => {
  useTitle("Danh sách phiếu ghi tăng");

  //#region Data
  //#endregion

  //#region Event
  //#endregion

  //#region Render
  const headers: TCTableHeaders<IReceipt> = [
    {
      key: "code",
      label: "số chứng từ",
    },
    {
      key: "store_name",
      label: "chi nhánh",
    },
    {
      key: "loai_ccdc",
      label: "Loại CCDC",
    },
    {
      key: "unit",
      label: "đơn vị tính",
    },
    {
      key: "date",
      label: "ngày ghi tăng",
      cellRender: (value, record, index) => (
        <>{dayjs(value).format("DD/MM/YYYY")}</>
      ),
    },
    {
      key: "reason",
      label: "lý do",
    },
    {
      key: "amount",
      label: "số lượng tăng",
    },
    {
      key: "price",
      label: "đơn giá",
      beautifyNumber: true,
    },
    {
      key: "total",
      label: "thành tiền",
      beautifyNumber: true,
    },
    {
      key: "action",
      label: "thao tác",
    },
  ];
  return (
    <>
      <Typography variant="header-page">danh sách phiếu ghi tăng</Typography>

      <MToolbar />

      <CTable
        showIndexCol={false}
        headers={headers}
        headerTransform="capitalize"
        selectable
        data={MOCK}
      />
    </>
  );
  //#endregion
};
export default ReceiptsListPage;
