import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import { paymentProposalsApi } from "@apis/payment-proposals.api";
import { CButton } from "@controls";
import { MESSAGES, toast } from "@funcs/toast";
import { useTitle } from "@hooks/title";
import { IPaymentProposalPayload } from "@interfaces/payment-proposals";
import { IUploadResponse } from "@interfaces/upload";
import { MForm, MFormTable } from "@modules/payment-proposal/components";
import { defaultValues, resolver } from "@modules/payment-proposal/form";
import { Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

const UpdatePaymentProposalPage = () => {
  useTitle("Sửa phiếu đề xuất thanh toán");

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
      toast.error(
        error?.message ?? MESSAGES("phiếu đề xuất thanh toán").ERROR.GET_DETAIL
      );
      navigate(-1);
    }
  }, [error]);

  const { control, handleSubmit, reset } = useForm<IPaymentProposalPayload>({
    mode: "all",
    defaultValues: defaultValues,
    resolver: resolver,
  });
  //#endregion

  //#region Event
  const onSubmit = () => {
    handleSubmit(async (values) => {
      try {
        const { id, ...payload } = values;
        payload.documents = values.documents.map(
          (e) => (e as IUploadResponse).id
        );
        await paymentProposalsApi.update(id!, payload);
        toast.success(MESSAGES("phiếu đề xuất thanh toán").SUCCESS.UPDATE);
        reset(defaultValues);
        navigate("/payment-proposal/list");
      } catch (error: any) {
        toast.error(
          error?.message ?? MESSAGES("phiếu đề xuất thanh toán").ERROR.UPDATE
        );
      }
    })();
  };
  //#endregion

  useEffect(() => {
    if (data) {
      reset({ ...data, id: data.id.toString() });
    }
  }, [data]);

  //#region Render
  return (
    <>
      <Typography variant="header-page">
        sửa phiếu đề xuất thanh toán
      </Typography>

      <MForm control={control} isEdit />

      <MFormTable control={control} />

      <Stack flexDirection="row" justifyContent="center">
        <CButton onClick={onSubmit} highlight>
          Lưu thông tin
        </CButton>
      </Stack>
    </>
  );
  //#endregion
};
export default UpdatePaymentProposalPage;
