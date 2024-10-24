import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { issuesApi } from "@apis/issues.api";
import { CButton } from "@controls";
import { toast } from "@funcs/toast";
import { useTitle } from "@hooks/title";
import { IIssuePayload } from "@interfaces/issues";
import { MForm, MFormTable } from "@modules/issue/components";
import { defaultValues, resolver } from "@modules/issue/form";
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
        toast.success("Thêm phiếu ghi giảm thành công");
        reset(defaultValues);
        navigate("/paper/issues");
      } catch (error: any) {
        toast.error(error?.message ?? "Thêm phiếu ghi giảm không thành công");
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