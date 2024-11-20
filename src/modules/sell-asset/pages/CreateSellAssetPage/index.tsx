import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { sellAssetsApi } from "@apis/sell-assets.api";
import { CButton } from "@controls";
import { MESSAGES, noti } from "@funcs/toast";
import { useTitle } from "@hooks/title";
import { ISellAssetPayload } from "@interfaces/sell-assets";
import { MForm, MFormTable } from "@modules/sell-asset/components";
import { SELL_ASSET_LIST_PATH } from "@modules/sell-asset/constants";
import { defaultValues, resolver } from "@modules/sell-asset/forms";
import { Stack } from "@mui/material";
import { CPageHeader } from "@others";

const CreateSellAssetPage = () => {
  useTitle("Thêm phiếu bán tài sản");

  //#region Data
  const navigate = useNavigate();

  const { control, handleSubmit, reset } = useForm<ISellAssetPayload>({
    mode: "all",
    defaultValues: defaultValues,
    resolver: resolver,
  });
  //#endregion

  //#region Event
  const onSubmit = () => {
    handleSubmit(async (values) => {
      try {
        await sellAssetsApi.create(values);
        noti.success(MESSAGES("phiếu bán tài sản").SUCCESS.CREATE);
        reset(defaultValues);
        navigate(SELL_ASSET_LIST_PATH);
      } catch (error: any) {
        noti.error(
          error?.message ?? MESSAGES("phiếu bán tài sản").ERROR.CREATE
        );
      }
    })();
  };
  //#endregion

  //#region Render
  return (
    <>
      <CPageHeader back={SELL_ASSET_LIST_PATH}>
        thêm phiếu bán tài sản
      </CPageHeader>

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
export default CreateSellAssetPage;
