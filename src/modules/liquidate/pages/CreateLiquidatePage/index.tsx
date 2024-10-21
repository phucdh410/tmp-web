import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { liquidatesApi } from "@apis/liquidates.api";
import { CButton } from "@controls";
import { toast } from "@funcs/toast";
import { useTitle } from "@hooks/title";
import { ILiquidatePayload } from "@interfaces/liquidates";
import { MForm, MFormTable } from "@modules/liquidate/components";
import { defaultValues, resolver } from "@modules/liquidate/form";
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
        toast.success("Thêm phiếu thanh lý thành công");
        reset(defaultValues);
        navigate("/paper/liquidates");
      } catch (error: any) {
        toast.error(error?.message ?? "Thêm phiếu thanh lý không thành công");
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
