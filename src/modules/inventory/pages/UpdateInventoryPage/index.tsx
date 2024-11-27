import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

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
import { useQuery } from "@tanstack/react-query";

const UpdateInventoryPage = () => {
  useTitle("Sửa phiếu kiểm kê tài sản");

  //#region Data
  const params = useParams();
  const navigate = useNavigate();

  const { data, error } = useQuery({
    queryKey: ["chi-tiet-phieu-kiem-ke", params?.id],
    queryFn: () => inventoriesApi.getById(params.id!),
    enabled: !!params?.id,
    select: (response) => response?.data?.data,
  });

  useEffect(() => {
    if (error) {
      noti.error(error?.message ?? MESSAGES("phiếu kiểm kê").ERROR.GET_DETAIL);
      navigate(-1);
    }
  }, [error]);

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
        const { id, ...payload } = values;
        await inventoriesApi.update(id!, payload);
        noti.success(MESSAGES("phiếu kiểm kê tài sản").SUCCESS.UPDATE);
        reset(defaultValues);
        navigate(INVENTORY_LIST_PATH);
      } catch (error: any) {
        noti.error(
          error?.message ?? MESSAGES("phiếu kiểm kê tài sản").ERROR.UPDATE
        );
      }
    })();
  };
  //#endregion

  useEffect(() => {
    if (data) {
      reset({ ...data });
    }
  }, [data]);

  //#region Render
  return (
    <>
      <CPageHeader back={INVENTORY_LIST_PATH}>
        sửa phiếu kiểm kê tài sản
      </CPageHeader>

      <MForm control={control} isEdit />

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
export default UpdateInventoryPage;
