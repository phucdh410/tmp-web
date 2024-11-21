import { useMemo, useRef, useState } from "react";
import { shallowEqual } from "react-redux";
import { useNavigate } from "react-router-dom";

import { deprecatesApi } from "@apis/deprecates.api";
import { TCTableHeaders } from "@components/others/CTable/types";
import { CButton, CButtonGroup } from "@controls";
import { confirm } from "@funcs/confirm";
import { downloadExcel } from "@funcs/excel";
import { MESSAGES, noti } from "@funcs/toast";
import { useSelector } from "@hooks/redux";
import { useTitle } from "@hooks/title";
import { IDeprecate } from "@interfaces/deprecates";
import { MToolbar } from "@modules/deprecate/components";
import { MFilterModal } from "@modules/deprecate/components";
import { IMFilterModalRef } from "@modules/deprecate/components/MFilterModal/types";
import { IParams } from "@modules/deprecate/types";
import { Typography } from "@mui/material";
import { CTable } from "@others";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

const DeprecatesListPage = () => {
  useTitle("Danh sách phiếu khấu hao");

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
    queryKey: ["danh-sach-phieu-khau-hao", params],
    queryFn: () => deprecatesApi.getPaginate(params),
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
      title: "Xóa phiếu khấu hao",
      content: "Thao tác này không thể khôi phục, bạn chắc chắn?",
      onProceed: async () => {
        try {
          await deprecatesApi.remove(id);
          noti.success(MESSAGES("phiếu khấu hao").SUCCESS.REMOVE);
          refetch();
        } catch (error: any) {
          noti.error(error?.message ?? MESSAGES("phiếu khấu hao").ERROR.REMOVE);
        }
      },
    });
  };

  const onExport = async () => {
    try {
      const res = await deprecatesApi.exportExcel(params);

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
      align: "right",
      columnType: "number",
    },
    {
      key: "sum_of_depreciation_amount",
      label: "giá trị khấu hao",
      align: "right",
      columnType: "number",
    },
    {
      key: "depreciation_accumulation",
      label: "khấu hao lũy kế",
      align: "right",
      columnType: "number",
    },
    {
      key: "remaining",
      label: "giá trị còn lại",
      align: "right",
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
export default DeprecatesListPage;
