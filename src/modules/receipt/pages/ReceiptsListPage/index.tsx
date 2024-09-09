import { useMemo, useState } from "react";
import { shallowEqual, useDispatch } from "react-redux";

import { receiptsApi } from "@apis/receipts.api";
import { TCTableHeaders } from "@components/others/CTable/types";
import { CButton, CButtonGroup } from "@controls";
import { useSelector } from "@hooks/redux";
import { useTitle } from "@hooks/title";
import { IReceipt } from "@interfaces/receipts";
import { MToolbar } from "@modules/receipt/components";
import { IParams } from "@modules/receipt/types";
import { Typography } from "@mui/material";
import { CTable } from "@others";
import { setAll, setSelected } from "@redux/slices";
import { useQuery } from "@tanstack/react-query";
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

const MOCK_2: IReceipt[] = [
  {
    id: "3",
    code: "PGT.0003",
    name: "Phiếu ghi tăng 3",
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
    id: "4",
    code: "PGT.0004",
    name: "Phiếu ghi tăng 4",
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
  const [params, setParams] = useState<IParams>({
    page: 1,
    limit: 10,
  });

  const { data } = useQuery({
    queryKey: ["danh-sach-phieu-ghi-tang", params],
    queryFn: () => receiptsApi.getPaginate(params),
    select: (response) => response?.data?.data,
  });

  const listData = useMemo(() => data?.data ?? [], [data]);

  const { isSelectedAll, selected } = useSelector(
    (state) => state.selectedReceipt,
    shallowEqual
  );

  const dispatch = useDispatch();
  //#endregion

  //#region Event
  const onPageChange = (newPage: number) => {
    setParams((prev) => ({ ...prev, page: newPage }));
  };

  const onCodesPrint = () => {};

  const onSelect = (items: any[]) => {
    dispatch(setSelected(items));
  };

  const onSelectAll = (isAll?: boolean) => {
    dispatch(setAll(!!isAll));
  };
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
      cellRender: (value, record, index) => (
        <CButtonGroup variant="text" className="table-actions">
          <CButton>Edit</CButton>
          <CButton color="error">Xóa</CButton>
        </CButtonGroup>
      ),
    },
  ];
  return (
    <>
      <Typography variant="header-page">danh sách phiếu ghi tăng</Typography>

      <MToolbar
        onCodesPrint={
          selected.length > 0 || isSelectedAll ? onCodesPrint : false
        }
      />

      <CTable
        showIndexCol={false}
        headers={headers}
        headerTransform="capitalize"
        selectable
        //!REAL
        // data={listData}
        // pagination={{
        //   page: params.page,
        //   pages: data?.pages ?? 0,
        //   limit: params.limit,
        //   onPageChange: onPageChange,
        // }}
        // selectedOutside={{
        //   isSelectedAll: isSelectedAll || selected.length === data?.amount,
        //   isIndeterminate: !!(
        //     selected &&
        //     selected.length &&
        //     selected.length < data?.amount
        //   ),
        //   selected,
        //   selectAll: onSelectAll,
        //   select: onSelect,
        // }}

        //!MOCKUP
        data={params.page === 1 ? MOCK : MOCK_2}
        pagination={{
          page: params.page,
          pages: 2 ?? 0,
          limit: params.limit,
          onPageChange: onPageChange,
        }}
        selectedOutside={{
          isSelectedAll: isSelectedAll || selected.length === 4,
          isIndeterminate: !!(
            selected &&
            selected.length &&
            selected.length < 4
          ),
          selected,
          selectAll: onSelectAll,
          select: onSelect,
        }}
      />
    </>
  );
  //#endregion
};
export default ReceiptsListPage;
