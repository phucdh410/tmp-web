import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { assetValuationsApi } from "@apis/asset-valuations.api";
import { CButton } from "@controls";
import { MESSAGES, noti } from "@funcs/toast";
import { useTitle } from "@hooks/title";
import { IAssetValuationPayload } from "@interfaces/asset-valuations";
import { MForm } from "@modules/asset-valuation/components";
import { ASSET_VALUATION_LIST_PATH } from "@modules/asset-valuation/constants";
import { defaultValues, resolver } from "@modules/asset-valuation/forms";
import { Stack } from "@mui/material";
import { CPageHeader } from "@others";

const CreateAssetValuationPage = () => {
  useTitle("Thêm phiếu định giá tài sản");

  //#region Data
  const navigate = useNavigate();

  const { control, handleSubmit, reset } = useForm<IAssetValuationPayload>({
    mode: "all",
    defaultValues: defaultValues,
    resolver: resolver,
  });
  //#endregion

  //#region Event
  const onSubmit = () => {
    handleSubmit(async (values) => {
      try {
        await assetValuationsApi.create(values);
        noti.success(MESSAGES("phiếu định giá tài sản").SUCCESS.CREATE);
        reset(defaultValues);
        navigate(ASSET_VALUATION_LIST_PATH);
      } catch (error: any) {
        noti.error(
          error?.message ?? MESSAGES("phiếu định giá tài sản").ERROR.CREATE
        );
      }
    })();
  };
  //#endregion

  //#region Render
  return (
    <>
      <CPageHeader back={ASSET_VALUATION_LIST_PATH}>
        thêm phiếu định giá tài sản
      </CPageHeader>

      <MForm control={control} />

      <Stack flexDirection="row" justifyContent="center">
        <CButton onClick={onSubmit} highlight>
          Lưu thông tin
        </CButton>
      </Stack>
    </>
  );
  //#endregion
};
export default CreateAssetValuationPage;
