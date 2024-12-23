import { useMemo, useRef, useState } from "react";
import { shallowEqual } from "react-redux";
import { useNavigate } from "react-router-dom";

import { recoveriesApi } from "@apis/recoveries.api";
import { TCTableHeaders } from "@components/others/CTable/types";
import { CButton, CButtonGroup } from "@controls";
import { confirm } from "@funcs/confirm";
import { downloadExcel } from "@funcs/excel";
import { MESSAGES, noti } from "@funcs/toast";
import { useSelector } from "@hooks/redux";
import { useTitle } from "@hooks/title";
import { IRecovery, IRecoveryPaginationParams } from "@interfaces/recoveries";
import { MFilterModal } from "@modules/recovery/components";
import { MToolbar } from "@modules/recovery/components";
import { IMFilterModalRef } from "@modules/recovery/components/MFilterModal/types";
import { Typography } from "@mui/material";
import { CTable } from "@others";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

const RecoveriesListPage = () => {
  useTitle("Danh sách phiếu thu hồi");

  //#region
  const filterModalRef = useRef<IMFilterModalRef>(null);

  const navigate = useNavigate();

  const [params, setParams] = useState<IRecoveryPaginationParams>({
    page: 1,
    limit: 10,
    start_date: dayjs().startOf("month").toDate(),
    end_date: dayjs().endOf("month").toDate(),
    code: "",
  });

  const { data, refetch, isFetching } = useQuery({
    queryKey: ["danh-sach-phieu-thu-hoi", params],
    queryFn: () => recoveriesApi.getPaginate(params),
    gcTime: 0,
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
      title: "Xóa phiếu thu hồi",
      content: "Thao tác này không thể khôi phục, bạn chắc chắn?",
      onProceed: () => recoveriesApi.remove(id),
      onSuccess: () => {
        refetch();
        noti.success(MESSAGES("phiếu thu hồi").SUCCESS.REMOVE);
      },
      onError: (error) =>
        noti.error(error?.message ?? MESSAGES("phiếu thu hồi").ERROR.REMOVE),
    });
  };

  const onExport = async () => {
    try {
      const res = await recoveriesApi.exportExcel(params);

      downloadExcel(res, "report");
    } catch (error: any) {
      noti.error(error?.message ?? "Export không thành công");
    }
  };

  const onSearch = (newParams: IRecoveryPaginationParams) => {
    setParams((prev) => ({ ...prev, ...newParams }));
  };
  //#endregion

  //#region Render
  const headers: TCTableHeaders<IRecovery> = [
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
      key: "recovery_date",
      label: "ngày thu hồi",
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
      key: "location",
      label: "vị trí để tài sản",
      align: "left",
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
      <Typography variant="header-page">danh sách phiếu thu hồi</Typography>

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
export default RecoveriesListPage;
