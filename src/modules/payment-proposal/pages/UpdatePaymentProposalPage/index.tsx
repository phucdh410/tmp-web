import { createContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import { paymentProposalsApi } from "@apis/payment-proposals.api";
import { CButton } from "@controls";
import { MESSAGES, noti } from "@funcs/toast";
import { useTitle } from "@hooks/title";
import { IPaymentProposalPayload } from "@interfaces/payment-proposals";
import { IUploadResponse } from "@interfaces/upload";
import { MForm, MFormTable } from "@modules/payment-proposal/components";
import { PAYMENT_PROPOSAL_LIST_PATH } from "@modules/payment-proposal/constants";
import { defaultValues, resolver } from "@modules/payment-proposal/forms";
import { Stack } from "@mui/material";
import { CPageHeader } from "@others";
import { useQuery } from "@tanstack/react-query";

export const PaymentProposalContext = createContext({ refetch: () => {} });

const UpdatePaymentProposalPage = () => {
  useTitle("Sửa phiếu đề xuất thanh toán");

  //#region Data
  const params = useParams();
  const navigate = useNavigate();

  const { data, error, refetch } = useQuery({
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
        noti.success(MESSAGES("phiếu đề xuất thanh toán").SUCCESS.UPDATE);
        reset(defaultValues);
        navigate(PAYMENT_PROPOSAL_LIST_PATH);
      } catch (error: any) {
        noti.error(
          error?.message ?? MESSAGES("phiếu đề xuất thanh toán").ERROR.UPDATE
        );
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
    <PaymentProposalContext.Provider value={{ refetch }}>
      <CPageHeader back={PAYMENT_PROPOSAL_LIST_PATH}>
        sửa phiếu đề xuất thanh toán
      </CPageHeader>

      <MForm control={control} isEdit />

      <MFormTable control={control} />

      <Stack flexDirection="row" justifyContent="center">
        <CButton onClick={onSubmit} highlight>
          Lưu thông tin
        </CButton>
      </Stack>
    </PaymentProposalContext.Provider>
  );
  //#endregion
};
export default UpdatePaymentProposalPage;
