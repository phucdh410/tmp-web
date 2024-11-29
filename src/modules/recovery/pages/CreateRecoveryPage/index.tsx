import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { recoveriesApi } from "@apis/recoveries.api";
import { CButton } from "@controls";
import { MESSAGES, noti } from "@funcs/toast";
import { useTitle } from "@hooks/title";
import { IRecoveryPayload } from "@interfaces/recoveries";
import { MForm, MFormTable } from "@modules/recovery/components";
import { defaultValues, resolver } from "@modules/recovery/forms";
import { Stack, Typography } from "@mui/material";

const CreateRecoveryPage = () => {
  useTitle("Thêm phiếu thu hồi");

  //#region Data
  const navigate = useNavigate();

  const { control, handleSubmit, reset } = useForm<IRecoveryPayload>({
    mode: "all",
    defaultValues: defaultValues,
    resolver: resolver,
  });
  //#endregion

  //#region Event
  const onSubmit = () => {
    handleSubmit(async (values) => {
      try {
        await recoveriesApi.create(values);
        noti.success(MESSAGES("phiếu thu hồi").SUCCESS.CREATE);
        reset(defaultValues);
        navigate("/paper/recoveries");
      } catch (error: any) {
        noti.error(error?.message ?? MESSAGES("phiếu thu hồi").ERROR.CREATE);
      }
    })();
  };
  //#endregion

  //#region Render
  return (
    <>
      <Typography variant="header-page">thêm phiếu thu hồi</Typography>

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
export default CreateRecoveryPage;
