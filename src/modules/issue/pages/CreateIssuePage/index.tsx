import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { issuesApi } from "@apis/issues.api";
import { CButton } from "@controls";
import { MESSAGES, noti } from "@funcs/toast";
import { useTitle } from "@hooks/title";
import { IIssuePayload } from "@interfaces/issues";
import { MForm, MFormTable } from "@modules/issue/components";
import { defaultValues, resolver } from "@modules/issue/forms";
import { Stack, Typography } from "@mui/material";

const CreateIssuePage = () => {
  useTitle("Thêm phiếu ghi giảm");

  //#region Data
  const navigate = useNavigate();

  const { control, handleSubmit, reset } = useForm<IIssuePayload>({
    mode: "all",
    defaultValues: defaultValues,
    resolver: resolver,
  });
  //#endregion

  //#region Event
  const onSubmit = () => {
    handleSubmit(async (values) => {
      try {
        await issuesApi.create(values);
        noti.success(MESSAGES("phiếu ghi giảm").SUCCESS.CREATE);
        reset(defaultValues);
        navigate("/paper/issues");
      } catch (error: any) {
        noti.error(error?.message ?? MESSAGES("phiếu ghi giảm").ERROR.CREATE);
      }
    })();
  };
  //#endregion

  //#region Render
  return (
    <>
      <Typography variant="header-page">thêm phiếu ghi giảm</Typography>

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
export default CreateIssuePage;
