import { useContext, useMemo } from "react";
import { useWatch } from "react-hook-form";
import { useParams } from "react-router-dom";

import { paymentProposalsApi } from "@apis/payment-proposals.api";
import { PAYMENT_PHASES, PAYMENT_PROPOSAL_STATUSES } from "@constants/enums";
import { PAYMENT_PHASES_OPTIONS } from "@constants/options";
import { CButton } from "@controls";
import { noti } from "@funcs/toast";
import { PaymentProposalContext } from "@modules/payment-proposal/pages/UpdatePaymentProposalPage";
import {
  Stack,
  Step,
  StepConnector,
  StepLabel,
  Stepper,
  styled,
} from "@mui/material";

import { IApprovalStepsProps } from "./types";

const CustomStepConnector = styled(StepConnector)(({ theme }) => ({
  "&.Mui-active,&.Mui-completed": {
    ".MuiStepConnector-line": {
      borderTopWidth: "3px",
      borderColor: theme.palette.primary.main,
    },
  },
}));

export const ApprovalSteps = ({ control }: IApprovalStepsProps) => {
  //#region Data
  const params = useParams();

  const { refetch } = useContext(PaymentProposalContext);

  const tracking_type = useWatch({ control, name: "tracking_type" });
  const status = useWatch({ control, name: "status" });

  const steps = useMemo(() => PAYMENT_PHASES_OPTIONS.map((e) => e.label), []);
  //#endregion

  //#region Event
  const onApprove = async () => {
    try {
      await paymentProposalsApi.approve(params.id!);
      noti.success("Duyệt phiếu thành công");
      refetch();
    } catch (error: any) {
      noti.error(error?.message ?? "Duyệt phiếu không thành công!");
    }
  };

  const onReject = async () => {
    try {
      await paymentProposalsApi.reject(params.id!);
      noti.success("Từ chối phiếu thành công");
      refetch();
    } catch (error: any) {
      noti.error(error?.message ?? "Từ chối phiếu không thành công!");
    }
  };
  //#endregion

  //#region Render
  return (
    <>
      <Stack direction="row" gap={2} mt={2} px={10}>
        <CButton
          onClick={onApprove}
          size="small"
          variant="outlined"
          disabled={
            tracking_type === PAYMENT_PHASES.TREASURER ||
            status === PAYMENT_PROPOSAL_STATUSES.DENIED
          }
        >
          Duyệt
        </CButton>
        <CButton
          onClick={onReject}
          color="error"
          size="small"
          variant="outlined"
          disabled={
            tracking_type === PAYMENT_PHASES.TREASURER ||
            status === PAYMENT_PROPOSAL_STATUSES.DENIED
          }
        >
          Từ chối
        </CButton>
      </Stack>
      <Stepper
        activeStep={tracking_type}
        alternativeLabel
        sx={{ mt: 3 }}
        connector={<CustomStepConnector />}
      >
        {steps.map((label, i) => (
          <Step key={label}>
            <StepLabel
              error={
                i === tracking_type &&
                status === PAYMENT_PROPOSAL_STATUSES.DENIED
              }
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </>
  );
  //#endregion
};
