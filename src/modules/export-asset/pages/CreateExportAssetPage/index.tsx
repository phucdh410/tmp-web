import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { exportAssetsApi } from "@apis/export-assets.api";
import { CDocumentsTable } from "@components/controls/CSpecificInput/CDocumentsTable";
import { CButton } from "@controls";
import { MESSAGES, noti } from "@funcs/toast";
import { useTitle } from "@hooks/title";
import { IExportAssetPayload } from "@interfaces/export-assets";
import { MForm } from "@modules/export-asset/components";
import { defaultValues, resolver } from "@modules/export-asset/form";
import { Stack } from "@mui/material";
import { CPageHeader } from "@others";

const CreateExportAssetPage = () => {
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
        noti.success(MESSAGES("phiếu xuất tài sản").SUCCESS.CREATE);
        reset(defaultValues);
        navigate("/export-asset/list");
      } catch (error: any) {
        noti.error(
          error?.message ?? MESSAGES("phiếu xuất tài sản").ERROR.CREATE
        );
      }
    })();
  };
  //#endregion

  //#region Render
  return (
    <>
      <CPageHeader back="/export-asset/list">
        thêm phiếu xuất tài sản
      </CPageHeader>

      <MForm control={control} />

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
export default CreateExportAssetPage;
