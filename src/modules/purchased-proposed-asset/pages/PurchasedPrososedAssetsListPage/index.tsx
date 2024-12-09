import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { purchasedProposedAssetsApi } from "@apis/purchased-proposed-assets.api";
import { TCTableHeaders } from "@components/others/CTable/types";
import { PURCHASED_PROPOSED_ASSET_STATUSES } from "@constants/enums";
import {
  ASSET_PROPOSAL_TYPES_OPTIONS,
  PURCHASED_PROPOSED_ASSET_STATUSES_OPTIONS,
} from "@constants/options";
import { CButton, CButtonGroup } from "@controls";
import { useTitle } from "@hooks/title";
import {
  IAssetInPurchasedProposedList,
  IPurchasedProposedAsset,
} from "@interfaces/purchased-proposed-assets";
import {
  MFilter,
  MUpdateStatusModal,
} from "@modules/purchased-proposed-asset/components";
import { IMUpdateStatusModalRef } from "@modules/purchased-proposed-asset/components/MUpdateStatus/types";
import { IParams } from "@modules/purchased-proposed-asset/types";
import { Typography } from "@mui/material";
import { CTable } from "@others";
import { useQuery } from "@tanstack/react-query";

const PurchasedProposedAssetsListPage = () => {
  useTitle("Danh sách tài sản đề xuất mua");

  //#region Data
  const modalRef = useRef<IMUpdateStatusModalRef>(null);

  const [params, setParams] = useState<IParams>({
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
    queryFn: () => purchasedProposedAssetsApi.getPaginate(params),
    select: (response) => response?.data?.data,
  });

  const listData = useMemo(() => data?.data ?? [], [data]);
  //#endregion

  //#region Event
  const onPageChange = (newPage: number) => {
    setParams((prev) => ({ ...prev, page: newPage }));
  };

  const onUpdateStatus =
    (id: number | string, currentStatus: PURCHASED_PROPOSED_ASSET_STATUSES) =>
    () =>
      modalRef.current?.open(id, currentStatus);
  //#endregion

  //#region Render
  const headers: TCTableHeaders<IPurchasedProposedAsset> = [
    {
      key: "document_code",
      label: "số chứng từ",
      width: 180,
      bodyRowSpan: (value, record, index) => record.assets.length ?? 1,
      cellRender: (value, record, index) => (
        <>
          <Link
            to={`/asset-proposals/ballots/form-detail/${record.id}`}
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
      bodyRowSpan: (value, record, index) => record.assets.length ?? 1,
    },
    {
      key: "needed_date",
      label: "thời gian cần",
      columnType: "date",
      bodyRowSpan: (value, record, index) => record.assets.length ?? 1,
    },
    {
      key: "store_name",
      label: "chi nhánh",
      align: "left",
      width: 200,
      cellRender: (value, record, index) => <>{record?.store_name}</>,
      bodyRowSpan: (value, record, index) => record.assets.length ?? 1,
    },
    {
      key: "proposed_type",
      label: "loại đề xuất",
      width: 180,
      columnType: "option",
      options: ASSET_PROPOSAL_TYPES_OPTIONS,
      bodyRowSpan: (value, record, index) => record.assets.length ?? 1,
    },
  ];
  const headersWithSpanData: TCTableHeaders<IAssetInPurchasedProposedList> = [
    {
      key: "asset_name",
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
          <CButton onClick={onUpdateStatus(record?.id, record.status)}>
            Cập nhật
          </CButton>
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
        data={listData}
        headers={headers}
        headersWithSpanData={headersWithSpanData}
        getSpanData={(row, index) => row?.assets}
        headerTransform="capitalize"
        dense
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
