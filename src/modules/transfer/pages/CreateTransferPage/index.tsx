import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

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

const CreateTransferPage = () => {
  useTitle("Thêm phiếu luân chuyển");

  //#region Data
  const navigate = useNavigate();

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
        await transfersApi.create(values);
        noti.success(MESSAGES("phiếu luân chuyển").SUCCESS.CREATE);
        reset(defaultValues);
        navigate(TRANSFER_LIST_PATH);
      } catch (error: any) {
        noti.error(
          error?.message ?? MESSAGES("phiếu luân chuyển").ERROR.CREATE
        );
      }
    })();
  };
  //#endregion

  //#region Render
  return (
    <>
      <CPageHeader back={TRANSFER_LIST_PATH}>
        thêm phiếu luân chuyển
      </CPageHeader>

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
export default CreateTransferPage;
