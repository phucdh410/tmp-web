import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import { receiptsApi } from "@apis/receipts.api";
import { CButton } from "@controls";
import { MESSAGES, noti } from "@funcs/toast";
import { useTitle } from "@hooks/title";
import { IReceiptPayload } from "@interfaces/receipts";
import { MForm, MFormTable } from "@modules/receipt/components";
import { defaultValues, resolver } from "@modules/receipt/form";
import { refactorPayload, remapInitialValues } from "@modules/receipt/funcs";
import { Stack } from "@mui/material";
import { CPageHeader } from "@others";
import { useQuery } from "@tanstack/react-query";

const UpdateReceiptPage = () => {
  useTitle("Sửa phiếu ghi tăng");

  //#region Data
  const params = useParams();
  const navigate = useNavigate();

  const { data, error } = useQuery({
    queryKey: ["chi-tiet-phieu-ghi-tang", params?.id],
    queryFn: () => receiptsApi.getById(params.id!),
    select: (response) => response?.data?.data,
  });

  useEffect(() => {
    if (error) {
      noti.error(error?.message ?? MESSAGES("phiếu ghi tăng").ERROR.GET_DETAIL);
      navigate(-1);
    }
  }, [error]);

  const { control, handleSubmit, reset } = useForm<IReceiptPayload>({
    mode: "all",
    defaultValues: defaultValues,
    resolver: resolver,
  });
  //#endregion

  //#region Event
  const onSubmit = () => {
    handleSubmit(async (values) => {
      try {
        const { id, ..._payload } = values;
        const payload = refactorPayload(_payload);
        await receiptsApi.update(id!, payload);
        noti.success(MESSAGES("phiếu ghi tăng").SUCCESS.UPDATE);
        reset(defaultValues);
        navigate("/asset/receipts");
      } catch (error: any) {
        noti.error(error?.message ?? MESSAGES("phiếu ghi tăng").ERROR.UPDATE);
      }
    })();
  };
  //#endregion

  useEffect(() => {
    if (data) {
      reset(remapInitialValues(data));
    }
  }, [data]);

  //#region Render
  return (
    <>
      <CPageHeader back="/export-asset/list">
        sửa phiếu xuất tài sản
      </CPageHeader>

      <MForm control={control} isEdit />

      <MFormTable control={control} isEdit />

      <Stack flexDirection="row" justifyContent="center">
        <CButton onClick={onSubmit} highlight>
          Lưu thông tin
        </CButton>
      </Stack>
    </>
  );
  //#endregion
};
export default UpdateReceiptPage;
