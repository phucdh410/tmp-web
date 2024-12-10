import { forwardRef, useImperativeHandle, useState } from "react";

import { TCTableHeaders } from "@components/others/CTable/types";
import { CButton } from "@controls";
import { useGetAllStores } from "@hooks/options";
import { Dialog, Stack, Typography } from "@mui/material";
import { CTable } from "@others";

import { IMStoresModalProps, IMStoresModalRef } from "./types";

export const MStoresModal = forwardRef<IMStoresModalRef, IMStoresModalProps>(
  (props, ref) => {
    //#region Data
    const [open, setOpen] = useState(false);

    const { stores, loading } = useGetAllStores();
    //#endregion

    //#region Event
    const onClose = () => {
      setOpen(false);
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
        <Typography variant="dialog-title">Thêm chi nhánh vào TPM</Typography>
        <Stack p={2} gap={1.5} minWidth={700}>
          <CTable
            loading={loading}
            showIndexCol={false}
            headerTransform="capitalize"
            height={500}
            headers={headers}
            data={stores}
            selection={{
              selectedList: [],
              hideCheckAll: true,
            }}
            rowKey="code"
            dense
          />
          <Stack direction="row" justifyContent="end">
            <CButton>Thêm chi nhánh</CButton>
          </Stack>
        </Stack>
      </Dialog>
    );
    //#endregion
  }
);
