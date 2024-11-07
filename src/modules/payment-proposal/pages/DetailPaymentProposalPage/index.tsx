import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { paymentProposalsApi } from "@apis/payment-proposals.api";
import { TCTableHeaders } from "@components/others/CTable/types";
import { PAYMENT_PROPOSAL_STATUSES_OPTIONS } from "@constants/options";
import { MESSAGES, noti } from "@funcs/toast";
import { useTitle } from "@hooks/title";
import { IAssetInPaymentProposalDetail } from "@interfaces/payment-proposals";
import { Paper, Stack } from "@mui/material";
import { CDetailLabel, CDetailValue, CPageHeader, CTable } from "@others";
import { useQuery } from "@tanstack/react-query";

const DetailPaymentProposalPage = () => {
  useTitle("Chi tiết phiếu đề xuất thanh toán");

  //#region Data
  const params = useParams();
  const navigate = useNavigate();

  const { data, error } = useQuery({
    queryKey: ["chi-tiet-phieu-de-xuat-thanh-toan", params?.id],
    queryFn: () => paymentProposalsApi.getById(params.id!),
    select: (response) => response?.data?.data,
  });

  useEffect(() => {
    if (error) {
      noti.error(
        error?.message ?? MESSAGES("phiếu đề xuất thanh toán").ERROR.GET_DETAIL
      );
      navigate(-1);
    }
  }, [error]);
  //#endregion

  //#region Render
  const headers: TCTableHeaders<IAssetInPaymentProposalDetail> = [
    {
      key: "name",
      label: "tên tài sản",
      align: "left",
    },
    {
      key: "code",
      label: "mã tài sản",
    },
    {
      key: "quantity",
      label: "số lượng",
      columnType: "number",
    },
    {
      key: "price",
      label: "đơn giá",
      columnType: "number",
    },
    {
      key: "unit",
      label: "đơn vị tính",
    },
    {
      key: "total",
      label: "thành tiền",
      columnType: "number",
    },
    {
      key: "description",
      label: "mô tả",
      align: "left",
    },
  ];
  return (
    <>
      <CPageHeader back="/payment-proposal/list">
        chi tiết phiếu đề xuất thanh toán
      </CPageHeader>

      <Paper variant="tool-card" sx={{ my: 3 }}>
        <Stack direction="column" p={3} gap={2}>
          <Stack direction="row" alignItems="center">
            <CDetailLabel label="Số phiếu đề xuất mua hàng" />
            <CDetailValue value={data?.document_code} />
          </Stack>
          <Stack direction="row" alignItems="center">
            <CDetailLabel label="Ngày đề xuất thanh toán" />
            <CDetailValue value={data?.date} type="date" />
          </Stack>
          <Stack direction="row" alignItems="center">
            <CDetailLabel label="Tổng tiền" />
            <CDetailValue value={data?.total} type="number" />
          </Stack>
          <Stack direction="row" alignItems="center">
            <CDetailLabel label="Số chứng từ đề xuất thanh toán" />
            <CDetailValue value={data?.code} />
          </Stack>
          <Stack direction="row" alignItems="center">
            <CDetailLabel label="Nhà cung cấp" />
            <CDetailValue value={data?.vendor_name} />
          </Stack>
          <Stack direction="row" alignItems="center">
            <CDetailLabel label="Trạng thái" />
            <CDetailValue
              value={data?.status}
              type="option"
              options={PAYMENT_PROPOSAL_STATUSES_OPTIONS}
            />
          </Stack>
          <Stack direction="row" alignItems="center">
            <CDetailLabel label="Chi nhánh" />
            <CDetailValue value={data?.store_name} />
          </Stack>
          <Stack direction="row" alignItems="center">
            <CDetailLabel label="Mô tả chi tiết" />
            <CDetailValue value={data?.description} />
          </Stack>
          <Stack direction="row" alignItems="center">
            <CDetailLabel label="Lý do" />
            <CDetailValue value={data?.reason} />
          </Stack>
          <Stack direction="row" alignItems="center">
            <CDetailLabel label="Danh sách files" />
            <CDetailValue value={data?.documents} type="file" />
          </Stack>
        </Stack>
      </Paper>
      <CTable
        showIndexCol={false}
        headers={headers}
        headerTransform="capitalize"
        data={data?.assets ?? []}
        autoPaginate
        title="Danh sách tài sản đề xuất thanh toán"
      />
    </>
  );
  //#endregion
};
export default DetailPaymentProposalPage;
