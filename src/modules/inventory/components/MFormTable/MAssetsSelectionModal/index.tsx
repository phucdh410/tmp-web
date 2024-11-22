import { forwardRef, useImperativeHandle, useMemo, useState } from "react";

import { assetsApi } from "@apis/assets.api";
import { TCTableHeaders } from "@components/others/CTable/types";
import { CButton } from "@controls";
import { removeDiacritics } from "@funcs/filter-search";
import { IAssetInAll } from "@interfaces/assets";
import { Dialog, Stack, Typography } from "@mui/material";
import { CTable } from "@others";
import { useQuery } from "@tanstack/react-query";

import { MSearch } from "./MSearch";
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

  const { data: _assets = [] } = useQuery({
    queryKey: ["danh-sach-tai-san-theo-chi-nhanh", store_code],
    queryFn: () => assetsApi.getAll(),
    enabled: !!store_code && open,
    select: (response) => response?.data?.data,
  });

  const [searchParams, setSearchParams] = useState({ code: "", name: "" });

  const assets = useMemo(() => {
    if (!searchParams.code && !searchParams.name) {
      return _assets;
    } else {
      return _assets.filter((e) => {
        const codeMatches = removeDiacritics(e.code)
          .toLowerCase()
          .includes(removeDiacritics(searchParams.code).toLowerCase());

        const nameMatches = removeDiacritics(e.name)
          .toLowerCase()
          .includes(removeDiacritics(searchParams.name).toLowerCase());

        return codeMatches && nameMatches;
      });
    }
  }, [_assets, searchParams]);

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

  const onSearch = (searchValues: { code: string; name: string }) => {
    setSearchParams(searchValues);
  };
  //#endregion

  useImperativeHandle(ref, () => ({
    open: () => setOpen(true),
  }));

  //#region Render
  const headers: TCTableHeaders<IAssetInAll> = [
    { key: "code", label: "mã tài sản", align: "left", width: 240 },
    { key: "name", label: "tên tài sản", align: "left", width: 460 },
    { key: "region", label: "vị trí", align: "left", width: 300 },
  ];
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xxl">
      <Typography variant="dialog-title">danh sách tài sản</Typography>
      <Stack p={3} gap={2} minWidth={1200}>
        <MSearch onSearch={onSearch} />
        <CTable
          showIndexCol={false}
          dense
          autoPaginate
          headerTransform="capitalize"
          headers={headers}
          data={assets}
          selection={{
            hideCheckAll: true,
            selectedList: selected,
            onSelect,
            pin: false,
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
