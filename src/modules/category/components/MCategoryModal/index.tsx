import { forwardRef, useImperativeHandle, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { categoriesApi } from "@apis/categories.api";
import { CButton, CInput } from "@controls";
import { toast } from "@funcs/toast";
import { ICategoryPayload } from "@interfaces/categories";
import { defaultValues } from "@modules/category/form";
import { Dialog, Stack, Typography } from "@mui/material";
import { CFormInputWrapper, CFormLabel } from "@others";

import { IMCategoryModalProps, IMCategoryModalRef } from "./types";

export const MCategoryModal = forwardRef<
  IMCategoryModalRef,
  IMCategoryModalProps
>(({ refetch, getSucceededData }, ref) => {
  //#region Data
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const { control, handleSubmit, reset, setValue } = useForm<ICategoryPayload>({
    mode: "all",
    defaultValues: defaultValues,
  });
  //#endregion

  //#region Event
  const onClose = () => {
    setOpen(false);
    setIsEdit(false);
    reset(defaultValues);
  };

  const onSubmit = () => {
    handleSubmit(async (values) => {
      try {
        const { id, ...payload } = values;
        if (isEdit) {
          const res = await categoriesApi.update(id as string, payload);
          toast.success("Sửa loại công cụ dụng cụ thành công");
          getSucceededData?.(res.data.data);
        } else {
          const res = await categoriesApi.create(payload);
          getSucceededData?.(res.data.data);
          toast.success("Thêm loại công cụ dụng cụ thành công");
        }
        refetch?.();
        onClose();
      } catch (error: any) {
        toast.error(
          error?.message ?? "Cập nhật loại công cụ dụng cụ không thành công"
        );
      }
    })();
  };
  //#endregion

  useImperativeHandle(ref, () => ({
    open: (editData, initialName) => {
      if (editData) {
        setIsEdit(true);
        reset({ ...editData });
      }
      if (initialName) {
        setValue("name", initialName);
      }
      setOpen(true);
    },
  }));

  //#region Render
  return (
    <Dialog open={open} onClose={onClose}>
      <Typography variant="dialog-title">{`${
        isEdit ? "Sửa" : "Thêm"
      } loại công cụ dụng cụ`}</Typography>
      <Stack minWidth={500} p={3} gap={2}>
        <CFormInputWrapper percent={{ label: 40, input: 60 }}>
          <CFormLabel required>Mã loại CCDC</CFormLabel>
          <Controller
            control={control}
            name="code"
            render={({ field }) => <CInput {...field} />}
          />
        </CFormInputWrapper>
        <CFormInputWrapper percent={{ label: 40, input: 60 }}>
          <CFormLabel required>Tên loại CCDC</CFormLabel>
          <Controller
            control={control}
            name="name"
            render={({ field }) => <CInput {...field} />}
          />
        </CFormInputWrapper>
        <CFormInputWrapper percent={{ label: 40, input: 60 }}>
          <CFormLabel>Ghi chú</CFormLabel>
          <Controller
            control={control}
            name="note"
            render={({ field }) => <CInput {...field} />}
          />
        </CFormInputWrapper>

        <Stack mt={2} direction="row" justifyContent="center">
          <CButton onClick={onSubmit} highlight>
            Lưu thông tin
          </CButton>
        </Stack>
      </Stack>
    </Dialog>
  );
  //#endregion
});
