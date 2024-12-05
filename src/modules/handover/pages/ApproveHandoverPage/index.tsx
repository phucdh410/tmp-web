import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import { handoversApi } from "@apis/handovers.api";
import { HANDOVER_PHASES } from "@constants/enums";
import { CButton } from "@controls";
import { MESSAGES, noti } from "@funcs/toast";
import { useTitle } from "@hooks/title";
import { IApproveHandoverPayload } from "@interfaces/handovers";
import {
  MApproveAssetsTable,
  MApproveForm,
} from "@modules/handover/components";
import { HANDOVER_LIST_PATH } from "@modules/handover/constants";
import { Cancel, CheckCircle } from "@mui/icons-material";
import { Stack } from "@mui/material";
import { CPageHeader } from "@others";
import { useQuery } from "@tanstack/react-query";

const ApproveHandoverPage = () => {
  useTitle("Duyệt phiếu bàn giao tài sản");

  //#region Data
  const params = useParams();
  const navigate = useNavigate();

  const { data, error, refetch } = useQuery({
    queryKey: ["chi-tiet-phieu-ban-giao", params?.id],
    queryFn: () => handoversApi.getById(params.id!),
    select: (response) => response?.data?.data,
  });

  useEffect(() => {
    if (error) {
      noti.error(
        error?.message ?? MESSAGES("phiếu bàn giao tài sản").ERROR.GET_DETAIL
      );
      navigate(-1);
    }
  }, [error]);

  const { control, handleSubmit, reset } = useForm<IApproveHandoverPayload>({
    mode: "all",
    defaultValues: {
      approval: false,
      receiver_store_note: "",
      asset_note: "",
      tracking_type: HANDOVER_PHASES.RECEIVER,
    },
  });
  //#endregion

  //#region Event
  const onSubmit = (approval: boolean) => () => {
    handleSubmit(async (values) => {
      try {
        const payload = { ...values, approval };
        await handoversApi.approve(params.id!, payload);
        refetch();
        noti.success("Cập nhật duyệt phiếu thành công");
      } catch (error: any) {
        noti.error(error?.message ?? "Cập nhật trạng thái không thành công");
      }
    })();
  };
  //#endregion

  useEffect(() => {
    if (data) {
      reset({ ...data });
    }
  }, [data]);

  //#region Render
  return (
    <>
      <CPageHeader back={HANDOVER_LIST_PATH}>
        duyệt phiếu bàn giao tài sản
      </CPageHeader>

      <MApproveForm control={control} handoverData={data} />

      <Stack direction="row" gap={2} mb={3} justifyContent="end">
        <CButton onClick={onSubmit(false)} color="error" startIcon={<Cancel />}>
          Từ chối
        </CButton>
        <CButton onClick={onSubmit(true)} startIcon={<CheckCircle />}>
          Duyệt
        </CButton>
      </Stack>

      <MApproveAssetsTable data={data} />
    </>
  );
  //#endregion
};
export default ApproveHandoverPage;
