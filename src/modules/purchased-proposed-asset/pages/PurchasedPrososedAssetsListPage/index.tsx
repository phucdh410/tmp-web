import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { purchasedProposedAssetsApi } from "@apis/purchased-proposed-assets.api";
import { TCTableHeaders } from "@components/others/CTable/types";
import {
  ASSET_PROPOSAL_TYPES,
  PURCHASED_PROPOSED_ASSET_STATUSES,
} from "@constants/enums";
import {
  ASSET_PROPOSAL_TYPES_OPTIONS,
  PURCHASED_PROPOSED_ASSET_STATUSES_OPTIONS,
} from "@constants/options";
import { CButton, CButtonGroup } from "@controls";
import { useTitle } from "@hooks/title";
import { IPurchasedProposedAsset } from "@interfaces/purchased-proposed-assets";
import {
  MFilter,
  MUpdateStatusModal,
} from "@modules/purchased-proposed-asset/components";
import { IMUpdateStatusModalRef } from "@modules/purchased-proposed-asset/components/MUpdateStatus/types";
import { IParams } from "@modules/purchased-proposed-asset/types";
import { Typography } from "@mui/material";
import { CTable } from "@others";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

const MOCK: IPurchasedProposedAsset[] = [
  {
    id: 1,
    code: "GTCC.0001",
    date: dayjs().toDate(),
    thoi_gian_can: dayjs().toDate(),
    type: ASSET_PROPOSAL_TYPES.REPLACE,
    name: "Bảng MICA",
    quantity: 2,
    price: 560000,
    store_name: "Ung Văn Khiêm",
    total: 82000000,
    status: PURCHASED_PROPOSED_ASSET_STATUSES.BOUGHT,
  },
  {
    id: 2,
    code: "GTCC.0002",
    date: dayjs().toDate(),
    thoi_gian_can: dayjs().toDate(),
    type: ASSET_PROPOSAL_TYPES.KAIZEN,
    name: "Bảng MICA",
    quantity: 2,
    price: 560000,
    store_name: "Ung Văn Khiêm",
    total: 82000000,
    status: PURCHASED_PROPOSED_ASSET_STATUSES.BOUGHT_YET,
  },
  {
    id: 3,
    code: "GTCC.0003",
    date: dayjs().toDate(),
    thoi_gian_can: dayjs().toDate(),
    type: ASSET_PROPOSAL_TYPES.COMPENSATION,
    name: "Bảng MICA",
    quantity: 2,
    price: 560000,
    store_name: "Ung Văn Khiêm",
    total: 82000000,
    status: PURCHASED_PROPOSED_ASSET_STATUSES.NOT_BUY,
  },
  {
    id: 4,
    code: "GTCC.0004",
    date: dayjs().toDate(),
    thoi_gian_can: dayjs().toDate(),
    type: ASSET_PROPOSAL_TYPES.NEW_BUY,
    name: "Bảng MICA",
    quantity: 2,
    price: 560000,
    store_name: "Ung Văn Khiêm",
    total: 82000000,
    status: PURCHASED_PROPOSED_ASSET_STATUSES.BOUGHT,
  },
];

const PurchasedProposedAssetsListPage = () => {
  useTitle("Danh sách tài sản đề xuất mua");

  //#region Data
  const modalRef = useRef<IMUpdateStatusModalRef>(null);

  const [params, setParams] = useState<IParams>({
    page: 1,
    limit: 10,
    status: "",
    store_code: "",
    date_from: "",
    date_to: "",
    need_date_from: "",
    need_date_to: "",
  });

  const { data, refetch } = useQuery({
    queryKey: ["danh-sach-phieu-de-xuat-tai-san", params],
    queryFn: () => purchasedProposedAssetsApi.getPaginate(params),
    select: (response) => response?.data?.data,
  });

  const listData = useMemo(() => data?.data ?? [], [data]);
  console.log("🚀 ~ PurchasedProposedAssetsListPage ~ listData:", listData);
  //#endregion

  //#region Event
  const onPageChange = (newPage: number) => {
    setParams((prev) => ({ ...prev, page: newPage }));
  };

  const onUpdateStatus = (id: number) => () => modalRef.current?.open(id);
  //#endregion

  //#region Render
  const headers: TCTableHeaders<IPurchasedProposedAsset> = [
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
      key: "thoi_gian_can",
      label: "thời gian cần",
      columnType: "date",
    },
    {
      key: "store_name",
      label: "chi nhánh",
      align: "left",
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
      key: "price",
      label: "đơn giá",
      columnType: "number",
      align: "right",
    },
    {
      key: "total",
      label: "tổng tiền đề xuất",
      align: "right",
      columnType: "number",
    },
    {
      key: "type",
      label: "loại đề xuất",
      columnType: "option",
      options: ASSET_PROPOSAL_TYPES_OPTIONS,
    },
    {
      key: "status",
      label: "trạng thái",
      columnType: "option",
      options: PURCHASED_PROPOSED_ASSET_STATUSES_OPTIONS,
    },
    {
      key: "action",
      label: "thao tác",
      cellRender: (value, record, index) => (
        <CButtonGroup className="table-actions" variant="text">
          <CButton onClick={onUpdateStatus(record?.id)}>Cập nhật</CButton>
        </CButtonGroup>
      ),
    },
  ];
  return (
    <>
      <Typography variant="header-page">
        Danh sách tài sản đề xuất mua
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
      <MUpdateStatusModal ref={modalRef} refetch={refetch} />
    </>
  );
  //#endregion
};
export default PurchasedProposedAssetsListPage;
