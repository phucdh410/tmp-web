import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { receiptsApi } from "@apis/receipts.api";
import { CButton } from "@controls";
import { MESSAGES, noti } from "@funcs/toast";
import { useTitle } from "@hooks/title";
import { IReceiptPayload } from "@interfaces/receipts";
import { MForm, MFormTable } from "@modules/receipt/components";
import { defaultValues, resolver } from "@modules/receipt/forms";
import { refactorPayload } from "@modules/receipt/funcs";
import { Stack, Typography } from "@mui/material";

const CreateReceiptPage = () => {
  useTitle("Thêm phiếu ghi tăng");

  //#region Data
  const navigate = useNavigate();

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
        const payload = refactorPayload(values);
        await receiptsApi.create(payload);
        noti.success(MESSAGES("phiếu ghi tăng").SUCCESS.CREATE);
        reset(defaultValues);
        navigate("/asset/receipts");
      } catch (error: any) {
        noti.error(error?.message ?? MESSAGES("phiếu ghi tăng").ERROR.CREATE);
      }
    })();
  };
  //#endregion

  //#region Render
  return (
    <>
      <Typography variant="header-page">thêm phiếu ghi tăng</Typography>

      <MForm control={control} />

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
export default CreateReceiptPage;
