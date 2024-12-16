import { forwardRef, useImperativeHandle, useMemo, useState } from "react";

import { TCTableHeaders } from "@components/others/CTable/types";
import { CButton } from "@controls";
import { useGetAllStores } from "@hooks/options";
import { IStoreResponse } from "@interfaces/stores";
import { Dialog, Stack, Typography } from "@mui/material";
import { CTable } from "@others";

import { IMStoresModalProps, IMStoresModalRef } from "./types";

export const MStoresModal = forwardRef<IMStoresModalRef, IMStoresModalProps>(
  ({ existingStores = [], onAddStores }, ref) => {
    //#region Data
    const [open, setOpen] = useState(false);
    const [selectedList, setSelectedList] = useState<IStoreResponse[]>([]);

    const { stores, loading } = useGetAllStores({ enabled: open });

    const _stores = useMemo(
      () =>
        stores.filter(
          (e) => !existingStores.some((el) => el.store_id === e?.databaseId)
        ),
      [existingStores, stores]
    );
    //#endregion

    //#region Event
    const onClose = () => {
      setOpen(false);
      setSelectedList([]);
    };

    const onSubmit = () => {
      onAddStores(selectedList);
      onClose();
    };
    //#endregion

    useImperativeHandle(ref, () => ({
      open: () => setOpen(true),
    }));

    //#region Render
    const headers: TCTableHeaders<any> = [
      { key: "code", label: "mã chi nhánh" },
      { key: "name", label: "mã chi nhánh", align: "left", width: 350 },
    ];
    return (
      <Dialog open={open} onClose={onClose} maxWidth="lg">
        <Typography variant="dialog-title">Thêm chi nhánh</Typography>
        <Stack p={2} gap={1.5} minWidth={700}>
          <CTable
            loading={loading}
            showIndexCol={false}
            headerTransform="capitalize"
            height={500}
            headers={headers}
            data={_stores}
            selection={{
              selectedList: selectedList,
              hideCheckAll: true,
              onSelect: (newSelection) => setSelectedList(newSelection),
            }}
            rowKey="code"
            dense
          />
          <Stack direction="row" justifyContent="end">
            <CButton disabled={selectedList.length === 0} onClick={onSubmit}>
              Thêm chi nhánh
            </CButton>
          </Stack>
        </Stack>
      </Dialog>
    );
    //#endregion
  }
);
