import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import Lottie from "react-lottie";

import importingAnimation from "@assets/lotties/data-transfer.json";
import { noti } from "@funcs/toast";
import { Dialog, Stack, Typography } from "@mui/material";

import { ICImportPluginProps, ICImportPluginRef } from "./types";

export const CImportPlugin = forwardRef<ICImportPluginRef, ICImportPluginProps>(
  ({ onProceed }, ref) => {
    //#region Data
    const inputRef = useRef<HTMLInputElement>(null);

    const [open, setOpen] = useState(false);
    //#endregion

    //#region Event
    const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];

        const validExtensions = [
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "application/vnd.ms-excel",
        ];
        if (!validExtensions.includes(file.type)) {
          noti.error("Định dạng file phải là excel (.xls, .xlsx)");
          inputRef.current!.value = "";
          return;
        }

        inputRef.current!.value = "";
        setOpen(true);
        await onProceed(file);
        setOpen(false);
      }
    };
    //#endregion

    useImperativeHandle(ref, () => ({
      click: () => inputRef.current?.click(),
    }));

    //#region Render
    return (
      <>
        <input
          type="file"
          onChange={onFileChange}
          hidden
          ref={inputRef}
          accept=".xlsx, .xls"
        />

        <Dialog open={open}>
          <Stack
            p={4}
            alignItems="center"
            justifyContent="center"
            gap={2}
            minWidth={400}
          >
            <Stack width="100%" my={-9}>
              <Lottie
                isClickToPauseDisabled
                options={{
                  animationData: importingAnimation,
                }}
              />
            </Stack>
            <Typography fontSize={20} fontWeight={500}>
              Đang nhập dữ liệu...
            </Typography>
          </Stack>
        </Dialog>
      </>
    );
    //#endregion
  }
);
