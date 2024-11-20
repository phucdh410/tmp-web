import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

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

const CreatePaymentProposalPage = () => {
  useTitle("Thêm phiếu đề xuất thanh toán");

  //#region Data
  const navigate = useNavigate();

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
        const payload: IPaymentProposalPayload = {
          ...values,
          documents: values.documents.map((e) => (e as IUploadResponse).id),
        };
        await paymentProposalsApi.create(payload);
        noti.success(MESSAGES("phiếu đề xuất thanh toán").SUCCESS.CREATE);
        reset(defaultValues);
        navigate(PAYMENT_PROPOSAL_LIST_PATH);
      } catch (error: any) {
        noti.error(
          error?.message ?? MESSAGES("phiếu đề xuất thanh toán").ERROR.CREATE
        );
      }
    })();
  };
  //#endregion

  //#region Render
  return (
    <>
      <CPageHeader back={PAYMENT_PROPOSAL_LIST_PATH}>
        thêm phiếu đề xuất thanh toán
      </CPageHeader>

      <MForm control={control} />

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
export default CreatePaymentProposalPage;
