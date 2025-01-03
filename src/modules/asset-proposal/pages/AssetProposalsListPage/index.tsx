import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { assetProposalsApi } from "@apis/asset-proposals.api";
import { TCTableHeaders } from "@components/others/CTable/types";
import {
  ASSET_PROPOSAL_STATUSES_OPTIONS,
  ASSET_PROPOSAL_TYPES_OPTIONS,
} from "@constants/options";
import { CButton, CButtonGroup } from "@controls";
import { confirm } from "@funcs/confirm";
import { MESSAGES, noti } from "@funcs/toast";
import { useTitle } from "@hooks/title";
import {
  IAssetProposal,
  IAssetProposalPaginationParams,
} from "@interfaces/asset-proposals";
import { MFilter } from "@modules/asset-proposal/components";
import { TableCell, TableRow, Typography } from "@mui/material";
import { CTable } from "@others";
import { useQuery } from "@tanstack/react-query";

const AssetProposalsListPage = () => {
  useTitle("Danh sách phiếu đề xuất tài sản");

  //#region Data
  const [params, setParams] = useState<IAssetProposalPaginationParams>({
    page: 1,
    limit: 10,
    status: "",
    store_code: "",
    start_date: "",
    end_date: "",
    start_needed_date: "",
    end_needed_date: "",
  });

  const { data, refetch } = useQuery({
    queryKey: ["danh-sach-phieu-de-xuat-tai-san", params],
    queryFn: () => assetProposalsApi.getPaginate(params),
    select: (response) => response?.data?.data,
  });

  const { data: total = 0 } = useQuery({
    queryKey: ["tong-tien-de-xuat", params],
    queryFn: () => assetProposalsApi.getTotal(params),
    select: (response) => response?.data?.data?.total ?? 0,
  });

  const listData = useMemo(() => data?.data ?? [], [data]);
  //#endregion

  //#region Event
  const onPageChange = (newPage: number) => {
    setParams((prev) => ({ ...prev, page: newPage }));
  };

  const onRemove = (id: number) => () => {
    confirm({
      title: "Xóa phiếu đề xuất tài sản",
      content: "Thao tác này không thể khôi phục, bạn chắc chắn?",
      onProceed: () => assetProposalsApi.remove(id),
      onSuccess: () => {
        refetch();
        noti.success(MESSAGES("phiếu đề xuất tài sản").SUCCESS.REMOVE);
      },
      onError: (error) =>
        noti.error(
          error?.message ?? MESSAGES("phiếu đề xuất tài sản").SUCCESS.REMOVE
        ),
    });
  };
  //#endregion

  //#region Render
  const headers: TCTableHeaders<IAssetProposal> = [
    {
      key: "document_code",
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
      key: "proposed_date",
      label: "ngày đề xuất",
      columnType: "date",
    },
    {
      key: "needed_date",
      label: "thời gian cần",
      columnType: "date",
    },
    {
      key: "type",
      label: "loại đề xuất",
      columnType: "option",
      options: ASSET_PROPOSAL_TYPES_OPTIONS,
    },
    {
      key: "store_name",
      label: "chi nhánh",
      align: "left",
    },
    {
      key: "staff_name",
      label: "nhân viên đề xuất",
      align: "left",
    },
    {
      key: "total",
      label: "tổng tiền đề xuất",
      align: "right",
      columnType: "number",
    },
    {
      key: "status",
      label: "trạng thái",
      columnType: "option",
      options: ASSET_PROPOSAL_STATUSES_OPTIONS,
    },
    {
      key: "action",
      label: "thao tác",
      cellRender: (value, record, index) => (
        <CButtonGroup className="table-actions" variant="text">
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
        Danh sách phiếu đề xuất tài sản
      </Typography>

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
        footer={
          <TableRow
            sx={{
              background: (theme) => theme.palette.primary.main,
            }}
          >
            <TableCell
              sx={{ color: "#ffffff", fontWeight: 600, fontSize: "1rem" }}
              colSpan={6}
            >
              Tổng tiền đề xuất
            </TableCell>
            <TableCell
              sx={{ color: "#ffffff", fontWeight: 600, fontSize: "1rem" }}
              align="right"
            >
              {total.toLocaleString()}
            </TableCell>
            <TableCell colSpan={2}></TableCell>
          </TableRow>
        }
      />
    </>
  );
  //#endregion
};
export default AssetProposalsListPage;
