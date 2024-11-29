import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { exportAssetsApi } from "@apis/export-assets.api";
import { TCTableHeaders } from "@components/others/CTable/types";
import { EXPORT_ASSET_STATUES_OPTIONS } from "@constants/options";
import { CButton, CButtonGroup } from "@controls";
import { confirm } from "@funcs/confirm";
import { MESSAGES, noti } from "@funcs/toast";
import { useTitle } from "@hooks/title";
import { IExportAsset } from "@interfaces/export-assets";
import { MFilter, MToolbar } from "@modules/export-asset/components";
import { IParams } from "@modules/export-asset/types";
import { Typography } from "@mui/material";
import { CTable } from "@others";
import { useQuery } from "@tanstack/react-query";

const ExportAssetsListPage = () => {
  useTitle("Danh sách phiếu xuất tài sản");

  //#region Data
  const [params, setParams] = useState<IParams>({
    page: 1,
    limit: 10,
    code: "",
    warehouse_id: "",
    status: "",
    start_date: null,
    end_date: null,
    date: null,
  });

  const { data, refetch } = useQuery({
    queryKey: ["danh-sach-phieu-xuat-tai-san", params],
    queryFn: () => exportAssetsApi.getPaginate(params),
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
      title: "Xóa phiếu xuất tài sản",
      content: "Thao tác này không thể khôi phục, bạn chắc chắn?",
      onProceed: () => exportAssetsApi.remove(id),
      onSuccess: () => {
        refetch();
        noti.success(MESSAGES("phiếu xuất tài sản").SUCCESS.REMOVE);
      },
      onError: (error) =>
        noti.error(
          error?.message ?? MESSAGES("phiếu xuất tài sản").SUCCESS.REMOVE
        ),
    });
  };
  //#endregion

  //#region Render
  const headers: TCTableHeaders<IExportAsset> = [
    {
      key: "code",
      label: "số chứng từ",
      cellRender: (value, record, index) => (
        <>
          <Link
            // to={`detail/${record.id}`}
            to="#"
            style={{ fontWeight: 500, color: "#4b7cff" }}
          >
            {value}
          </Link>
        </>
      ),
    },
    {
      key: "date",
      label: "ngày xuất tài sản",
      columnType: "date",
    },
    {
      key: "warehouse_name",
      label: "từ kho",
      align: "left",
    },
    {
      key: "store_name",
      label: "chi nhánh nhận",
      align: "left",
    },
    {
      key: "created_by",
      label: "nhân viên tạo phiếu",
      align: "left",
    },
    {
      key: "status",
      label: "trạng thái",
      columnType: "option",
      options: EXPORT_ASSET_STATUES_OPTIONS,
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
        Danh sách phiếu xuất tài sản
      </Typography>

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
export default ExportAssetsListPage;
