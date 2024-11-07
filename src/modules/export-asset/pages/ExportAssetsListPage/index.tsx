import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { exportAssetsApi } from "@apis/export-assets.api";
import { TCTableHeaders } from "@components/others/CTable/types";
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

  const onCreate = () => navigate("/export-asset/create");

  const onEdit = (id: string) => () => navigate(`/export-asset/update/${id}`);

  const onRemove = (id: string) => () => {
    confirm({
      title: "Xóa phiếu xuất tài sản",
      content: "Thao tác này không thể khôi phục, bạn chắc chắn?",
      onProceed: async () => {
        try {
          await exportAssetsApi.remove(id);
          refetch();
          noti.success(MESSAGES("phiếu xuất tài sản").SUCCESS.REMOVE);
        } catch (error: any) {
          noti.error(
            error?.message ?? MESSAGES("phiếu xuất tài sản").SUCCESS.REMOVE
          );
        }
      },
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
            to={`/export-asset/detail/${record.id}`}
            style={{ fontWeight: 500, color: "#4b7cff" }}
          >
            {value}
          </Link>
        </>
      ),
    },
    {
      key: "ngay_xuat_tai_san",
      label: "ngày xuất tài sản",
      columnType: "date",
    },
    {
      key: "ngay_giao_tai_san",
      label: "ngày giao tài sản",
      columnType: "date",
    },
    {
      key: "from_store_name",
      label: "từ chi nhánh",
      align: "left",
    },
    {
      key: "to_store_name",
      label: "chi nhánh nhận",
      align: "left",
    },
    {
      key: "created_by",
      label: "nhân viên tạo phiếu",
      align: "left",
    },
    {
      key: "type",
      label: "loại đề xuất",
    },
    {
      key: "status",
      label: "trạng thái",
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
