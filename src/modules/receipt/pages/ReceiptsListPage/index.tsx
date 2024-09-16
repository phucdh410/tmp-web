import { useMemo, useRef, useState } from "react";
import { shallowEqual, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { receiptsApi } from "@apis/receipts.api";
import { TCTableHeaders } from "@components/others/CTable/types";
import { CButton, CButtonGroup } from "@controls";
import { confirm } from "@funcs/confirm";
import { toast } from "@funcs/toast";
import { useSelector } from "@hooks/redux";
import { useTitle } from "@hooks/title";
import { IReceipt } from "@interfaces/receipts";
import { IMCodesPrintModalRef } from "@modules/asset/components/MCodesPrintModal/types";
import {
  MCodesPrintModal,
  MFilterModal,
  MToolbar,
} from "@modules/receipt/components";
import { IMFilterModalRef } from "@modules/receipt/components/MFilterModal/types";
import { IParams } from "@modules/receipt/types";
import { Typography } from "@mui/material";
import { CTable } from "@others";
import { saveReceiptFilter } from "@redux/slices/filter";
import { setAllReceipts, setSelectedReceipts } from "@redux/slices/selected";
import { useQuery } from "@tanstack/react-query";

const ReceiptsListPage = () => {
  useTitle("Danh sách phiếu ghi tăng");

  //#region Data
  const filterModalRef = useRef<null | IMFilterModalRef>(null);
  const printModalRef = useRef<null | IMCodesPrintModalRef>(null);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const {
    filter: { page, limit, ...filter },
  } = useSelector((state) => state.filterReceipt, shallowEqual);

  const [params, setParams] = useState<IParams>({
    page: page ?? 1,
    limit: limit ?? 0,
    store_code: "",
    place_id: "",
    category_id: "",
    unit: "",
    barcode: "",
    ...filter,
  });

  const { data, refetch } = useQuery({
    queryKey: ["danh-sach-phieu-ghi-tang", params],
    queryFn: () => {
      dispatch(saveReceiptFilter(params));
      return receiptsApi.getPaginate(params);
    },
    select: (response) => response?.data?.data,
  });

  const listData = useMemo(() => data?.data ?? [], [data]);

  const { isSelectedAll, selected } = useSelector(
    (state) => state.selectedReceipt,
    shallowEqual
  );
  //#endregion

  //#region Event
  const onPageChange = (newPage: number) => {
    setParams((prev) => ({ ...prev, page: newPage }));
  };

  const onSelect = (items: any[]) => {
    dispatch(setSelectedReceipts(items));
  };

  const onSelectAll = (isAll?: boolean) => {
    dispatch(setAllReceipts(!!isAll));
  };

  const onOpenFilter = () => {
    filterModalRef.current?.open(params);
  };

  const onEdit = (id: string) => () => {
    navigate(`update/${id}`);
  };

  const onRemove = (id: string) => () => {
    confirm({
      title: "Xóa phiếu ghi tăng",
      content: "Xóa sẽ không thể khôi phục, bạn chắc chắn?",
      onProceed: async () => {
        try {
          await receiptsApi.remove(id);
          toast.success("Xóa phiếu ghi tăng thành công");
          refetch();
        } catch (error: any) {
          toast.error(error?.message ?? "Xóa phiếu ghi tăng không thành công");
        }
      },
    });
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
      key: "category_name",
      label: "Loại CCDC",
    },
    {
      key: "unit",
      label: "đơn vị tính",
    },
    {
      key: "date",
      label: "ngày ghi tăng",
      columnType: "date",
    },
    {
      key: "reason",
      label: "lý do",
      align: "left",
    },
    {
      key: "quantity",
      label: "số lượng tăng",
    },
    {
      key: "price",
      label: "đơn giá",
      columnType: "number",
    },
    {
      key: "amount",
      label: "thành tiền",
      columnType: "number",
    },
    {
      key: "action",
      label: "thao tác",
      cellRender: (value, record, index) => (
        <CButtonGroup variant="text" className="table-actions">
          <CButton onClick={onEdit(record.id)}>Edit</CButton>
          <CButton color="error" onClick={onRemove(record.id)}>
            Xóa
          </CButton>
        </CButtonGroup>
      ),
    },
  ];
  return (
    <>
      <Typography variant="header-page">danh sách phiếu ghi tăng</Typography>

      <MToolbar onOpenFilter={onOpenFilter} />

      <CTable
        showIndexCol={false}
        headers={headers}
        headerTransform="capitalize"
        selectable
        data={listData}
        pagination={{
          page: params.page,
          pages: data?.pages ?? 0,
          limit: params.limit,
          onPageChange: onPageChange,
        }}
        selectedOutside={{
          isSelectedAll: isSelectedAll || selected.length === data?.amount,
          isIndeterminate: !!(
            selected &&
            selected.length &&
            selected.length < (data?.amount ?? 0)
          ),
          selected,
          selectAll: onSelectAll,
          select: onSelect,
        }}
      />

      <MFilterModal ref={filterModalRef} />
      <MCodesPrintModal ref={printModalRef} />
    </>
  );
  //#endregion
};
export default ReceiptsListPage;
