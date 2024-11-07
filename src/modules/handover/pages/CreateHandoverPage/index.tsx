import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

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

const CreateHandoverPage = () => {
  useTitle("Thêm phiếu bàn giao tài sản");

  //#region Data
  const navigate = useNavigate();

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
        const payload: IHandoverPayload = {
          ...values,
          documents: values.documents.map((e) => (e as IUploadResponse).id),
        };
        await handoversApi.create(payload);
        noti.success(MESSAGES("phiếu bàn giao tài sản").SUCCESS.CREATE);
        reset(defaultValues);
        navigate("/handover/list");
      } catch (error: any) {
        noti.error(
          error?.message ?? MESSAGES("phiếu bàn giao tài sản").ERROR.CREATE
        );
      }
    })();
  };
  //#endregion

  //#region Render
  return (
    <>
      <CPageHeader back="/handover/list">
        thêm phiếu bàn giao tài sản
      </CPageHeader>

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
export default CreateHandoverPage;
