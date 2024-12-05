import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { assetProposalsApi } from "@apis/asset-proposals.api";
import { TCTableHeaders } from "@components/others/CTable/types";
import {
  ASSET_PROPOSAL_STATUSES,
  ASSET_PROPOSAL_TYPES,
} from "@constants/enums";
import {
  ASSET_PROPOSAL_STATUSES_OPTIONS,
  ASSET_PROPOSAL_TYPES_OPTIONS,
} from "@constants/options";
import { CButton, CButtonGroup } from "@controls";
import { confirm } from "@funcs/confirm";
import { MESSAGES, noti } from "@funcs/toast";
import { useTitle } from "@hooks/title";
import { IAssetProposal } from "@interfaces/asset-proposals";
import { MFilter } from "@modules/asset-proposal/components";
import { IParams } from "@modules/asset-proposal/types";
import { Typography } from "@mui/material";
import { CTable } from "@others";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

const MOCK: IAssetProposal[] = [
  {
    id: 1,
    code: "GTCC.0001",
    name: "Chuột",
    date: dayjs().toDate(),
    ngay_can: dayjs().toDate(),
    quantity: 1,
    created_by: "0001 - Lê Khánh Phương Béo",
    type: ASSET_PROPOSAL_TYPES.REPLACE,
    status: ASSET_PROPOSAL_STATUSES.DONE,
  },
  {
    id: 2,
    code: "GTCC.0002",
    name: "Bàn phím",
    date: dayjs().toDate(),
    ngay_can: dayjs().toDate(),
    quantity: 2,
    created_by: "0001 - Lê Khánh Phương Béo",
    type: ASSET_PROPOSAL_TYPES.KAIZEN,
    status: ASSET_PROPOSAL_STATUSES.DONE,
  },
  {
    id: 3,
    code: "GTCC.0003",
    name: "Bàn phím",
    date: dayjs().toDate(),
    ngay_can: dayjs().toDate(),
    quantity: 2,
    created_by: "0001 - Lê Khánh Phương Béo",
    type: ASSET_PROPOSAL_TYPES.COMPENSATION,
    status: ASSET_PROPOSAL_STATUSES.PENDING,
  },
  {
    id: 4,
    code: "GTCC.0004",
    name: "PC",
    date: dayjs().toDate(),
    ngay_can: dayjs().toDate(),
    quantity: 1,
    created_by: "0001 - Lê Khánh Phương Béo",
    type: ASSET_PROPOSAL_TYPES.COMPENSATION,
    status: ASSET_PROPOSAL_STATUSES.NEW,
  },
  {
    id: 5,
    code: "GTCC.0005",
    name: "PC",
    date: dayjs().toDate(),
    ngay_can: dayjs().toDate(),
    quantity: 2,
    created_by: "0001 - Lê Khánh Phương Béo",
    type: ASSET_PROPOSAL_TYPES.KAIZEN,
    status: ASSET_PROPOSAL_STATUSES.PENDING,
  },
];

const AssetProposalsListPage = () => {
  useTitle("Danh sách phiếu đề xuất tài sản");

  //#region Data
  const [params, setParams] = useState<IParams>({
    page: 1,
    limit: 10,
    status: "",
    date: null,
  });

  const { data, refetch } = useQuery({
    queryKey: ["danh-sach-phieu-de-xuat-tai-san", params],
    queryFn: () => assetProposalsApi.getPaginate(params),
    select: (response) => response?.data?.data,
  });

  const listData = useMemo(() => data?.data ?? [], [data]);
  console.log("🚀 ~ AssetProposalsListPage ~ listData:", listData);
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
      key: "date",
      label: "ngày đề xuất",
      columnType: "date",
    },
    {
      key: "type",
      label: "loại đề xuất",
      columnType: "option",
      options: ASSET_PROPOSAL_TYPES_OPTIONS,
    },
    {
      key: "name",
      label: "tên tài sản",
      align: "left",
    },
    {
      key: "quantity",
      label: "số lượng",
      columnType: "number",
      align: "right",
    },
    {
      key: "created_by",
      label: "nhân viên đề xuất",
      align: "left",
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
        data={MOCK}
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
export default AssetProposalsListPage;
