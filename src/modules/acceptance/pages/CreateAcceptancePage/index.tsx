import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { acceptancesApi } from "@apis/acceptances.api";
import { CButton } from "@controls";
import { MESSAGES, noti } from "@funcs/toast";
import { useTitle } from "@hooks/title";
import { IAcceptancePayload } from "@interfaces/acceptances";
import { IUploadResponse } from "@interfaces/upload";
import { MForm, MFormTable } from "@modules/acceptance/components";
import { ACCEPTANCE_LIST_PATH } from "@modules/acceptance/constants";
import { defaultValues, resolver } from "@modules/acceptance/forms";
import { Stack } from "@mui/material";
import { CPageHeader } from "@others";

const CreateAcceptancePage = () => {
  useTitle("Thêm phiếu nghiệm thu");

  //#region Data
  const navigate = useNavigate();

  const { control, handleSubmit, reset } = useForm<IAcceptancePayload>({
    mode: "all",
    defaultValues: defaultValues,
    resolver: resolver,
  });
  //#endregion

  //#region Event
  const onSubmit = () => {
    handleSubmit(async (values) => {
      try {
        const payload: IAcceptancePayload = {
          ...values,
          documents: values.documents.map((e) => (e as IUploadResponse).id),
        };
        await acceptancesApi.create(payload);
        noti.success(MESSAGES("phiếu nghiệm thu").SUCCESS.CREATE);
        reset(defaultValues);
        navigate(ACCEPTANCE_LIST_PATH);
      } catch (error: any) {
        noti.error(error?.message ?? MESSAGES("phiếu nghiệm thu").ERROR.CREATE);
      }
    })();
  };
  //#endregion

  //#region Render
  return (
    <>
      <CPageHeader back={ACCEPTANCE_LIST_PATH}>
        thêm phiếu nghiệm thu
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
export default CreateAcceptancePage;
