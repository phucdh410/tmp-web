import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { liquidatesApi } from "@apis/liquidates.api";
import { CButton } from "@controls";
import { MESSAGES, noti } from "@funcs/toast";
import { useTitle } from "@hooks/title";
import { ILiquidatePayload } from "@interfaces/liquidates";
import { MForm, MFormTable } from "@modules/liquidate/components";
import { defaultValues, resolver } from "@modules/liquidate/forms";
import { Stack, Typography } from "@mui/material";

const CreateLiquidatePage = () => {
  useTitle("Thêm phiếu thanh lý");

  //#region Data
  const navigate = useNavigate();

  const { control, handleSubmit, reset } = useForm<ILiquidatePayload>({
    mode: "all",
    defaultValues: defaultValues,
    resolver: resolver,
  });
  //#endregion

  //#region Event
  const onSubmit = () => {
    handleSubmit(async (values) => {
      try {
        await liquidatesApi.create(values);
        noti.success(MESSAGES("phiếu thanh lý").SUCCESS.CREATE);
        reset(defaultValues);
        navigate("/paper/liquidates");
      } catch (error: any) {
        noti.error(error?.message ?? MESSAGES("phiếu thanh lý").ERROR.CREATE);
      }
    })();
  };
  //#endregion

  //#region Render
  return (
    <>
      <Typography variant="header-page">thêm phiếu thanh lý</Typography>

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
export default CreateLiquidatePage;
