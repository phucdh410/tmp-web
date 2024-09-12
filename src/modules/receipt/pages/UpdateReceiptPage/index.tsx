import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import { receiptsApi } from "@apis/receipts.api";
import { CButton } from "@controls";
import { toast } from "@funcs/toast";
import { useTitle } from "@hooks/title";
import { IReceiptPayload } from "@interfaces/receipts";
import { MForm, MFormTable } from "@modules/receipt/components";
import { defaultValues } from "@modules/receipt/form";
import { refactorPayload, remapInitialValues } from "@modules/receipt/funcs";
import { Stack, Typography } from "@mui/material";
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
      toast.error(error?.message ?? "Không thể lấy thông tin phiếu ghi tăng");
      navigate(-1);
    }
  }, [error]);

  const { control, handleSubmit, reset } = useForm<IReceiptPayload>({
    mode: "all",
    defaultValues: defaultValues,
  });
  //#endregion

  //#region Event
  const onSubmit = () => {
    handleSubmit(async (values) => {
      try {
        const { id, ..._payload } = values;
        const payload = refactorPayload(_payload);
        await receiptsApi.update(id!, payload);
        toast.success("Sửa phiếu ghi tăng thành công");
        reset(defaultValues);
        navigate("/asset/receipts");
      } catch (error: any) {
        toast.error(error?.message ?? "Sửa phiếu ghi tăng không thành công");
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
      <Typography variant="header-page">sửa phiếu ghi tăng</Typography>

      <MForm control={control} isEdit />

      <MFormTable control={control} isEdit />

      <Stack flexDirection="row" justifyContent="center">
        <CButton onClick={onSubmit}>Lưu</CButton>
      </Stack>
    </>
  );
  //#endregion
};
export default UpdateReceiptPage;
