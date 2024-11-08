import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import { importAssetsApi } from "@apis/import-assets.api";
import { CButton } from "@controls";
import { MESSAGES, noti } from "@funcs/toast";
import { useTitle } from "@hooks/title";
import { IImportAssetPayload } from "@interfaces/import-assets";
import { MForm, MFormTable } from "@modules/import-asset/components";
import { defaultValues, resolver } from "@modules/import-asset/form";
import { Stack } from "@mui/material";
import { CPageHeader } from "@others";
import { useQuery } from "@tanstack/react-query";

const UpdateImportAssetPage = () => {
  useTitle("Sửa phiếu nhập tài sản");

  //#region Data
  const params = useParams();
  const navigate = useNavigate();

  const { data, error } = useQuery({
    queryKey: ["chi-tiet-phieu-nhap-tai-san", params?.id],
    queryFn: () => importAssetsApi.getById(params.id!),
    select: (response) => response?.data?.data,
  });

  useEffect(() => {
    if (error) {
      noti.error(
        error?.message ?? MESSAGES("phiếu nhập tài sản").ERROR.GET_DETAIL
      );
      navigate(-1);
    }
  }, [error]);

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
        await importAssetsApi.update(id!, payload);
        noti.success(MESSAGES("phiếu nhập tài sản").SUCCESS.UPDATE);
        reset(defaultValues);
        navigate("/import-asset/list");
      } catch (error: any) {
        noti.error(
          error?.message ?? MESSAGES("phiếu nhập tài sản").ERROR.UPDATE
        );
      }
    })();
  };
  //#endregion

  useEffect(() => {
    if (data) {
      reset({ ...data, properties: data.properties.map((e) => e.id) });
    }
  }, [data]);

  //#region Render
  return (
    <>
      <CPageHeader back="/import-asset/list">
        sửa phiếu nhập tài sản
      </CPageHeader>

      <MForm
        isEdit
        control={control}
        resetField={resetField}
        setValue={setValue}
      />

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
export default UpdateImportAssetPage;
