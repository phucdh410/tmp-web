import { useMemo, useRef, useState } from "react";
import { shallowEqual } from "react-redux";
import { useNavigate } from "react-router-dom";

import { issuesApi } from "@apis/issues.api";
import { TCTableHeaders } from "@components/others/CTable/types";
import { CButton, CButtonGroup } from "@controls";
import { confirm } from "@funcs/confirm";
import { downloadExcel } from "@funcs/excel";
import { MESSAGES, noti } from "@funcs/toast";
import { useSelector } from "@hooks/redux";
import { useTitle } from "@hooks/title";
import { IIssue } from "@interfaces/issues";
import { MToolbar } from "@modules/issue/components";
import { MFilterModal } from "@modules/issue/components";
import { IMFilterModalRef } from "@modules/issue/components/MFilterModal/types";
import { IParams } from "@modules/issue/types";
import { Typography } from "@mui/material";
import { CTable } from "@others";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

const IssuesListPage = () => {
  useTitle("Danh sách phiếu ghi giảm");

  //#region
  const filterModalRef = useRef<IMFilterModalRef>(null);

  const navigate = useNavigate();

  const [params, setParams] = useState<IParams>({
    page: 1,
    limit: 10,
    start_date: dayjs().startOf("month").toDate(),
    end_date: dayjs().endOf("month").toDate(),
    code: "",
  });

  const { data, refetch, isFetching } = useQuery({
    queryKey: ["danh-sach-phieu-ghi-giam", params],
    queryFn: () => issuesApi.getPaginate(params),
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
    // dispatch(setSelectedReceipts(items));
  };

  const onSelectAll = (isAll?: boolean) => {
    // dispatch(setAllReceipts(!!isAll));
  };

  const onOpenFilter = () => {
    filterModalRef.current?.open(params);
  };

  const onEdit = (id: number) => () => {
    navigate(`update/${id}`);
  };

  const onRemove = (id: number) => () => {
    confirm({
      title: "Xóa phiếu ghi giảm",
      content: "Thao tác này không thể khôi phục, bạn chắc chắn?",
      onProceed: async () => {
        try {
          await issuesApi.remove(id);
          noti.success(MESSAGES("phiếu ghi giảm").SUCCESS.REMOVE);
          refetch();
        } catch (error: any) {
          noti.error(error?.message ?? MESSAGES("phiếu ghi giảm").ERROR.REMOVE);
        }
      },
    });
  };

  const onExport = async () => {
    try {
      const res = await issuesApi.exportExcel(params);

      downloadExcel(res, "report");
    } catch (error: any) {
      noti.error(error?.message ?? "Export không thành công");
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
      align: "right",
      columnType: "number",
    },
    {
      key: "sum_of_depreciation_amount",
      label: "giá trị\ntài sản",
      align: "right",
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
        selection={{
          isSelectedAll: isSelectedAll || selected.length === data?.amount,
          isIndeterminate: !!(
            selected &&
            selected.length &&
            selected.length < (data?.amount ?? 0)
          ),
          selectedList: selected,
          onSelect,
          onSelectAll,
        }}
      />

      <MFilterModal ref={filterModalRef} onSearch={onSearch} />
    </>
  );
  //#endregion
};
export default IssuesListPage;
