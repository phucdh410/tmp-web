import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { inventoriesApi } from "@apis/inventories.api";
import { CButton } from "@controls";
import { MESSAGES, noti } from "@funcs/toast";
import { useTitle } from "@hooks/title";
import { IInventoryPayload } from "@interfaces/inventories";
import { MForm } from "@modules/inventory/components";
import { defaultValues, resolver } from "@modules/inventory/form";
import { Stack } from "@mui/material";
import { CPageHeader } from "@others";

const CreateInventoryPage = () => {
  useTitle("Thêm phiếu kiểm kê tài sản");

  //#region Data
  const navigate = useNavigate();

  const { control, handleSubmit, reset } = useForm<IInventoryPayload>({
    mode: "all",
    defaultValues: defaultValues,
    resolver: resolver,
  });
  //#endregion

  //#region Event
  const onSubmit = () => {
    handleSubmit(async (values) => {
      try {
        console.log("🤣 values at line 29 🤣:", values);
        await inventoriesApi.create(values);
        noti.success(MESSAGES("phiếu kiểm kê tài sản").SUCCESS.CREATE);
        reset(defaultValues);
        navigate("/paper/inventories");
      } catch (error: any) {
        noti.error(
          error?.message ?? MESSAGES("phiếu kiểm kê tài sản").ERROR.CREATE
        );
      }
    })();
  };
  //#endregion

  //#region Render
  return (
    <>
      <CPageHeader back="/paper/inventories">
        thêm phiếu kiểm kê tài sản
      </CPageHeader>

      <MForm control={control} />

      <Stack flexDirection="row" justifyContent="center">
        <CButton onClick={onSubmit} highlight>
          Lưu thông tin
        </CButton>
      </Stack>
    </>
  );
  //#endregion
};
export default CreateInventoryPage;
