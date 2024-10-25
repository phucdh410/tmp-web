import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { handoverOfAssetsApi } from "@apis/handover-of-assets.api";
import { CButton } from "@controls";
import { MESSAGES, toast } from "@funcs/toast";
import { useTitle } from "@hooks/title";
import { IHandoverOfAssetPayload } from "@interfaces/handover-of-assets";
import { MForm, MFormTable } from "@modules/handover-of-asset/components";
import { defaultValues, resolver } from "@modules/handover-of-asset/form";
import { Stack, Typography } from "@mui/material";

const CreateHandoverOfAssetPage = () => {
  useTitle("Thêm phiếu bàn giao tài sản");

  //#region Data
  const navigate = useNavigate();

  const { control, handleSubmit, reset } = useForm<IHandoverOfAssetPayload>({
    mode: "all",
    defaultValues: defaultValues,
    resolver: resolver,
  });
  //#endregion

  //#region Event
  const onSubmit = () => {
    handleSubmit(async (values) => {
      try {
        await handoverOfAssetsApi.create(values);
        toast.success(MESSAGES("phiếu bàn giao tài sản").SUCCESS.CREATE);
        reset(defaultValues);
        navigate("/handover-of-asset/list");
      } catch (error: any) {
        toast.error(
          error?.message ?? MESSAGES("phiếu bàn giao tài sản").ERROR.CREATE
        );
      }
    })();
  };
  //#endregion

  //#region Render
  return (
    <>
      <Typography variant="header-page">thêm phiếu bàn giao tài sản</Typography>

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
export default CreateHandoverOfAssetPage;
