import { useMemo, useRef, useState } from "react";
import { shallowEqual } from "react-redux";
import { useNavigate } from "react-router-dom";

import { liquidatesApi } from "@apis/liquidates.api";
import { TCTableHeaders } from "@components/others/CTable/types";
import { CButton, CButtonGroup } from "@controls";
import { confirm } from "@funcs/confirm";
import { downloadExcel } from "@funcs/excel";
import { MESSAGES, noti } from "@funcs/toast";
import { useSelector } from "@hooks/redux";
import { useTitle } from "@hooks/title";
import { ILiquidate } from "@interfaces/liquidates";
import { MToolbar } from "@modules/liquidate/components";
import { MFilterModal } from "@modules/liquidate/components";
import { IMFilterModalRef } from "@modules/liquidate/components/MFilterModal/types";
import { IParams } from "@modules/liquidate/types";
import { Typography } from "@mui/material";
import { CTable } from "@others";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

const LiquidatesListPage = () => {
  useTitle("Danh sách phiếu thanh lý");

  //#region
  const filterModalRef = useRef<null | IMFilterModalRef>(null);

  const navigate = useNavigate();

  const [params, setParams] = useState<IParams>({
    page: 1,
    limit: 10,
    start_date: dayjs().startOf("month").toDate(),
    end_date: dayjs().endOf("month").toDate(),
    code: "",
  });

  const { data, refetch, isFetching } = useQuery({
    queryKey: ["danh-sach-phieu-thanh-ly", params],
    queryFn: () => liquidatesApi.getPaginate(params),
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
      title: "Xóa phiếu thanh lý",
      content: "Thao tác này không thể khôi phục, bạn chắc chắn?",
      onProceed: async () => {
        try {
          await liquidatesApi.remove(id);
          noti.success(MESSAGES("phiếu thanh lý").SUCCESS.REMOVE);
          refetch();
        } catch (error: any) {
          noti.error(error?.message ?? MESSAGES("phiếu thanh lý").ERROR.REMOVE);
        }
      },
    });
  };

  const onExport = async () => {
    try {
      const res = await liquidatesApi.exportExcel(params);

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
  const headers: TCTableHeaders<ILiquidate> = [
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
      key: "liquidation_date",
      label: "ngày thanh lý",
      columnType: "date",
    },
    {
      key: "store",
      label: "chi nhánh",
      align: "left",
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
      label: "lý do thanh lý",
      align: "left",
    },
    {
      key: "progress_status",
      label: "trạng thái",
    },
    {
      key: "sum_of_liquidation_amount",
      label: "số tiền thanh lý",
      align: "right",
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
      <Typography variant="header-page">danh sách phiếu thanh lý</Typography>

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
export default LiquidatesListPage;
