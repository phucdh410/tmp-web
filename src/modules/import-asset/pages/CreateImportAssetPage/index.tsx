import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { importAssetsApi } from "@apis/import-assets.api";
import { CButton, CDocumentsTable } from "@controls";
import { MESSAGES, noti } from "@funcs/toast";
import { useTitle } from "@hooks/title";
import { IImportAssetPayload } from "@interfaces/import-assets";
import { MForm } from "@modules/import-asset/components";
import { IMPORT_ASSET_LIST_PATH } from "@modules/import-asset/constants";
import { defaultValues, resolver } from "@modules/import-asset/forms";
import { Stack } from "@mui/material";
import { CPageHeader } from "@others";

const CreateImportAssetPage = () => {
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
        navigate(IMPORT_ASSET_LIST_PATH);
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
      <CPageHeader back={IMPORT_ASSET_LIST_PATH}>
        thêm phiếu nhập tài sản
      </CPageHeader>

      <MForm control={control} resetField={resetField} setValue={setValue} />

      <CDocumentsTable control={control} />

      <Stack flexDirection="row" justifyContent="center">
        <CButton onClick={onSubmit} highlight>
          Lưu thông tin
        </CButton>
      </Stack>
    </>
  );
  //#endregion
};
export default CreateImportAssetPage;
