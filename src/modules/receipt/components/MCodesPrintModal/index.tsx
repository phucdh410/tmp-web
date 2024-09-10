import { forwardRef, useImperativeHandle, useState } from "react";

import { receiptsApi } from "@apis/receipts.api";
import { CAutocomplete, CButton, CCheckbox } from "@controls";
import { Dialog, Stack, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useQuery } from "@tanstack/react-query";

import { IMCodesPrintModalProps, IMCodesPrintModalRef } from "./types";

export const MCodesPrintModal = forwardRef<
  IMCodesPrintModalRef,
  IMCodesPrintModalProps
>((props, ref) => {
  //#region Data
  const [open, setOpen] = useState(false);

  const [showCode, setShowCode] = useState(false);

  const [codeType, setCodeType] = useState<"qrcode" | "barcode">("qrcode");

  const [includes, setIncludes] = useState<null | "" | string[]>(null);

  const { data } = useQuery({
    queryKey: ["danh-in-ma-phieu-ghi-tang", includes],
    queryFn: () => receiptsApi.getCodes({ includes: includes! }),
    enabled: includes !== null,
    select: (response) => response?.data?.data,
  });
  //#endregion

  //#region Event
  const onClose = () => {
    setOpen(false);
    setIncludes(null);
  };
  //#endregion

  useImperativeHandle(ref, () => ({
    open: (idsList) => {
      setOpen(true);

      if (idsList) setIncludes(idsList);
      else setIncludes("");
    },
  }));

  //#region Render
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md">
      <Stack p={3} minWidth={600}>
        <Stack direction="row" gap={2} alignItems="center">
          <CCheckbox
            label="Hiện mã công cụ"
            value={showCode}
            onChange={setShowCode}
          />
          <Stack flex={1} maxWidth={150}>
            <CAutocomplete
              options={[
                { id: "qrcode", label: "QR Code" },
                { id: "barcode", label: "Barcode" },
              ]}
              value={codeType}
              onChange={setCodeType}
            />
          </Stack>
        </Stack>

        <Stack maxHeight="60vh" p={1} overflow="auto">
          <Grid2
            container
            mt={2}
            spacing={2}
            columns={codeType === "qrcode" ? 5 : 3}
          >
            {data &&
              data.length > 0 &&
              data.map((e) => (
                <Grid2 key={e.id} xs={1}>
                  <img
                    src={codeType === "qrcode" ? e.qrcode : e.barcode}
                    alt=""
                    loading="lazy"
                  />
                  {showCode && (
                    <Typography
                      textAlign="center"
                      fontSize={12}
                      color={(theme) => theme.palette.black.main}
                    >
                      {e.code}
                    </Typography>
                  )}
                </Grid2>
              ))}
          </Grid2>
        </Stack>

        <Stack mt={3} direction="row" justifyContent="center">
          <CButton>In mã</CButton>
        </Stack>
      </Stack>
    </Dialog>
  );
  //#endregion
});
