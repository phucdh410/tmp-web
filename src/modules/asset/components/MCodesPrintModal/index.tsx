import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

import { assetsApi } from "@apis/assets.api";
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

  const [codeType, setCodeType] = useState<"qrcode" | "barcode">("barcode");

  const [includes, setIncludes] = useState<null | "" | string[]>(null);

  const { data } = useQuery({
    queryKey: ["danh-in-ma-phieu-ghi-tang", includes],
    queryFn: () => assetsApi.getCodes({ includes: includes! }),
    enabled: includes !== null,
    select: (response) => response?.data?.data,
  });

  const printRef = useRef<HTMLDivElement | null>(null);
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
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
        <Stack direction="row" gap={2} mb={2} alignItems="center">
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

        <Stack maxHeight="60vh" p={1} overflow="auto" alignItems="center">
          <Grid2
            container
            spacing={1}
            columns={codeType === "qrcode" ? 5 : 3}
            maxWidth={500}
            mx={1.25}
            ml={0.85}
            ref={printRef}
          >
            {data &&
              data.length > 0 &&
              data.map((e) => (
                <Grid2
                  key={e.id}
                  xs={1}
                  pt={1.25}
                  px={1}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  sx={{ flexDirection: "column" }}
                >
                  <img
                    src={codeType === "qrcode" ? e.qrcode : e.barcode}
                    alt=""
                    loading="lazy"
                  />
                  {showCode && (
                    <Typography
                      textAlign="center"
                      fontSize="0.6rem"
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
          <CButton onClick={handlePrint}>In mã</CButton>
        </Stack>
      </Stack>
    </Dialog>
  );
  //#endregion
});
