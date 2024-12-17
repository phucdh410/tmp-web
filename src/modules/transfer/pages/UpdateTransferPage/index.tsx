import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import { transfersApi } from "@apis/transfers.api";
import { CButton } from "@controls";
import { MESSAGES, noti } from "@funcs/toast";
import { useTitle } from "@hooks/title";
import { ITransferPayload } from "@interfaces/transfers";
import { MForm, MFormTable } from "@modules/transfer/components";
import { TRANSFER_LIST_PATH } from "@modules/transfer/constants";
import { defaultValues, resolver } from "@modules/transfer/forms";
import { Stack } from "@mui/material";
import { CPageHeader } from "@others";
import { useQuery } from "@tanstack/react-query";

const UpdateTransferPage = () => {
  useTitle("Sửa phiếu luân chuyển");

  //#region Data
  const navigate = useNavigate();
  const params = useParams();

  const { data, error } = useQuery({
    queryKey: ["chi-tiet-phieu-luan-chuyen", params?.id],
    queryFn: () => transfersApi.getById(params.id!),
    enabled: !!params?.id,
    select: (response) => response?.data?.data,
  });

  useEffect(() => {
    if (error) {
      noti.error(
        error?.message ?? MESSAGES("phiếu luân chuyển").ERROR.GET_DETAIL
      );
      navigate(-1);
    }
  }, [error]);

  const { control, handleSubmit, reset, setValue } = useForm<ITransferPayload>({
    mode: "all",
    defaultValues: defaultValues,
    resolver: resolver,
  });
  //#endregion

  //#region Event
  const onSubmit = () => {
    handleSubmit(async (values) => {
      try {
        await transfersApi.update(params.id!, values);
        noti.success(MESSAGES("phiếu luân chuyển").SUCCESS.UPDATE);
        reset(defaultValues);
        navigate(TRANSFER_LIST_PATH);
      } catch (error: any) {
        noti.error(
          error?.message ?? MESSAGES("phiếu luân chuyển").ERROR.UPDATE
        );
      }
    })();
  };
  //#endregion

  useEffect(() => {
    if (data) {
      reset({
        ...data,
        transfer_from: data.transfer_from.id,
        transfer_to: data.transfer_to.id,
        user_in_charge_from: data.user_in_charge_from.id,
        user_in_charge_to: data.user_in_charge_to.id,
        category: Number(data.category),
      });
    }
  }, [data]);

  //#region Render
  return (
    <>
      <CPageHeader back={TRANSFER_LIST_PATH}>sửa phiếu luân chuyển</CPageHeader>

      <MForm control={control} />

      <MFormTable control={control} setValue={setValue} />

      <Stack flexDirection="row" justifyContent="center">
        <CButton onClick={onSubmit} highlight>
          Lưu thông tin
        </CButton>
      </Stack>
    </>
  );
  //#endregion
};
export default UpdateTransferPage;
