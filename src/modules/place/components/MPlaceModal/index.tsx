import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { placesApi } from "@apis/places.api";
import { STATUS_OPTIONS } from "@constants/options";
import { CAutocomplete, CButton, CInput } from "@controls";
import { MESSAGES, noti } from "@funcs/toast";
import { IPlacePayload } from "@interfaces/places";
import { Dialog, Stack, Typography } from "@mui/material";
import { CFormInputWrapper, CFormLabel, CTooltip } from "@others";

import { DEFAULT_VALUES, RESOLVER } from "../../form";

import { IMModalProps, IMModalRef } from "./types";

export const MPlaceModal = forwardRef<IMModalRef, IMModalProps>(
  ({ stores, refetch, ...props }, ref) => {
    //#region Data
    const [open, setOpen] = useState(false);

    const [isEdit, setIsEdit] = useState(false);

    const {
      control,
      handleSubmit,
      reset,
      setValue,
      formState: { isSubmitting },
    } = useForm<IPlacePayload>({
      mode: "all",
      defaultValues: DEFAULT_VALUES,
      resolver: RESOLVER,
    });
    //#endregion

    //#region Event
    const onClose = () => {
      setOpen(false);
      setIsEdit(false);
      reset(DEFAULT_VALUES);
    };

    const onSubmit = () => {
      handleSubmit(async (values) => {
        try {
          const { code, id, ...payload } = values;
          if (isEdit) {
            await placesApi.update(id!, payload);
            noti.success(MESSAGES("khu vực").SUCCESS.UPDATE);
          } else {
            await placesApi.create(payload);
            noti.success(MESSAGES("khu vực").SUCCESS.CREATE);
          }
          refetch();
          onClose();
        } catch (error: any) {
          noti.error(error?.message ?? MESSAGES("khu vực").ERROR.SAVE);
        }
      })();
    };
    //#endregion

    useEffect(() => {
      if (stores?.length > 0 && open && !isEdit)
        setValue("store_code", stores[0].id as string);
    }, [stores, isEdit, open]);

    useImperativeHandle(ref, () => ({
      open: (editData) => {
        if (editData) {
          setIsEdit(true);
          reset({
            id: editData?.id,
            code: editData?.code,
            name: editData?.name,
            store_code: editData?.store_code,
            status: editData?.status,
          });
        }
        setOpen(true);
      },
    }));

    //#region Render
    return (
      <Dialog open={open} onClose={onClose} maxWidth="md">
        <Typography variant="dialog-title">{`${
          isEdit ? "sửa" : "thêm"
        } khu vực`}</Typography>
        <Stack minWidth={500} p={3} gap={2}>
          <CFormInputWrapper percent={{ label: 40, input: 60 }}>
            <CFormLabel>Mã khu vực</CFormLabel>
            <CTooltip title="Mã sẽ do hệ thống tự khởi tạo">
              <Controller
                control={control}
                name="code"
                render={({ field }) => <CInput readOnly {...field} />}
              />
            </CTooltip>
          </CFormInputWrapper>
          <CFormInputWrapper percent={{ label: 40, input: 60 }}>
            <CFormLabel required>Tên khu vực</CFormLabel>
            <Controller
              control={control}
              name="name"
              render={({ field, fieldState: { error } }) => (
                <CInput {...field} error={!!error} />
              )}
            />
          </CFormInputWrapper>
          <CFormInputWrapper percent={{ label: 40, input: 60 }}>
            <CFormLabel required>Chi nhánh</CFormLabel>
            <Controller
              control={control}
              name="store_code"
              render={({ field, fieldState: { error } }) => (
                <CAutocomplete {...field} options={stores} error={!!error} />
              )}
            />
          </CFormInputWrapper>
          <CFormInputWrapper percent={{ label: 40, input: 60 }}>
            <CFormLabel required>Trạng thái</CFormLabel>
            <Controller
              control={control}
              name="status"
              render={({ field, fieldState: { error } }) => (
                <CAutocomplete
                  {...field}
                  options={STATUS_OPTIONS}
                  error={!!error}
                  errorText={error?.message}
                />
              )}
            />
          </CFormInputWrapper>

          <Stack mt={2} direction="row" justifyContent="center">
            <CButton onClick={onSubmit} loading={isSubmitting} highlight>
              Lưu thông tin
            </CButton>
          </Stack>
        </Stack>
      </Dialog>
    );
    //#endregion
  }
);
