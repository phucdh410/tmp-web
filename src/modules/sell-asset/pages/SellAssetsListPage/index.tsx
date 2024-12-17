import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { sellAssetsApi } from "@apis/sell-assets.api";
import { TCTableHeaders } from "@components/others/CTable/types";
import { SELL_ASSET_STATUES_OPTIONS } from "@constants/options";
import { CButton, CButtonGroup } from "@controls";
import { confirm } from "@funcs/confirm";
import { MESSAGES, noti } from "@funcs/toast";
import { useTitle } from "@hooks/title";
import {
  ISellAsset,
  ISellAssetPaginationParams,
} from "@interfaces/sell-assets";
import { MFilter, MToolbar } from "@modules/sell-asset/components";
import { Typography } from "@mui/material";
import { CTable } from "@others";
import { useQuery } from "@tanstack/react-query";

const SellAssetsListPage = () => {
  useTitle("Danh sách phiếu bán tài sản");

  //#region Data
  const [params, setParams] = useState<ISellAssetPaginationParams>({
    page: 1,
    limit: 10,
    code: "",
    warehouse_id: "",
    status: "",
    start_date: null,
    end_date: null,
  });

  const { data, refetch } = useQuery({
    queryKey: ["danh-sach-phieu-ban-tai-san", params],
    queryFn: () => sellAssetsApi.getPaginate(params),
    select: (response) => response?.data?.data,
  });

  const listData = useMemo(() => data?.data ?? [], [data]);

  const navigate = useNavigate();
  //#endregion

  //#region Event
  const onPageChange = (newPage: number) => {
    setParams((prev) => ({ ...prev, page: newPage }));
  };

  const onCreate = () => navigate("create");

  const onEdit = (id: number) => () => navigate(`update/${id}`);

  const onRemove = (id: number) => () => {
    confirm({
      title: "Xóa phiếu bán tài sản",
      content: "Thao tác này không thể khôi phục, bạn chắc chắn?",
      onProceed: () => sellAssetsApi.remove(id),
      onSuccess: () => {
        refetch();
        noti.success(MESSAGES("phiếu bán tài sản").SUCCESS.REMOVE);
      },
      onError: (error) =>
        noti.error(
          error?.message ?? MESSAGES("phiếu bán tài sản").SUCCESS.REMOVE
        ),
    });
  };
  //#endregion

  //#region Render
  const headers: TCTableHeaders<ISellAsset> = [
    {
      key: "code",
      label: "số chứng từ",
      cellRender: (value, record, index) => (
        <>
          <Link
            to={`detail/${record.id}`}
            style={{ fontWeight: 500, color: "#4b7cff" }}
          >
            {value}
          </Link>
        </>
      ),
    },
    {
      key: "ngay_lap_chung_tu",
      label: "ngày lập chứng từ",
      columnType: "date",
    },
    {
      key: "ngay_giao_hang",
      label: "ngày giao hàng",
      columnType: "date",
    },
    {
      key: "warehouse_name",
      label: "kho xuất",
      align: "left",
    },
    {
      key: "khach_hang_mua",
      label: "khách hàng mua",
      align: "left",
    },
    {
      key: "tong_gia_tri_mua",
      label: "tổng giá trị mua",
      align: "right",
      columnType: "number",
    },
    {
      key: "quantity",
      label: "số lượng tài sản",
      align: "right",
      columnType: "number",
    },
    {
      key: "status",
      label: "trạng thái",
      columnType: "option",
      options: SELL_ASSET_STATUES_OPTIONS,
    },
    {
      key: "action",
      label: "thao tác",
      cellRender: (value, record, index) => (
        <CButtonGroup className="table-actions" variant="text">
          <CButton onClick={onEdit(record?.id)}>Edit</CButton>
          <CButton color="error" onClick={onRemove(record?.id)}>
            Xóa
          </CButton>
        </CButtonGroup>
      ),
    },
  ];
  return (
    <>
      <Typography variant="header-page">Danh sách phiếu bán tài sản</Typography>

      <MToolbar onCreate={onCreate} />
      <MFilter params={params} setParams={setParams} />

      <CTable
        showIndexCol={false}
        data={listData}
        headers={headers}
        headerTransform="capitalize"
        pagination={{
          page: params.page,
          pages: data?.pages ?? 0,
          limit: params.limit,
          total: data?.amount,
          onPageChange,
        }}
      />
    </>
  );
  //#endregion
};
export default SellAssetsListPage;
