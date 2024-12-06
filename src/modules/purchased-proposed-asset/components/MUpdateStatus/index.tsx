import { forwardRef, useImperativeHandle, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { purchasedProposedAssetsApi } from "@apis/purchased-proposed-assets.api";
import { PURCHASED_PROPOSED_ASSET_STATUSES } from "@constants/enums";
import { PURCHASED_PROPOSED_ASSET_STATUSES_OPTIONS } from "@constants/options";
import { CAutocomplete, CButton } from "@controls";
import { MESSAGES, noti } from "@funcs/toast";
import { IUpdatedStatusPayload } from "@interfaces/purchased-proposed-assets";
import { Dialog, Stack, Typography } from "@mui/material";
import { CFormInputWrapper, CFormLabel } from "@others";

import { IMUpdateStatusModalProps, IMUpdateStatusModalRef } from "./types";

const DEFAULT_VALUES = {
  status: PURCHASED_PROPOSED_ASSET_STATUSES.BOUGHT,
};

export const MUpdateStatusModal = forwardRef<
  IMUpdateStatusModalRef,
  IMUpdateStatusModalProps
>(({ refetch }, ref) => {
  //#region Data
  const [open, setOpen] = useState(false);
  const [id, setId] = useState<string | number>(-1);

  const { control, handleSubmit, reset } = useForm<IUpdatedStatusPayload>({
    mode: "all",
    defaultValues: DEFAULT_VALUES,
  });
  //#endregion

  //#region Event
  const onClose = () => {
    setOpen(false);
    setId(-1);
    reset(DEFAULT_VALUES);
  };

  const onSubmit = () => {
    handleSubmit(async (values) => {
      try {
        await purchasedProposedAssetsApi.updateStatus(id, values);
        noti.success(MESSAGES("trạng thái mua").SUCCESS.UPDATE);
        refetch?.();
        onClose();
      } catch (error: any) {
        noti.error(error?.message ?? MESSAGES("vị trí").ERROR.SAVE);
      }
    })();
  };
  //#endregion

  useImperativeHandle(ref, () => ({
    open: (id, initialStatus) => {
      setId(id);
      if (initialStatus) reset({ status: initialStatus });
      setOpen(true);
    },
  }));

  //#region Render
  return (
    <Dialog open={open} onClose={onClose}>
      <Typography variant="dialog-title">Cập nhật trạng thái mua</Typography>
      <Stack minWidth={500} p={3} gap={2}>
        <CFormInputWrapper percent={{ label: 40, input: 60 }}>
          <CFormLabel required>Trạng thái mua</CFormLabel>
          <Controller
            control={control}
            name="status"
            render={({ field, fieldState: { error } }) => (
              <CAutocomplete
                options={PURCHASED_PROPOSED_ASSET_STATUSES_OPTIONS}
                {...field}
                error={!!error}
              />
            )}
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
