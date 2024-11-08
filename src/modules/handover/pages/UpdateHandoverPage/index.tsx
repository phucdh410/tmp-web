import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import { handoversApi } from "@apis/handovers.api";
import { CButton } from "@controls";
import { MESSAGES, noti } from "@funcs/toast";
import { useTitle } from "@hooks/title";
import { IHandoverPayload } from "@interfaces/handovers";
import { IUploadResponse } from "@interfaces/upload";
import { MForm, MFormTable } from "@modules/handover/components";
import { defaultValues, resolver } from "@modules/handover/form";
import { Stack } from "@mui/material";
import { CPageHeader } from "@others";
import { useQuery } from "@tanstack/react-query";

const UpdateHandoverPage = () => {
  useTitle("Sửa phiếu bàn giao tài sản");

  //#region Data
  const params = useParams();
  const navigate = useNavigate();

  const { data, error } = useQuery({
    queryKey: ["chi-tiet-phieu-ban-giao", params?.id],
    queryFn: () => handoversApi.getById(params.id!),
    select: (response) => response?.data?.data,
  });

  useEffect(() => {
    if (error) {
      noti.error(
        error?.message ?? MESSAGES("phiếu bàn giao tài sản").ERROR.GET_DETAIL
      );
      navigate(-1);
    }
  }, [error]);

  const { control, handleSubmit, reset } = useForm<IHandoverPayload>({
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
        await handoversApi.update(id!, payload);
        noti.success(MESSAGES("phiếu bàn giao tài sản").SUCCESS.UPDATE);
        reset(defaultValues);
        navigate("/handover/list");
      } catch (error: any) {
        noti.error(
          error?.message ?? MESSAGES("phiếu bàn giao tài sản").ERROR.UPDATE
        );
      }
    })();
  };
  //#endregion

  useEffect(() => {
    if (data) {
      reset({
        ...data,
        handover_user: data.handover_user.code,
        receiver_user: data.receiver_user.code,
      });
    }
  }, [data]);

  //#region Render
  return (
    <>
      <CPageHeader back="/handover/list">
        sửa phiếu bàn giao tài sản
      </CPageHeader>

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
export default UpdateHandoverPage;
