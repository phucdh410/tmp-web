import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

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
import { useQuery } from "@tanstack/react-query";

const UpdateAssetValuationPage = () => {
  useTitle("Sửa phiếu định giá tài sản");

  //#region Data
  const params = useParams();
  const navigate = useNavigate();

  const { data, error } = useQuery({
    queryKey: ["chi-tiet-phieu-kiem-ke", params?.id],
    queryFn: () => assetValuationsApi.getById(params.id!),
    enabled: !!params?.id,
    select: (response) => response?.data?.data,
  });

  useEffect(() => {
    if (error) {
      noti.error(error?.message ?? MESSAGES("phiếu kiểm kê").ERROR.GET_DETAIL);
      navigate(-1);
    }
  }, [error]);

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
        const { id, ...payload } = values;
        await assetValuationsApi.update(id!, payload);
        noti.success(MESSAGES("phiếu định giá tài sản").SUCCESS.UPDATE);
        reset(defaultValues);
        navigate(ASSET_VALUATION_LIST_PATH);
      } catch (error: any) {
        noti.error(
          error?.message ?? MESSAGES("phiếu định giá tài sản").ERROR.UPDATE
        );
      }
    })();
  };
  //#endregion

  useEffect(() => {
    if (data) {
      reset({ ...data });
    }
  }, [data]);

  //#region Render
  return (
    <>
      <CPageHeader back={ASSET_VALUATION_LIST_PATH}>
        sửa phiếu định giá tài sản
      </CPageHeader>

      <MForm control={control} isEdit />

      <Stack flexDirection="row" justifyContent="center">
        <CButton onClick={onSubmit} highlight>
          Lưu thông tin
        </CButton>
      </Stack>
    </>
  );
  //#endregion
};
export default UpdateAssetValuationPage;
