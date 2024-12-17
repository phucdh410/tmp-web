import { forwardRef, useImperativeHandle, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { CButton, CDatepicker, CInput } from "@controls";
import { IRecoveryPaginationParams } from "@interfaces/recoveries";
import { Dialog, Grid2 } from "@mui/material";
import { CFilterInputWrapper } from "@others";

import { IMFilterModalProps, IMFilterModalRef } from "./types";

export const MFilterModal = forwardRef<IMFilterModalRef, IMFilterModalProps>(
  ({ onSearch }, ref) => {
    //#region Data
    const [open, setOpen] = useState(false);

    const { control, handleSubmit, reset } = useForm<IRecoveryPaginationParams>(
      { mode: "all" }
    );
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
                name="start_date"
                render={({ field }) => <CDatepicker {...field} />}
              />
            </CFilterInputWrapper>
          </Grid2>
          <Grid2 size={1}>
            <CFilterInputWrapper label="Đến ngày" width="100%">
              <Controller
                control={control}
                name="end_date"
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
          <Grid2 size={3} display="flex" justifyContent="center">
            <CButton onClick={onSubmit}>Tìm kiếm</CButton>
          </Grid2>
        </Grid2>
      </Dialog>
    );
    //#endregion
  }
);
