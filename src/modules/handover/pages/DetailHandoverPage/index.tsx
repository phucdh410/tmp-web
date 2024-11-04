import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { handoversApi } from "@apis/handovers.api";
import { TCTableHeaders } from "@components/others/CTable/types";
import { HANDOVER_STATUSES_OPTIONS } from "@constants/options";
import { MESSAGES, toast } from "@funcs/toast";
import { useTitle } from "@hooks/title";
import { IAssetInHandoverDetail } from "@interfaces/handovers";
import { Paper, Stack } from "@mui/material";
import { CDetailLabel, CDetailValue, CPageHeader, CTable } from "@others";
import { useQuery } from "@tanstack/react-query";

const DetailHandoverPage = () => {
  useTitle("Chi tiết phiếu bàn giao tài sản");

  //#region Data
  const params = useParams();
  const navigate = useNavigate();

  const { data, error } = useQuery({
    queryKey: ["chi-tiet-phieu-ban-giao-tai-san", params?.id],
    queryFn: () => handoversApi.getById(params.id!),
    select: (response) => response?.data?.data,
  });

  useEffect(() => {
    if (error) {
      toast.error(
        error?.message ?? MESSAGES("phiếu bàn giao").ERROR.GET_DETAIL
      );
      navigate(-1);
    }
  }, [error]);
  //#endregion

  //#region Render
  const headers: TCTableHeaders<IAssetInHandoverDetail> = [
    {
      key: "asset_name",
      label: "tên tài sản",
      align: "left",
    },
    {
      key: "asset_code",
      label: "mã tài sản",
    },
    {
      key: "quantity",
      label: "số lượng",
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
      <CPageHeader back="/handover/list">
        chi tiết phiếu bàn giao tài sản
      </CPageHeader>

      <Paper variant="tool-card" sx={{ my: 3 }}>
        <Stack direction="column" p={3} gap={2}>
          <Stack direction="row" alignItems="center">
            <CDetailLabel label="Số phiếu đề xuất tài sản" />
            <CDetailValue value={data?.document_code} />
          </Stack>
          <Stack direction="row" alignItems="center">
            <CDetailLabel label="Số chứng từ bàn giao" />
            <CDetailValue value={data?.code} />
          </Stack>
          <Stack direction="row" alignItems="center">
            <CDetailLabel label="Ngày bàn giao" />
            <CDetailValue value={data?.date} type="date" />
          </Stack>
          <Stack direction="row" alignItems="center">
            <CDetailLabel label="Người bàn giao" />
            <CDetailValue value={data?.handover_user.name} />
          </Stack>
          <Stack direction="row" alignItems="center">
            <CDetailLabel label="Người nhận bàn giao" />
            <CDetailValue value={data?.receiver_user.name} />
          </Stack>
          <Stack direction="row" alignItems="center">
            <CDetailLabel label="Lý do bàn giao" />
            <CDetailValue value={data?.reason} />
          </Stack>
          <Stack direction="row" alignItems="center">
            <CDetailLabel label="Trạng thái" />
            <CDetailValue
              value={data?.status}
              type="option"
              options={HANDOVER_STATUSES_OPTIONS}
            />
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
        title="Danh sách tài sản bàn giao"
      />
    </>
  );
  //#endregion
};
export default DetailHandoverPage;
