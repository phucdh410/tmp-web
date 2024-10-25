import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { acceptancesApi } from "@apis/acceptances.api";
import { CButton } from "@controls";
import { MESSAGES, toast } from "@funcs/toast";
import { useTitle } from "@hooks/title";
import { IAcceptancePayload } from "@interfaces/acceptances";
import { MForm } from "@modules/acceptance/components";
import { defaultValues, resolver } from "@modules/acceptance/form";
import { Stack, Typography } from "@mui/material";

const CreatePaymentProposalPage = () => {
  useTitle("Thêm phiếu nghiệm thu");

  //#region Data
  const navigate = useNavigate();

  const { control, handleSubmit, reset, setValue } =
    useForm<IAcceptancePayload>({
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
        toast.success(MESSAGES("phiếu nghiệm thu").SUCCESS.CREATE);
        reset(defaultValues);
        navigate("/acceptance/list");
      } catch (error: any) {
        toast.error(
          error?.message ?? MESSAGES("phiếu nghiệm thu").ERROR.CREATE
        );
      }
    })();
  };
  //#endregion

  //#region Render
  return (
    <>
      <Typography variant="header-page">thêm phiếu nghiệm thu</Typography>

      <MForm control={control} setValue={setValue} />

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
