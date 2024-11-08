import { useMemo, useRef, useState } from "react";
import { shallowEqual, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { recoveriesApi } from "@apis/recoveries.api";
import { TCTableHeaders } from "@components/others/CTable/types";
import { CButton, CButtonGroup } from "@controls";
import { confirm } from "@funcs/confirm";
import { downloadExcel } from "@funcs/excel";
import { MESSAGES, noti } from "@funcs/toast";
import { useSelector } from "@hooks/redux";
import { useTitle } from "@hooks/title";
import { IRecovery } from "@interfaces/recoveries";
import { MFilterModal } from "@modules/receipt/components";
import { IMFilterModalRef } from "@modules/receipt/components/MFilterModal/types";
import { MToolbar } from "@modules/recovery/components";
import { IParams } from "@modules/recovery/types";
import { Typography } from "@mui/material";
import { CTable } from "@others";
import { saveReceiptFilter } from "@redux/slices/filter";
import { setAllReceipts, setSelectedReceipts } from "@redux/slices/selected";
import { useQuery } from "@tanstack/react-query";

const RecoveriesListPage = () => {
  useTitle("Danh sách phiếu thu hồi");

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
    queryKey: ["danh-sach-phieu-thu-hoi", params],
    queryFn: () => {
      dispatch(saveReceiptFilter(params));
      return recoveriesApi.getPaginate(params);
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

  const onEdit = (id: number) => () => {
    navigate(`update/${id}`);
  };

  const onRemove = (id: number) => () => {
    confirm({
      title: "Xóa phiếu thu hồi",
      content: "Thao tác này không thể khôi phục, bạn chắc chắn?",
      onProceed: async () => {
        try {
          await recoveriesApi.remove(id);
          noti.success(MESSAGES("phiếu thu hồi").SUCCESS.REMOVE);
          refetch();
        } catch (error: any) {
          noti.error(error?.message ?? MESSAGES("phiếu thu hồi").ERROR.REMOVE);
        }
      },
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

  const onSearch = (newParams: IParams) => {
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
      <Typography variant="header-page">danh sách phiếu thu hồi</Typography>

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
export default RecoveriesListPage;
