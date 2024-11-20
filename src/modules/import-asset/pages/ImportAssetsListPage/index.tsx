import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { importAssetsApi } from "@apis/import-assets.api";
import { TCTableHeaders } from "@components/others/CTable/types";
import { IMPORT_ASSET_STATUES_OPTIONS } from "@constants/options";
import { CButton, CButtonGroup } from "@controls";
import { confirm } from "@funcs/confirm";
import { MESSAGES, noti } from "@funcs/toast";
import { useTitle } from "@hooks/title";
import { IImportAsset } from "@interfaces/import-assets";
import { MFilter, MToolbar } from "@modules/import-asset/components";
import { IParams } from "@modules/import-asset/types";
import { IconButton, Tooltip, Typography } from "@mui/material";
import { CTable } from "@others";
import { useQuery } from "@tanstack/react-query";

const ImportAssetsListPage = () => {
  useTitle("Danh sách phiếu nhập tài sản");

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
    queryKey: ["danh-sach-phieu-nhap-tai-san", params],
    queryFn: () => importAssetsApi.getPaginate(params),
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
      title: "Xóa phiếu nhập tài sản",
      content: "Thao tác này không thể khôi phục, bạn chắc chắn?",
      onProceed: async () => {
        try {
          await importAssetsApi.remove(id);
          refetch();
          noti.success(MESSAGES("phiếu nhập tài sản").SUCCESS.REMOVE);
        } catch (error: any) {
          noti.error(
            error?.message ?? MESSAGES("phiếu nhập tài sản").SUCCESS.REMOVE
          );
        }
      },
    });
  };

  const onInsert = (id: number) => async () => {
    try {
      await importAssetsApi.insert(id);
      refetch();
      noti.success("Nhập kho tài sản thành công!");
    } catch (error: any) {
      noti.error(error?.message ?? "Nhập kho tài sản không thành công!");
    }
  };
  //#endregion

  //#region Render
  const headers: TCTableHeaders<IImportAsset> = [
    {
      key: "code",
      label: "số đơn hàng",
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
      key: "warehouse_name",
      label: "kho tài sản",
      align: "left",
    },
    {
      key: "status",
      label: "trạng thái",
      columnType: "option",
      options: IMPORT_ASSET_STATUES_OPTIONS,
    },
    {
      key: "created_at",
      label: "ngày tạo",
      columnType: "date",
    },
    {
      key: "import_date",
      label: "ngày giao",
      columnType: "date",
    },
    {
      key: "total",
      label: "tổng tiền",
      align: "right",
      columnType: "number",
    },
    {
      key: "description",
      label: "mô tả",
      align: "left",
    },
    {
      key: "action",
      label: "thao tác",
      cellRender: (value, record, index) => (
        <>
          <Tooltip
            title={
              record.status === 2
                ? "Tải sản này đã được lưu kho"
                : "Nhập kho tài sản"
            }
          >
            <span>
              <IconButton
                onClick={onInsert(record.id)}
                disabled={record.status === 2}
                color="primary"
                sx={{ height: 40, width: 40 }}
              >
                <i className="fa-regular fa-floppy-disk-circle-arrow-right fa-sm"></i>
              </IconButton>
            </span>
          </Tooltip>

          <CButtonGroup className="table-actions" variant="text">
            <CButton onClick={onEdit(record?.id)}>Edit</CButton>
            <CButton color="error" onClick={onRemove(record?.id)}>
              Xóa
            </CButton>
          </CButtonGroup>
        </>
      ),
    },
  ];
  return (
    <>
      <Typography variant="header-page">
        Danh sách phiếu nhập tài sản
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
export default ImportAssetsListPage;
