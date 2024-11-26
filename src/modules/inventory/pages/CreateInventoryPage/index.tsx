import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { inventoriesApi } from "@apis/inventories.api";
import { CButton } from "@controls";
import { MESSAGES, noti } from "@funcs/toast";
import { useTitle } from "@hooks/title";
import { IInventoryPayload } from "@interfaces/inventories";
import { MForm, MFormTable } from "@modules/inventory/components";
import { INVENTORY_LIST_PATH } from "@modules/inventory/constants";
import { defaultValues, resolver } from "@modules/inventory/forms";
import { Stack } from "@mui/material";
import { CPageHeader } from "@others";

const CreateInventoryPage = () => {
  useTitle("Thêm phiếu kiểm kê tài sản");

  //#region Data
  const navigate = useNavigate();

  const { control, handleSubmit, reset, getValues } =
    useForm<IInventoryPayload>({
      mode: "all",
      defaultValues: defaultValues,
      resolver: resolver,
    });
  //#endregion

  //#region Event
  const onSubmit = () => {
    handleSubmit(async (values) => {
      try {
        await inventoriesApi.create(values);
        noti.success(MESSAGES("phiếu kiểm kê tài sản").SUCCESS.CREATE);
        reset(defaultValues);
        navigate(INVENTORY_LIST_PATH);
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
      <CPageHeader back={INVENTORY_LIST_PATH}>
        thêm phiếu kiểm kê tài sản
      </CPageHeader>

      <button onClick={() => console.log(getValues())}>Log values</button>

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
export default CreateInventoryPage;
