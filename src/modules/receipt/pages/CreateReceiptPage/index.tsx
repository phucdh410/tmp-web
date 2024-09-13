import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { receiptsApi } from "@apis/receipts.api";
import { CButton } from "@controls";
import { toast } from "@funcs/toast";
import { useTitle } from "@hooks/title";
import { IReceiptPayload } from "@interfaces/receipts";
import { MForm, MFormTable } from "@modules/receipt/components";
import { defaultValues } from "@modules/receipt/form";
import { refactorPayload } from "@modules/receipt/funcs";
import { Stack, Typography } from "@mui/material";

const CreateReceiptPage = () => {
  useTitle("Thêm phiếu ghi tăng");

  //#region Data
  const navigate = useNavigate();

  const { control, handleSubmit, reset, getValues } = useForm<IReceiptPayload>({
    mode: "all",
    defaultValues: defaultValues,
  });
  //#endregion

  //#region Event
  const onSubmit = () => {
    handleSubmit(async (values) => {
      try {
        const payload = refactorPayload(values);
        await receiptsApi.create(payload);
        toast.success("Thêm phiếu ghi tăng thành công");
        reset(defaultValues);
        navigate("/asset/receipts");
      } catch (error: any) {
        toast.error(error?.message ?? "Thêm phiếu ghi tăng không thành công");
      }
    })();
  };
  //#endregion

  //#region Render
  return (
    <>
      <button onClick={() => console.log(getValues())}>Log values</button>
      <Typography variant="header-page">thêm phiếu ghi tăng</Typography>

      <MForm control={control} />

      <MFormTable control={control} />

      <Stack flexDirection="row" justifyContent="center">
        <CButton onClick={onSubmit}>Lưu</CButton>
      </Stack>
    </>
  );
  //#endregion
};
export default CreateReceiptPage;
