import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { assetValuationsApi } from "@apis/asset-valuations.api";
import { TCTableHeaders } from "@components/others/CTable/types";
import { ASSET_VALUATION_STATUES_OPTIONS } from "@constants/options";
import { CButton, CButtonGroup } from "@controls";
import { confirm } from "@funcs/confirm";
import { MESSAGES, noti } from "@funcs/toast";
import { useTitle } from "@hooks/title";
import { IAssetValuation } from "@interfaces/asset-valuations";
import { MFilter, MToolbar } from "@modules/asset-valuation/components";
import { IParams } from "@modules/asset-valuation/types";
import { Typography } from "@mui/material";
import { CTable } from "@others";
import { useQuery } from "@tanstack/react-query";

const AssetValuationsListPage = () => {
  useTitle("Danh sách phiếu định giá tài sản");

  //#region Data
  const [params, setParams] = useState<IParams>({
    page: 1,
    limit: 10,
    code: "",
    store_code: "",
    status: "",
    start_date: null,
    end_date: null,
  });

  const { data, refetch } = useQuery({
    queryKey: ["danh-sach-phieu-dinh-gia-tai-san", params],
    queryFn: () => assetValuationsApi.getPaginate(params),
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
      title: "Xóa phiếu định giá tài sản",
      content: "Thao tác này không thể khôi phục, bạn chắc chắn?",
      onProceed: async () => {
        try {
          await assetValuationsApi.remove(id);
          refetch();
          noti.success(MESSAGES("phiếu định giá tài sản").SUCCESS.REMOVE);
        } catch (error: any) {
          noti.error(
            error?.message ?? MESSAGES("phiếu định giá tài sản").SUCCESS.REMOVE
          );
        }
      },
    });
  };
  //#endregion

  //#region Render
  const headers: TCTableHeaders<IAssetValuation> = [
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
      key: "ngay_dinh_gia_tai_san",
      label: "ngày định giá TS",
      columnType: "date",
    },
    {
      key: "store_name",
      label: "chi nhánh",
      align: "left",
    },
    {
      key: "price",
      label: "nguyên giá",
      align: "right",
      columnType: "number",
    },
    {
      key: "gia_tri_da_khau_hao",
      label: "giá trị đã\nkhấu hao",
      align: "right",
      columnType: "number",
    },
    {
      key: "gia_tri_dinh_gia",
      label: "giá trị\nđịnh giá",
      align: "right",
      columnType: "number",
    },
    {
      key: "status",
      label: "trạng thái",
      columnType: "option",
      options: ASSET_VALUATION_STATUES_OPTIONS,
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
      <Typography variant="header-page">
        Danh sách phiếu định giá tài sản
      </Typography>

      <MToolbar onCreate={onCreate} />
      <MFilter params={params} setParams={setParams} />

      <CTable
        showIndexCol={false}
        data={listData}
        headers={headers}
        headerTransform="capitalize"
        headerMultiline
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
export default AssetValuationsListPage;
