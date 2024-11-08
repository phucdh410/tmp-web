import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import { acceptancesApi } from "@apis/acceptances.api";
import { CButton } from "@controls";
import { MESSAGES, noti } from "@funcs/toast";
import { useTitle } from "@hooks/title";
import { IAcceptancePayload } from "@interfaces/acceptances";
import { IUploadResponse } from "@interfaces/upload";
import { MForm, MFormTable } from "@modules/acceptance/components";
import { defaultValues, resolver } from "@modules/acceptance/form";
import { Stack } from "@mui/material";
import { CPageHeader } from "@others";
import { useQuery } from "@tanstack/react-query";

const UpdateAcceptancePage = () => {
  useTitle("Sửa phiếu nghiệm thu");

  //#region Data
  const params = useParams();
  const navigate = useNavigate();

  const { data, error } = useQuery({
    queryKey: ["chi-tiet-phieu-nghiem-thu", params?.id],
    queryFn: () => acceptancesApi.getById(params.id!),
    select: (response) => response?.data?.data,
  });

  useEffect(() => {
    if (error) {
      noti.error(
        error?.message ?? MESSAGES("phiếu nghiệm thu").ERROR.GET_DETAIL
      );
      navigate(-1);
    }
  }, [error]);

  const { control, handleSubmit, reset } = useForm<IAcceptancePayload>({
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
        payload.documents = values.documents.map(
          (e) => (e as IUploadResponse).id
        );
        await acceptancesApi.update(id!, payload);
        noti.success(MESSAGES("phiếu nghiệm thu").SUCCESS.UPDATE);
        reset(defaultValues);
        navigate("/acceptance/list");
      } catch (error: any) {
        noti.error(error?.message ?? MESSAGES("phiếu nghiệm thu").ERROR.UPDATE);
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
      <CPageHeader back="/acceptance/list">sửa phiếu nghiệm thu</CPageHeader>

      <MForm control={control} isEdit />

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
export default UpdateAcceptancePage;
