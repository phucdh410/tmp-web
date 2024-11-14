import { forwardRef, useImperativeHandle, useState } from "react";

import { Dialog } from "@mui/material";

import {
  IMAssetsSelectionModalProps,
  IMAssetsSelectionModalRef,
} from "./types";

export const MAssetsSelectionModal = forwardRef<
  IMAssetsSelectionModalRef,
  IMAssetsSelectionModalProps
>((props, ref) => {
  //#region Data
  const [open, setOpen] = useState(false);
  //#endregion

  //#region Event
  const onClose = () => setOpen(false);
  //#endregion

  useImperativeHandle(ref, () => ({
    open: () => setOpen(true),
  }));

  //#region Render
  return <Dialog open={open} onClose={onClose}></Dialog>;
  //#endregion
});
