import { forwardRef, useImperativeHandle, useState } from "react";
import { Controller, useController, useForm } from "react-hook-form";

import { regionsApi } from "@apis/regions.api";
import { CAutocomplete, CButton, CInput } from "@controls";
import { toast } from "@funcs/toast";
import { useGetAllStores } from "@hooks/options";
import { IRegionPayload } from "@interfaces/regions";
import { defaultValues } from "@modules/region/form";
import { Dialog, Stack, Typography } from "@mui/material";
import { CFormInputWrapper, CFormLabel } from "@others";

import { MPlaceInput } from "./MPlaceInput";
import { IMRegionModalProps, IMRegionModalRef } from "./types";

export const MRegionModal = forwardRef<IMRegionModalRef, IMRegionModalProps>(
  ({ refetch }, ref) => {
    //#region Data
    const [open, setOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const { stores } = useGetAllStores();

    const { control, handleSubmit, reset } = useForm<IRegionPayload>({
      mode: "all",
      defaultValues: defaultValues,
    });

    const {
      field: { onChange: onPlaceCodeChange },
    } = useController({ control, name: "place_code" });
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
            await regionsApi.update(id as string, payload);
            toast.success("Sửa vị trí thành công");
          } else {
            await regionsApi.create(payload);
            toast.success("Thêm vị trí thành công");
          }
          refetch?.();
          onClose();
        } catch (error: any) {
          toast.error(error?.message ?? "Cập nhật vị trí không thành công");
        }
      })();
    };

    const onStoreCodeChange =
      (onChangeCallback: (...event: any[]) => void) => (value: any) => {
        onChangeCallback(value);
        onPlaceCodeChange("");
      };
    //#endregion

    useImperativeHandle(ref, () => ({
      open: (editData) => {
        if (editData) {
          setIsEdit(true);
          reset({ ...editData });
        }
        setOpen(true);
      },
    }));

    //#region Render
    return (
      <Dialog open={open} onClose={onClose}>
        <Typography variant="dialog-title">{`${
          isEdit ? "Sửa" : "Thêm"
        } vị trí`}</Typography>
        <Stack minWidth={500} p={3} gap={2}>
          <CFormInputWrapper percent={{ label: 40, input: 60 }}>
            <CFormLabel required>Mã vị trí</CFormLabel>
            <Controller
              control={control}
              name="code"
              render={({ field }) => <CInput {...field} />}
            />
          </CFormInputWrapper>
          <CFormInputWrapper percent={{ label: 40, input: 60 }}>
            <CFormLabel required>Tên vị trí</CFormLabel>
            <Controller
              control={control}
              name="name"
              render={({ field }) => <CInput {...field} />}
            />
          </CFormInputWrapper>
          <CFormInputWrapper percent={{ label: 40, input: 60 }}>
            <CFormLabel required>Chi nhánh</CFormLabel>
            <Controller
              control={control}
              name="store_code"
              render={({ field: { onChange, ..._field } }) => (
                <CAutocomplete
                  options={stores}
                  {..._field}
                  onChange={onStoreCodeChange(onChange)}
                />
              )}
            />
          </CFormInputWrapper>
          <CFormInputWrapper percent={{ label: 40, input: 60 }}>
            <CFormLabel required>Khu vực</CFormLabel>
            <MPlaceInput control={control} />
          </CFormInputWrapper>

          <Stack mt={2} direction="row" justifyContent="center">
            <CButton onClick={onSubmit}>Lưu thông tin</CButton>
          </Stack>
        </Stack>
      </Dialog>
    );
    //#endregion
  }
);
