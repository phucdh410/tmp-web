import { forwardRef, useImperativeHandle, useState } from "react";

import { assetsApi } from "@apis/assets.api";
import { TCTableHeaders } from "@components/others/CTable/types";
import { CButton } from "@controls";
import { IAssetInAll } from "@interfaces/assets";
import { Dialog, Stack, Typography } from "@mui/material";
import { CTable } from "@others";
import { useQuery } from "@tanstack/react-query";

import {
  IMAssetsSelectionModalProps,
  IMAssetsSelectionModalRef,
} from "./types";

export const MAssetsSelectionModal = forwardRef<
  IMAssetsSelectionModalRef,
  IMAssetsSelectionModalProps
>(({ store_code, onGetAssets }, ref) => {
  //#region Data
  const [open, setOpen] = useState(false);

  const { data: assets = [] } = useQuery({
    queryKey: ["danh-sach-tai-san-theo-chi-nhanh", store_code],
    queryFn: () => assetsApi.getAll(),
    enabled: !!store_code && open,
    select: (response) => response?.data?.data,
  });

  const [selected, setSelected] = useState<IAssetInAll[]>([]);
  //#endregion

  //#region Event
  const onClose = () => {
    setSelected([]);
    setOpen(false);
  };

  const onSelect = (items: IAssetInAll[]) => {
    setSelected(items);
  };

  const onSubmit = () => {
    onGetAssets(selected);
    onClose();
  };
  //#endregion

  useImperativeHandle(ref, () => ({
    open: () => setOpen(true),
  }));

  //#region Render
  const headers: TCTableHeaders<IAssetInAll> = [
    { key: "code", label: "mã tài sản", align: "left" },
    { key: "name", label: "tên tài sản", align: "left" },
    { key: "region", label: "vị trí", align: "left" },
  ];
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xl">
      <Stack p={3} gap={3} minWidth={800}>
        <Typography
          variant="h5"
          fontWeight={500}
          textAlign="center"
          textTransform="uppercase"
        >
          danh sách tài sản
        </Typography>
        <CTable
          showIndexCol={false}
          dense
          selectable
          autoPaginate
          headerTransform="capitalize"
          headers={headers}
          data={assets}
          selectedOutside={{
            selected,
            isIndeterminate: false,
            isSelectedAll: false,
            select: onSelect,
            selectAll: () => {},
          }}
        />
        <Stack direction="row" gap={2} justifyContent="center">
          <CButton onClick={onSubmit}>Thêm tài sản kiểm kê</CButton>
          <CButton onClick={onClose}>Đóng</CButton>
        </Stack>
      </Stack>
    </Dialog>
  );
  //#endregion
});
