import { useMemo, useRef, useState } from "react";
import { shallowEqual } from "react-redux";
import { useNavigate } from "react-router-dom";

import { transfersApi } from "@apis/transfers.api";
import { TCTableHeaders } from "@components/others/CTable/types";
import { TRANSFER_TYPES_OPTIONS } from "@constants/options";
import { CButton, CButtonGroup } from "@controls";
import { confirm } from "@funcs/confirm";
import { downloadExcel } from "@funcs/excel";
import { MESSAGES, noti } from "@funcs/toast";
import { useSelector } from "@hooks/redux";
import { useTitle } from "@hooks/title";
import { ITransfer } from "@interfaces/transfers";
import { MFilterModal } from "@modules/transfer/components";
import { MToolbar } from "@modules/transfer/components";
import { IMFilterModalRef } from "@modules/transfer/components/MFilterModal/types";
import { IParams } from "@modules/transfer/types";
import { Typography } from "@mui/material";
import { CTable } from "@others";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

const TransfersListPage = () => {
  useTitle("Danh sách phiếu luân chuyển");

  //#region
  const filterModalRef = useRef<IMFilterModalRef>(null);

  const navigate = useNavigate();

  const [params, setParams] = useState<IParams>({
    page: 1,
    limit: 10,
    start_date: dayjs().startOf("month").toDate(),
    end_date: dayjs().endOf("month").toDate(),
    code: "",
    from_store_code: "",
    from_user: "",
    to_store_code: "",
    to_user: "",
  });

  const { data, refetch, isFetching } = useQuery({
    queryKey: ["danh-sach-phieu-luan-chuyen", params],
    queryFn: () => transfersApi.getPaginate(params),
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
      title: "Xóa phiếu luân chuyển",
      content: "Thao tác này không thể khôi phục, bạn chắc chắn?",
      onProceed: async () => {
        try {
          await transfersApi.remove(id);
          noti.success(MESSAGES("phiếu luân chuyển").SUCCESS.REMOVE);
          refetch();
        } catch (error: any) {
          noti.error(
            error?.message ?? MESSAGES("phiếu luân chuyển").ERROR.REMOVE
          );
        }
      },
    });
  };

  const onExport = async () => {
    try {
      const res = await transfersApi.exportExcel(params);

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
  const headers: TCTableHeaders<ITransfer> = [
    {
      key: "code",
      label: "số chứng từ",
    },
    {
      key: "date",
      label: "ngày chứng từ",
      columnType: "date",
    },
    {
      key: "transfer_from",
      label: "chi nhánh chuyển",
      align: "left",
      cellRender: (value, record, index) => <>{value?.name}</>,
    },
    {
      key: "user_in_charge_from",
      label: "NV phụ trách\ntài sản chuyển",
      align: "left",
      cellRender: (value, record, index) => <>{value?.name}</>,
    },
    {
      key: "transfer_to",
      label: "chi nhánh nhận",
      align: "left",
      cellRender: (value, record, index) => <>{value?.name}</>,
    },
    {
      key: "user_in_charge_to",
      label: "NV phụ trách\ntài sản nhận",
      align: "left",
      cellRender: (value, record, index) => <>{value?.name}</>,
    },
    {
      key: "sum_of_depreciation_amount",
      label: "giá trị còn\nkhấu hao",
      align: "right",
      columnType: "number",
    },
    {
      key: "sum_of_amount",
      label: "giá trị tài sản",
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
      width: 220,
      columnType: "option",
      options: TRANSFER_TYPES_OPTIONS,
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
      <Typography variant="header-page">danh sách phiếu luân chuyển</Typography>

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
export default TransfersListPage;
