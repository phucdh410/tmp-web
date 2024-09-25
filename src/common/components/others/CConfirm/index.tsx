import { confirmable } from "react-confirm";
import Lottie from "react-lottie";

import warningAnim from "@assets/lotties/warning.json";
import { Divider, Grow, Stack, Typography } from "@mui/material";

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
      <ConfirmDialog open={show} onClose={onClose} TransitionComponent={Grow}>
        <Stack>
          <Stack alignItems="center" gap={1} p={2} pb={3}>
            <Lottie
              isStopped={!show}
              isClickToPauseDisabled
              height={120}
              width={120}
              options={{
                animationData: warningAnim,
                loop: false,
                autoplay: true,
              }}
              style={{ marginBlock: "-12px" }}
            />
            {/* <Error htmlColor="#ffcc00" sx={{ height: 90, width: 90 }} /> */}
            <Typography
              color="#595959"
              fontSize={24}
              letterSpacing={0.6}
              fontWeight={600}
            >
              {title}
            </Typography>
            {content && (
              <Typography color="#595959" fontWeight={500}>
                {content}
              </Typography>
            )}
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
