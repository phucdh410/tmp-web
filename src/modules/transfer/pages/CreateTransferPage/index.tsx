import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { transfersApi } from "@apis/transfers.api";
import { CButton } from "@controls";
import { toast } from "@funcs/toast";
import { useTitle } from "@hooks/title";
import { ITransferPayload } from "@interfaces/transfers";
import { MForm, MFormTable } from "@modules/transfer/components";
import { defaultValues, resolver } from "@modules/transfer/form";
import { Stack, Typography } from "@mui/material";

const CreateTransferPage = () => {
  useTitle("Thêm phiếu luân chuyển");

  //#region Data
  const navigate = useNavigate();

  const { control, handleSubmit, reset } = useForm<ITransferPayload>({
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
        toast.success("Thêm phiếu luân chuyển thành công");
        reset(defaultValues);
        navigate("/asset/transfers");
      } catch (error: any) {
        toast.error(
          error?.message ?? "Thêm phiếu luân chuyển không thành công"
        );
      }
    })();
  };
  //#endregion

  //#region Render
  return (
    <>
      <Typography variant="header-page">thêm phiếu luân chuyển</Typography>

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
export default CreateTransferPage;
