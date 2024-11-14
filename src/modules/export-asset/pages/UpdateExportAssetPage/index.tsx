import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

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
import { useQuery } from "@tanstack/react-query";

const UpdateExportAssetPage = () => {
  useTitle("Sửa phiếu xuất tài sản");

  //#region Data
  const navigate = useNavigate();
  const params = useParams();

  const { data, error } = useQuery({
    queryKey: ["chi-tiet-phieu-xuat-tai-san", params?.id],
    queryFn: () => exportAssetsApi.getById(params.id!),
    enabled: !!params?.id,
    select: (response) => response?.data?.data,
  });

  useEffect(() => {
    if (error) {
      noti.error(
        error?.message ?? MESSAGES("phiếu xuất tài sản").ERROR.GET_DETAIL
      );
      navigate(-1);
    }
  }, [error]);

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
        const { id, ...payload } = values;
        await exportAssetsApi.update(id!, payload);
        noti.success(MESSAGES("phiếu xuất tài sản").SUCCESS.UPDATE);
        reset(defaultValues);
        navigate("/export-asset/list");
      } catch (error: any) {
        noti.error(
          error?.message ?? MESSAGES("phiếu xuất tài sản").ERROR.UPDATE
        );
      }
    })();
  };
  //#endregion

  useEffect(() => {
    if (data) {
      reset({
        ...data,
        properties: data.properties.map((e) => e.id),
        barcode: Number(data.barcode),
      });
    }
  }, [data]);

  //#region Render
  return (
    <>
      <CPageHeader back="/export-asset/list">
        sửa phiếu xuất tài sản
      </CPageHeader>

      <MForm control={control} isEdit />

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
export default UpdateExportAssetPage;
