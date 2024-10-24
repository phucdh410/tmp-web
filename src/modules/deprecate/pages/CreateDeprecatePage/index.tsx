import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { deprecatesApi } from "@apis/deprecates.api";
import { toast } from "@funcs/toast";
import { useTitle } from "@hooks/title";
import { IDeprecatePayload } from "@interfaces/deprecates";
import { MAssetsTableInForm, MForm } from "@modules/deprecate/components";
import { defaultValues, resolver } from "@modules/deprecate/form";
import { Typography } from "@mui/material";

const CreateDeprecatePage = () => {
  useTitle("Thêm phiếu khấu hao");

  //#region Data
  const navigate = useNavigate();

  const { control, handleSubmit, reset } = useForm<IDeprecatePayload>({
    mode: "all",
    defaultValues: defaultValues,
    resolver: resolver,
  });
  //#endregion

  //#region Event
  const onSubmit = () => {
    handleSubmit(async (values) => {
      try {
        await deprecatesApi.create(values);
        toast.success("Thêm phiếu khấu hao thành công");
        reset(defaultValues);
        navigate("/paper/deprecates");
      } catch (error: any) {
        toast.error(error?.message ?? "Thêm phiếu khấu hao không thành công");
      }
    })();
  };
  //#endregion

  //#region Render
  return (
    <>
      <Typography variant="header-page">thêm phiếu khấu hao</Typography>

      <MForm control={control} onSubmit={onSubmit} />

      <MAssetsTableInForm control={control} />
    </>
  );
  //#endregion
};
export default CreateDeprecatePage;