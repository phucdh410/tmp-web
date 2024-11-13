import { forwardRef, useImperativeHandle, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { CAutocomplete, CButton, CDatepicker, CInput } from "@controls";
import { useGetAllStores } from "@hooks/options";
import { IParams } from "@modules/transfer/types";
import { Dialog, Grid2 } from "@mui/material";
import { CFilterInputWrapper } from "@others";

import { IMFilterModalProps, IMFilterModalRef } from "./types";

export const MFilterModal = forwardRef<IMFilterModalRef, IMFilterModalProps>(
  ({ onSearch }, ref) => {
    //#region Data
    const [open, setOpen] = useState(false);

    const { control, handleSubmit, reset } = useForm<IParams>({ mode: "all" });

    const { stores } = useGetAllStores();
    //#endregion

    //#region Event
    const onClose = () => setOpen(false);

    const onSubmit = () => {
      handleSubmit(async (values) => {
        onSearch(values);
        onClose();
      })();
    };
    //#endregion

    useImperativeHandle(ref, () => ({
      open: (currentParams) => {
        reset({ ...currentParams });
        setOpen(true);
      },
    }));

    //#region Rendervvvv
    return (
      <Dialog open={open} onClose={onClose} maxWidth="md">
        <Grid2 container p={3} columns={3} spacing={2}>
          <Grid2 size={1}>
            <CFilterInputWrapper label="Từ ngày">
              <Controller
                control={control}
                name="from"
                render={({ field }) => <CDatepicker {...field} />}
              />
            </CFilterInputWrapper>
          </Grid2>
          <Grid2 size={1}>
            <CFilterInputWrapper label="Đến ngày" width="100%">
              <Controller
                control={control}
                name="to"
                render={({ field }) => <CDatepicker {...field} />}
              />
            </CFilterInputWrapper>
          </Grid2>
          <Grid2 size={1}>
            <CFilterInputWrapper label="Số chứng từ">
              <Controller
                control={control}
                name="code"
                render={({ field }) => (
                  <CInput placeholder="Tìm theo theo mã SCT" {...field} />
                )}
              />
            </CFilterInputWrapper>
          </Grid2>
          <Grid2 size={1}>
            <CFilterInputWrapper label="Chi nhánh chuyển">
              <Controller
                control={control}
                name="from_store_code"
                render={({ field }) => (
                  <CAutocomplete options={stores} {...field} optionAll />
                )}
              />
            </CFilterInputWrapper>
          </Grid2>
          <Grid2 size={1}>
            <CFilterInputWrapper label="Chi nhánh nhận">
              <Controller
                control={control}
                name="to_store_code"
                render={({ field }) => (
                  <CAutocomplete options={stores} {...field} optionAll />
                )}
              />
            </CFilterInputWrapper>
          </Grid2>
          <Grid2 size={1} />
          <Grid2 size={1}>
            <CFilterInputWrapper label="Nhân viên phụ trách chuyển">
              <Controller
                control={control}
                name="from_user"
                render={({ field }) => (
                  <CAutocomplete options={stores} {...field} optionAll />
                )}
              />
            </CFilterInputWrapper>
          </Grid2>
          <Grid2 size={1}>
            <CFilterInputWrapper label="Nhân viên phụ trách nhận">
              <Controller
                control={control}
                name="to_user"
                render={({ field }) => (
                  <CAutocomplete options={stores} {...field} optionAll />
                )}
              />
            </CFilterInputWrapper>
          </Grid2>

          <Grid2 size={3} display="flex" justifyContent="center">
            <CButton onClick={onSubmit}>Tìm kiếm</CButton>
          </Grid2>
        </Grid2>
      </Dialog>
    );
    //#endregion
  }
);
