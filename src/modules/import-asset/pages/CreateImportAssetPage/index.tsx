import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { importAssetsApi } from "@apis/import-assets.api";
import { CButton } from "@controls";
import { MESSAGES, noti } from "@funcs/toast";
import { useTitle } from "@hooks/title";
import { IImportAssetPayload } from "@interfaces/import-assets";
import { MForm, MFormTable } from "@modules/import-asset/components";
import { defaultValues, resolver } from "@modules/import-asset/form";
import { Stack, Typography } from "@mui/material";

const CreateReceiptPage = () => {
  useTitle("Thêm phiếu nhập tài sản");

  //#region Data
  const navigate = useNavigate();

  const { control, handleSubmit, reset, resetField, setValue } =
    useForm<IImportAssetPayload>({
      mode: "all",
      defaultValues: defaultValues,
      resolver: resolver,
    });
  //#endregion

  //#region Event
  const onSubmit = () => {
    handleSubmit(async (values) => {
      try {
        const { id, ...payload } = values;
        await importAssetsApi.create(payload);
        noti.success(MESSAGES("phiếu nhập tài sản").SUCCESS.CREATE);
        reset(defaultValues);
        navigate("/import-asset/list");
      } catch (error: any) {
        noti.error(
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

      <MForm control={control} resetField={resetField} setValue={setValue} />

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
