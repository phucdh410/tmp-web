import { forwardRef, useImperativeHandle, useMemo, useState } from "react";

import { permissionsApi } from "@apis/permissions.api";
import { TCTableHeaders } from "@components/others/CTable/types";
import { CButton } from "@controls";
import { IArea } from "@interfaces/permissions";
import { Dialog, Stack, Typography } from "@mui/material";
import { CTable } from "@others";
import { useQuery } from "@tanstack/react-query";

import { IMRegionsModalProps, IMRegionsModalRef } from "./types";

export const MRegionsModal = forwardRef<IMRegionsModalRef, IMRegionsModalProps>(
  ({ existingAreas = [], onAddAreas }, ref) => {
    //#region Data
    const [open, setOpen] = useState(false);
    const [selectedList, setSelectedList] = useState<IArea[]>([]);

    const { data: areas = [], isFetching } = useQuery({
      queryKey: ["danh-sach-vung-tai-san"],
      queryFn: () => permissionsApi.getAreas(),
      enabled: open,
      select: (response) => response.data.data,
    });

    const _areas = useMemo(
      () =>
        areas.filter((e) => !existingAreas.some((el) => el.area_id === e?.id)),
      [existingAreas, areas]
    );
    //#endregion

    //#region Event
    const onClose = () => {
      setOpen(false);
      setSelectedList([]);
    };

    const onSubmit = () => {
      onAddAreas(selectedList);
      onClose();
    };
    //#endregion

    useImperativeHandle(ref, () => ({
      open: () => setOpen(true),
    }));

    //#region Render
    const headers: TCTableHeaders<any> = [
      { key: "code", label: "mã vùng tài sản" },
      { key: "name", label: "tên vùng tài sản", align: "left", width: 350 },
    ];
    return (
      <Dialog open={open} onClose={onClose} maxWidth="lg">
        <Typography variant="dialog-title">Thêm vùng tài sản</Typography>
        <Stack p={2} gap={1.5} minWidth={700}>
          <CTable
            loading={isFetching}
            showIndexCol={false}
            headerTransform="capitalize"
            height={500}
            headers={headers}
            data={_areas}
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
              Thêm vùng tài sản
            </CButton>
          </Stack>
        </Stack>
      </Dialog>
    );
    //#endregion
  }
);
