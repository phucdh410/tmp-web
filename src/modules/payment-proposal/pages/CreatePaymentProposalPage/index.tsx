import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { paymentProposalsApi } from "@apis/payment-proposals.api";
import { CButton } from "@controls";
import { toast } from "@funcs/toast";
import { useTitle } from "@hooks/title";
import { IPaymentProposalPayload } from "@interfaces/payment-proposals";
import { MForm } from "@modules/payment-proposal/components";
import { defaultValues, resolver } from "@modules/payment-proposal/form";
import { Stack, Typography } from "@mui/material";

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
        await paymentProposalsApi.create(values);
        toast.success("Thêm phiếu đề xuất thanh toán thành công");
        reset(defaultValues);
        navigate("/payment-proposal/list");
      } catch (error: any) {
        toast.error(
          error?.message ?? "Thêm phiếu đề xuất thanh toán không thành công"
        );
      }
    })();
  };
  //#endregion

  //#region Render
  return (
    <>
      <Typography variant="header-page">
        thêm phiếu đề xuất thanh toán
      </Typography>

      <MForm control={control} />

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
