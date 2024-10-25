import { useMemo, useRef, useState } from "react";
import { shallowEqual, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { deprecatesApi } from "@apis/deprecates.api";
import { TCTableHeaders } from "@components/others/CTable/types";
import { CButton, CButtonGroup } from "@controls";
import { confirm } from "@funcs/confirm";
import { downloadExcel } from "@funcs/excel";
import { MESSAGES, toast } from "@funcs/toast";
import { useSelector } from "@hooks/redux";
import { useTitle } from "@hooks/title";
import { IDeprecate } from "@interfaces/deprecates";
import { MToolbar } from "@modules/deprecate/components";
import { IParams } from "@modules/deprecate/types";
import { MFilterModal } from "@modules/receipt/components";
import { IMFilterModalRef } from "@modules/receipt/components/MFilterModal/types";
import { Typography } from "@mui/material";
import { CTable } from "@others";
import { saveReceiptFilter } from "@redux/slices/filter";
import { setAllReceipts, setSelectedReceipts } from "@redux/slices/selected";
import { useQuery } from "@tanstack/react-query";

const DeprecatesListPage = () => {
  useTitle("Danh sách phiếu khấu hao");

  //#region
  const filterModalRef = useRef<null | IMFilterModalRef>(null);

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
    region_id: "",
    category_id: "",
    unit: "",
    barcode: "",
    ...filter,
  });

  const { data, refetch, isFetching } = useQuery({
    queryKey: ["danh-sach-phieu-khau-hao", params],
    queryFn: () => {
      dispatch(saveReceiptFilter(params));
      return deprecatesApi.getPaginate(params);
    },
    gcTime: 0,
    select: (response) => response?.data?.data,
    placeholderData: (previousData) => previousData,
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
      title: "Xóa phiếu khấu hao",
      content: "Xóa sẽ không thể khôi phục, bạn chắc chắn?",
      onProceed: async () => {
        try {
          await deprecatesApi.remove(id);
          toast.success(MESSAGES("phiếu khấu hao").SUCCESS.REMOVE);
          refetch();
        } catch (error: any) {
          toast.error(
            error?.message ?? MESSAGES("phiếu khấu hao").ERROR.REMOVE
          );
        }
      },
    });
  };

  const onExport = async () => {
    try {
      const res = await deprecatesApi.exportExcel(params);

      downloadExcel(res, "report");
    } catch (error: any) {
      toast.error(error?.message ?? "Export không thành công");
    }
  };

  const onSearch = (newParams: IParams) => {
    setParams((prev) => ({ ...prev, ...newParams }));
  };
  //#endregion

  //#region Render
  const headers: TCTableHeaders<IDeprecate> = [
    {
      key: "month",
      label: "tháng",
    },
    {
      key: "year",
      label: "năm",
    },
    {
      key: "store",
      label: "chi nhánh",
      align: "left",
      cellRender: (value, record, index) => <>{value?.name}</>,
    },
    {
      key: "deprecate_date",
      label: "ngày khấu hao",
      columnType: "date",
    },
    {
      key: "created_date",
      label: "ngày chứng từ",
      columnType: "date",
    },
    {
      key: "sum_of_amount",
      label: "tổng giá trị tính KH",
      columnType: "number",
    },
    {
      key: "sum_of_depreciation_amount",
      label: "giá trị khấu hao",
      columnType: "number",
    },
    {
      key: "depreciation_accumulation",
      label: "khấu hao lũy kế",
      columnType: "number",
    },
    {
      key: "remaining",
      label: "giá trị còn lại",
      cellRender: (value, record, index) => (
        <>
          {(
            record?.sum_of_amount - record?.sum_of_depreciation_amount
          )?.toLocaleString()}
        </>
      ),
    },
    {
      key: "progress_status",
      label: "trạng thái",
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
      <Typography variant="header-page">danh sách phiếu khấu hao</Typography>

      <MToolbar onOpenFilter={onOpenFilter} onExport={onExport} />

      <CTable
        showIndexCol={false}
        loading={isFetching}
        headers={headers}
        headerTransform="capitalize"
        headerMultiline
        selectable
        data={listData}
        pagination={{
          page: params.page,
          pages: data?.pages ?? 0,
          limit: params.limit,
          onPageChange: onPageChange,
          showTotal: true,
          total: data?.amount,
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

      <MFilterModal ref={filterModalRef} onSearch={onSearch} />
    </>
  );
  //#endregion
};
export default DeprecatesListPage;
