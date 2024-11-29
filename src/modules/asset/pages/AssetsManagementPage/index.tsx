import { useMemo, useRef, useState } from "react";
import { shallowEqual, useDispatch } from "react-redux";

import { assetsApi } from "@apis/assets.api";
import { TCTableHeaders } from "@components/others/CTable/types";
import { useSelector } from "@hooks/redux";
import { useTitle } from "@hooks/title";
import { IAsset } from "@interfaces/assets";
import { IReceipt } from "@interfaces/receipts";
import {
  MCodesPrintModal,
  MFilterModal,
  MToolbar,
} from "@modules/asset/components";
import { IMCodesPrintModalRef } from "@modules/asset/components/MCodesPrintModal/types";
import { IMFilterModalRef } from "@modules/asset/components/MFilterModal/types";
import { IParams } from "@modules/asset/types";
import { Typography } from "@mui/material";
import { CTable } from "@others";
import { saveAssetFilter } from "@redux/slices/filter";
import {
  resetSelectAssets,
  setAllAssets,
  setSelectedAssets,
} from "@redux/slices/selected";
import { useQuery } from "@tanstack/react-query";

const AssetsManagementPage = () => {
  useTitle("Danh sách tài sản & CCDC");

  //#region Data
  const filterModalRef = useRef<IMFilterModalRef>(null);
  const printModalRef = useRef<IMCodesPrintModalRef>(null);

  const dispatch = useDispatch();

  const {
    filter: { page, limit, ...filter },
  } = useSelector((state) => state.filterAsset, shallowEqual);

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

  const { data } = useQuery({
    queryKey: ["danh-sach-tai-san-ccdc", params],
    queryFn: () => {
      dispatch(saveAssetFilter(params));
      return assetsApi.getPaginate(params);
    },
    select: (response) => response?.data?.data,
  });

  const listData = useMemo(() => data?.data ?? [], [data]);

  const { isSelectedAll, selected } = useSelector(
    (state) => state.selectedAsset,
    shallowEqual
  );
  //#endregion

  //#region Event
  const onPageChange = (newPage: number) => {
    setParams((prev) => ({ ...prev, page: newPage }));
  };

  const onCodesPrint = () => {
    printModalRef.current?.open(
      isSelectedAll ? undefined : selected.map((e: IReceipt) => e.id),
      params.store_code,
      params.region_id
    );
  };

  const onSelect = (items: any[]) => {
    dispatch(setSelectedAssets(items));
  };

  const onSelectAll = (isAll?: boolean) => {
    dispatch(setAllAssets(!!isAll));
  };

  const onOpenFilter = () => {
    filterModalRef.current?.open(params);
  };

  const onSearch = (newParams: IParams) => {
    setParams((prev) => ({ ...prev, ...newParams, page: 1 }));
    dispatch(resetSelectAssets());
  };
  //#endregion

  //#region Render
  const headers: TCTableHeaders<IAsset> = [
    {
      key: "code",
      label: "mã CCDC",
      width: 150,
    },
    {
      key: "name",
      label: "tên CCDC",
      width: 250,
      align: "left",
    },
    {
      key: "category_name",
      label: "Loại CCDC",
      align: "left",
      width: 200,
    },
    {
      key: "unit",
      label: "đơn vị tính",
      width: 100,
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
      width: 200,
    },
    {
      key: "depreciation_duration",
      label: "số kỳ\nphân bổ",
      columnType: "number",
    },
    {
      key: "remain_depreciation_duration",
      label: "số kỳ phân\nbổ còn lại",
      columnType: "number",
    },
    {
      key: "quantity",
      label: "số lượng\ntăng",
      columnType: "number",
    },
    {
      key: "issue_quantity",
      label: "số lượng\ngiảm",
      cellRender: (value, record, index) => (
        <>{(record.quantity - record.remain_quantity)?.toLocaleString()}</>
      ),
    },
    {
      key: "remain_quantity",
      label: "số lượng\ncòn lại",
      columnType: "number",
    },
    {
      key: "amount",
      label: "giá trị\nCCDC",
      columnType: "number",
      align: "right",
    },
    {
      key: "depreciation_cost",
      label: "giá trị đã\nphân bổ",
      columnType: "number",
      align: "right",
    },
    {
      key: "total",
      label: "còn lại",
      columnType: "number",
      align: "right",
    },
    {
      key: "store_name",
      label: "chi nhánh",
      width: 230,
      align: "left",
    },
  ];
  return (
    <>
      <Typography variant="header-page">danh sách tài sản & CCDC</Typography>

      <MToolbar
        printable={selected.length > 0 || isSelectedAll}
        onCodesPrint={onCodesPrint}
        onOpenFilter={onOpenFilter}
      />

      <CTable
        showIndexCol={false}
        headers={headers}
        headerTransform="capitalize"
        headerMultiline
        selection={{
          selectByClickingRow: true,
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
        data={listData}
        pagination={{
          page: params.page,
          pages: data?.pages ?? 0,
          limit: params.limit,
          onPageChange: onPageChange,
          showTotal: true,
          total: data?.amount,
        }}
      />

      <MFilterModal ref={filterModalRef} onSearch={onSearch} />
      <MCodesPrintModal ref={printModalRef} />
    </>
  );
  //#endregion
};

export default AssetsManagementPage;
