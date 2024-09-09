import { useForm } from "react-hook-form";

import { CButton } from "@controls";
import { toast } from "@funcs/toast";
import { useTitle } from "@hooks/title";
import { IReceiptPayload } from "@interfaces/receipts";
import { MForm } from "@modules/receipt/components";
import { Stack, Typography } from "@mui/material";

const CreateReceiptPage = () => {
  useTitle("Thêm phiếu ghi tăng");

  //#region Data
  const { control, handleSubmit, reset } = useForm<IReceiptPayload>({
    mode: "all",
    defaultValues: {},
    resolver: {},
  });
  //#endregion

  //#region Event
  const onSubmit = () => {
    handleSubmit(async (values) => {
      try {
        console.log(values);
      } catch (error: any) {
        toast.error(error?.message ?? "Thêm phiếu ghi tăng không thành công");
      }
    })();
  };
  //#endregion

  //#region Render
  return (
    <>
      <Typography variant="header-page">thêm phiếu ghi tăng</Typography>

      <MForm />

      <Stack flexDirection="row" justifyContent="center">
        <CButton onClick={onSubmit}>Lưu</CButton>
      </Stack>
    </>
  );
  //#endregion
};
export default CreateReceiptPage;
