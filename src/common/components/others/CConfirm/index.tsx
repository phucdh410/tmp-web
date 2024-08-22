import { confirmable } from "react-confirm";

import { Error } from "@mui/icons-material";
import { Divider, Stack, Typography } from "@mui/material";

import { ActionButton, ConfirmDialog } from "./StyledComponents";
import { ICConfirmProps } from "./types";
export const CConfirm = confirmable<ICConfirmProps, any>(
  ({ show, proceed, title, content, onProceed, onCancel, ...props }) => {
    //#region Data

    //#endregion

    //#region Event
    const onClose = () => {
      onCancel?.();
      proceed(false);
    };

    const onOk = async () => {
      onProceed?.();
      proceed(true);
    };
    //#endregion

    //#region Render
    return (
      <ConfirmDialog open={show} onClose={onClose}>
        <Stack>
          <Stack alignItems="center" gap={1} p={2}>
            <Error />
            <Typography fontSize={24} letterSpacing={0.6} fontWeight={600}>
              {title}
            </Typography>
            {content && <Typography fontWeight={500}>{content}</Typography>}
          </Stack>
          <Divider />
          <Stack direction="row" alignItems="center" justifyContent="center">
            <ActionButton role="cancel" onClick={onClose}>
              Hủy
            </ActionButton>
            <Divider orientation="vertical" flexItem />
            <ActionButton role="ok" onClick={onOk}>
              OK
            </ActionButton>
          </Stack>
        </Stack>
      </ConfirmDialog>
    );
    //#endregion
  }
);
