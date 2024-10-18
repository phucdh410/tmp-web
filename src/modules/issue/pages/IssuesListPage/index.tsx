import { useMemo, useRef, useState } from "react";
import { shallowEqual, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { issuesApi } from "@apis/issues.api";
import { TCTableHeaders } from "@components/others/CTable/types";
import { CButton, CButtonGroup } from "@controls";
import { confirm } from "@funcs/confirm";
import { downloadExcel } from "@funcs/excel";
import { toast } from "@funcs/toast";
import { useSelector } from "@hooks/redux";
import { useTitle } from "@hooks/title";
import { IIssue } from "@interfaces/issues";
import { MToolbar } from "@modules/issue/components";
import { IParams } from "@modules/issue/types";
import { MFilterModal } from "@modules/receipt/components";
import { IMFilterModalRef } from "@modules/receipt/components/MFilterModal/types";
import { Typography } from "@mui/material";
import { CTable } from "@others";
import { saveReceiptFilter } from "@redux/slices/filter";
import { setAllReceipts, setSelectedReceipts } from "@redux/slices/selected";
import { useQuery } from "@tanstack/react-query";

const IssuesListPage = () => {
  useTitle("Danh sách phiếu ghi giảm");

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
    queryKey: ["danh-sach-phieu-luan-chuyen", params],
    queryFn: () => {
      dispatch(saveReceiptFilter(params));
      return issuesApi.getPaginate(params);
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
      title: "Xóa phiếu ghi giảm",
      content: "Xóa sẽ không thể khôi phục, bạn chắc chắn?",
      onProceed: async () => {
        try {
          await issuesApi.remove(id);
          toast.success("Xóa phiếu ghi giảm thành công");
          refetch();
        } catch (error: any) {
          toast.error(error?.message ?? "Xóa phiếu ghi giảm không thành công");
        }
      },
    });
  };

  const onExport = async () => {
    try {
      const res = await issuesApi.exportExcel(params);

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
  const headers: TCTableHeaders<IIssue> = [
    {
      key: "code",
      label: "số chứng từ",
    },
    {
      key: "created_date",
      label: "ngày chứng từ",
      columnType: "date",
    },
    {
      key: "issued_date",
      label: "ngày ghi giảm",
      columnType: "date",
    },
    {
      key: "store",
      label: "chi nhánh",
      align: "left",
      cellRender: (value, record, index) => <>{value?.name}</>,
    },
    {
      key: "user",
      label: "NV phụ trách\ntài sản",
      align: "left",
      cellRender: (value, record, index) => <>{value?.name}</>,
    },
    {
      key: "category",
      label: "hình thức\nghi giảm",
      cellRender: (value, record, index) => <>{value?.name}</>,
    },
    {
      key: "sum_of_amount",
      label: "giá trị\nnguyên giá",
      columnType: "number",
    },
    {
      key: "sum_of_depreciation_amount",
      label: "giá trị\ntài sản",
      columnType: "number",
    },
    {
      key: "note",
      label: "Diễn giải",
      align: "left",
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
      <Typography variant="header-page">danh sách phiếu ghi giảm</Typography>

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
export default IssuesListPage;
