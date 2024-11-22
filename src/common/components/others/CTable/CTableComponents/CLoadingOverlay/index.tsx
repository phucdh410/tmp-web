import { forwardRef } from "react";

import { LinearProgress, Stack } from "@mui/material";

import { ICLoadingOverlayProps, ICLoadingOverlayRef } from "./types";

export const CLoadingOverlay = forwardRef<
  ICLoadingOverlayRef,
  ICLoadingOverlayProps
>(({ loading }, ref) => {
  return (
    <Stack
      position="absolute"
      ref={ref}
      alignItems="center"
      justifyContent="start"
      bgcolor="#00000014"
      display={{ display: loading ? "flex" : "none" }}
      sx={{ inset: 0, zIndex: 6 }}
    >
      <LinearProgress sx={{ width: "100%" }} />
    </Stack>
  );
});
