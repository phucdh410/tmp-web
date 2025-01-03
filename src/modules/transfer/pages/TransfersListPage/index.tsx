import { useMemo, useRef, useState } from "react";
import { shallowEqual, useDispatch } from "react-redux";
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
import { ITransfer, ITransferPaginationParams } from "@interfaces/transfers";
import { MFilterModal } from "@modules/transfer/components";
import { MToolbar } from "@modules/transfer/components";
import { IMFilterModalRef } from "@modules/transfer/components/MFilterModal/types";
import { Typography } from "@mui/material";
import { CTable } from "@others";
import { setAllTransfers, setSelectedTransfers } from "@redux/slices/selected";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

const TransfersListPage = () => {
  useTitle("Danh sách phiếu luân chuyển");

  //#region
  const filterModalRef = useRef<IMFilterModalRef>(null);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [params, setParams] = useState<ITransferPaginationParams>({
    page: 1,
    limit: 10,
    start_date: dayjs().startOf("month").toDate(),
    end_date: dayjs().endOf("month").toDate(),
    code: "",
    from_store_code: "",
    to_store_code: "",
  });

  const { data, refetch, isFetching } = useQuery({
    queryKey: ["danh-sach-phieu-luan-chuyen", params],
    queryFn: () => transfersApi.getPaginate(params),
    select: (response) => response?.data?.data,
  });

  const listData = useMemo(() => data?.data ?? [], [data]);

  const { isSelectedAll, selected } = useSelector(
    (state) => state.selectedTransfer,
    shallowEqual
  );
  //#endregion

  //#region Event
  const onPageChange = (newPage: number) => {
    setParams((prev) => ({ ...prev, page: newPage }));
  };

  const onSelect = (items: any[]) => {
    dispatch(setSelectedTransfers(items));
  };

  const onSelectAll = (isAll?: boolean) => {
    dispatch(setAllTransfers(!!isAll));
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
      onProceed: () => transfersApi.remove(id),
      onSuccess: () => {
        refetch();
        noti.success(MESSAGES("phiếu luân chuyển").SUCCESS.REMOVE);
      },
      onError: (error) =>
        noti.error(
          error?.message ?? MESSAGES("phiếu luân chuyển").ERROR.REMOVE
        ),
    });
  };

  const onExport = async () => {
    try {
      const exportParams = {
        from: params.start_date as Date,
        to: params.end_date as Date,
        transfer_ids: isSelectedAll ? [-1] : selected.map((e) => e.id),
        ...(params?.from_store_code
          ? { store_code: params.from_store_code }
          : {}),
      };
      const res = await transfersApi.exportExcel(exportParams);

      downloadExcel(res, "report");
    } catch (error: any) {
      noti.error(error?.message ?? "Export không thành công");
    }
  };

  const onSearch = (newParams: ITransferPaginationParams) => {
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
      isMultilineCell: true,
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
export default TransfersListPage;
