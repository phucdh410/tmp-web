import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { handoversApi } from "@apis/handovers.api";
import { TCTableHeaders } from "@components/others/CTable/types";
import { MESSAGES, toast } from "@funcs/toast";
import { useTitle } from "@hooks/title";
import { IAssetInHandoverDetail } from "@interfaces/handovers";
import { Paper, Stack, Typography } from "@mui/material";
import { CDetailBack, CDetailLabel, CDetailValue, CTable } from "@others";
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
      key: "reason",
      label: "lý do bàn giao",
      align: "left",
    },
    {
      key: "description",
      label: "mô tả",
      align: "left",
    },
  ];
  return (
    <>
      <Typography variant="header-page">
        chi tiết phiếu bàn giao tài sản
      </Typography>

      <CDetailBack url="/handover/list" />

      <Paper variant="tool-card" sx={{ my: 3 }}>
        <Stack direction="column" p={3} gap={2}>
          <Stack direction="row" alignItems="center">
            <CDetailLabel label="Số phiếu bàn giao tài sản" />
            <CDetailValue value={data?.document_code} />
          </Stack>
          <Stack direction="row" alignItems="center">
            <CDetailLabel label="Số chứng từ bàn giao" />
            <CDetailValue value={data?.code} />
          </Stack>
          <Stack direction="row" alignItems="center">
            <CDetailLabel label="Người bàn giao" />
            <CDetailValue value={data?.handover_user_fullname} />
          </Stack>
          <Stack direction="row" alignItems="center">
            <CDetailLabel label="Người nhận bàn giao" />
            <CDetailValue value={data?.receiver_user_fullname} />
          </Stack>
          <Stack direction="row" alignItems="center">
            <CDetailLabel label="Ngày bàn giao" />
            <CDetailValue value={data?.date} type="date" />
          </Stack>
          <Stack direction="row" alignItems="center">
            <CDetailLabel label="Trạng thái" />
            <CDetailValue value={data?.status} />
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
