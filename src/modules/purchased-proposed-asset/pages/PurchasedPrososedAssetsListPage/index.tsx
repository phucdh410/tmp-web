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
import { IPurchasedProposedAssetUnwrapParent } from "@interfaces/purchased-proposed-assets";
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

  const listData = useMemo(() => {
    if (!data?.data) return [];
    const result = data.data.flatMap((item) =>
      item.assets.map((asset) => {
        const { assets, ...parent_info } = item;
        return {
          ...asset,
          parent_info,
        };
      })
    );
    return result;
  }, [data]);
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
  const headers: TCTableHeaders<IPurchasedProposedAssetUnwrapParent> = [
    {
      key: "document_code",
      label: "số chứng từ",
      cellRender: (value, record, index) => (
        <>
          <Link
            to={`/asset-proposals/ballots/form-detail/${record.parent_info.id}`}
            style={{ fontWeight: 500, color: "#4b7cff" }}
          >
            {record.parent_info.document_code}
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
      key: "needed_date",
      label: "thời gian cần",
      columnType: "date",
    },
    {
      key: "store_name",
      label: "chi nhánh",
      align: "left",
      cellRender: (value, record, index) => (
        <>{record?.parent_info?.store_name}</>
      ),
    },
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
      key: "type",
      label: "loại đề xuất",
      cellRender: (value, record, index) => (
        <>
          {ASSET_PROPOSAL_TYPES_OPTIONS.find(
            (e) => e.id === record?.parent_info?.proposed_type
          )?.label ?? ""}
        </>
      ),
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
