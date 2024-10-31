import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { exportAssetsApi } from "@apis/export-assets.api";
import { CButton } from "@controls";
import { MESSAGES, toast } from "@funcs/toast";
import { useTitle } from "@hooks/title";
import { IExportAssetPayload } from "@interfaces/export-assets";
import { MForm, MFormTable } from "@modules/export-asset/components";
import { defaultValues, resolver } from "@modules/export-asset/form";
import { Stack, Typography } from "@mui/material";

const CreateReceiptPage = () => {
  useTitle("Thêm phiếu xuất tài sản");

  //#region Data
  const navigate = useNavigate();

  const { control, handleSubmit, reset } = useForm<IExportAssetPayload>({
    mode: "all",
    defaultValues: defaultValues,
    resolver: resolver,
  });
  //#endregion

  //#region Event
  const onSubmit = () => {
    handleSubmit(async (values) => {
      try {
        await exportAssetsApi.create(values);
        toast.success(MESSAGES("phiếu xuất tài sản").SUCCESS.CREATE);
        reset(defaultValues);
        navigate("/export-asset/list");
      } catch (error: any) {
        toast.error(
          error?.message ?? MESSAGES("phiếu xuất tài sản").ERROR.CREATE
        );
      }
    })();
  };
  //#endregion

  //#region Render
  return (
    <>
      <Typography variant="header-page">thêm phiếu xuất tài sản</Typography>

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
export default CreateReceiptPage;
