import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

import { assetsApi } from "@apis/assets.api";
import { CAutocomplete, CButton, CCheckbox } from "@controls";
import { IAssetCodeParams } from "@interfaces/assets";
import { Dialog, Grid2, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import { IMCodesPrintModalProps, IMCodesPrintModalRef } from "./types";

const DEFAULT_FILTERS: IAssetCodeParams = {
  includes: "",
  store_code: "",
  region_id: "",
};

export const MCodesPrintModal = forwardRef<
  IMCodesPrintModalRef,
  IMCodesPrintModalProps
>((props, ref) => {
  //#region Data
  const [open, setOpen] = useState(false);

  const [showCode, setShowCode] = useState(true);

  const [codeType, setCodeType] = useState<"qrcode" | "barcode">("barcode");

  const [filters, setFilters] = useState<IAssetCodeParams>(DEFAULT_FILTERS);

  const { data } = useQuery({
    queryKey: ["danh-in-ma-phieu-ghi-tang", filters, open],
    queryFn: () => assetsApi.getCodes(filters),
    enabled: open,
    select: (response) => response?.data?.data,
  });

  const printRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });
  //#endregion

  //#region Event
  const onClose = () => {
    setOpen(false);
    setFilters(DEFAULT_FILTERS);
  };
  //#endregion

  useImperativeHandle(ref, () => ({
    open: (idsList, store_code, region_id) => {
      const params: IAssetCodeParams = {
        includes: idsList ?? [],
        store_code: store_code ?? "",
        region_id: region_id ?? "",
      };

      setFilters(params);

      setOpen(true);
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
              disabled
            />
          </Stack>
        </Stack>

        <Stack maxHeight="60vh" p={1} overflow="auto" alignItems="center">
          <Grid2
            container
            // spacing={1}
            gap={0}
            margin="calc(8px / -2) calc(8px / -2)"
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
                  width="calc(100% * 1 / 3)"
                  padding="calc(8px / 2) calc(8px / 2)"
                  pt={1.25}
                  px={1}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  sx={{ flexDirection: "column" }}
                  size={1}
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
                      sx={{ color: (theme) => theme.palette.black.main }}
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
