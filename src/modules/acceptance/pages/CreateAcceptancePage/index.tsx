import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { acceptancesApi } from "@apis/acceptances.api";
import { CButton } from "@controls";
import { toast } from "@funcs/toast";
import { useTitle } from "@hooks/title";
import { IAcceptancePayload } from "@interfaces/acceptances";
import { MForm } from "@modules/acceptance/components";
import { defaultValues, resolver } from "@modules/acceptance/form";
import { Stack, Typography } from "@mui/material";

const CreatePaymentProposalPage = () => {
  useTitle("Thêm phiếu nghiệm thu");

  //#region Data
  const navigate = useNavigate();

  const { control, handleSubmit, reset } = useForm<IAcceptancePayload>({
    mode: "all",
    defaultValues: defaultValues,
    resolver: resolver,
  });
  //#endregion

  //#region Event
  const onSubmit = () => {
    handleSubmit(async (values) => {
      try {
        await acceptancesApi.create(values);
        toast.success("Thêm phiếu nghiệm thu thành công");
        reset(defaultValues);
        navigate("/acceptances/list");
      } catch (error: any) {
        toast.error(error?.message ?? "Thêm phiếu nghiệm thu không thành công");
      }
    })();
  };
  //#endregion

  //#region Render
  return (
    <>
      <Typography variant="header-page">thêm phiếu nghiệm thu</Typography>

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
