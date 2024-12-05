import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { assetValuationsApi } from "@apis/asset-valuations.api";
import { CButton } from "@controls";
import { MESSAGES, noti } from "@funcs/toast";
import { useTitle } from "@hooks/title";
import { IAssetValuationPayload } from "@interfaces/asset-valuations";
import { MAssetInfo, MForm } from "@modules/asset-valuation/components";
import { ASSET_VALUATION_LIST_PATH } from "@modules/asset-valuation/constants";
import {
  AssetValuationContext,
  DEFAULT_CONTEXT_VALUES,
} from "@modules/asset-valuation/contexts";
import { defaultValues, resolver } from "@modules/asset-valuation/forms";
import { ICalculateParams } from "@modules/asset-valuation/types";
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

  const [calculateParams, setCalculateParams] = useState<ICalculateParams>(
    DEFAULT_CONTEXT_VALUES.calculateParams
  );
  //#endregion

  //#region Event
  const onSubmit = () => {
    handleSubmit(async (values) => {
      try {
        await assetValuationsApi.create(values);
        noti.success(MESSAGES("phiếu định giá tài sản").SUCCESS.CREATE);
        reset(defaultValues);
        setCalculateParams(DEFAULT_CONTEXT_VALUES.calculateParams);
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
    <AssetValuationContext.Provider
      value={{ calculateParams, setCalculateParams }}
    >
      <CPageHeader back={ASSET_VALUATION_LIST_PATH}>
        thêm phiếu định giá tài sản
      </CPageHeader>

      <MForm control={control} />

      <MAssetInfo />

      <Stack flexDirection="row" justifyContent="center" mt={3}>
        <CButton onClick={onSubmit} highlight>
          Lưu thông tin
        </CButton>
      </Stack>
    </AssetValuationContext.Provider>
  );
  //#endregion
};
export default CreateAssetValuationPage;
