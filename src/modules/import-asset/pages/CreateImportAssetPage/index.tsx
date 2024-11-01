import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { importAssetsApi } from "@apis/import-assets.api";
import { CButton } from "@controls";
import { MESSAGES, toast } from "@funcs/toast";
import { useTitle } from "@hooks/title";
import { IImportAssetPayload } from "@interfaces/import-assets";
import { MForm, MFormTable } from "@modules/import-asset/components";
import { defaultValues, resolver } from "@modules/import-asset/form";
import { Stack, Typography } from "@mui/material";

const CreateReceiptPage = () => {
  useTitle("Thêm phiếu nhập tài sản");

  //#region Data
  const navigate = useNavigate();

  const { control, handleSubmit, reset } = useForm<IImportAssetPayload>({
    mode: "all",
    defaultValues: defaultValues,
    resolver: resolver,
  });
  //#endregion

  //#region Event
  const onSubmit = () => {
    handleSubmit(async (values) => {
      try {
        await importAssetsApi.create(values);
        toast.success(MESSAGES("phiếu nhập tài sản").SUCCESS.CREATE);
        reset(defaultValues);
        navigate("/import-asset/list");
      } catch (error: any) {
        toast.error(
          error?.message ?? MESSAGES("phiếu nhập tài sản").ERROR.CREATE
        );
      }
    })();
  };
  //#endregion

  //#region Render
  return (
    <>
      <Typography variant="header-page">thêm phiếu nhập tài sản</Typography>

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