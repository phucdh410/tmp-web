import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

import { amenitiesApi } from "@apis/amenities.api";
import { roomsApi } from "@apis/rooms.api";
import { CInput } from "@controls";
import { toast } from "@funcs/toast";
import { Dialog, Stack, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { CFormInputWrapper, CFormLabel } from "@others";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

import { MAmenitiesTable } from "./MAmenitiesTable";
import { MRatesTable } from "./MRatesTable";
import { IMDetailModalProps, IMDetailModalRef } from "./types";

export const MDetailModal = forwardRef<IMDetailModalRef, IMDetailModalProps>(
  ({ listRefetch }, ref) => {
    //#region Data
    const [open, setOpen] = useState(false);

    const [id, setId] = useState("");

    const { data, error, refetch } = useQuery({
      queryKey: ["chi-tiet-phong", id],
      queryFn: () => roomsApi.getById(id),
      enabled: !!id,
      select: (response) => response?.data?.data,
      retry: false,
    });

    const { data: TIEU_CHI_TIEN_ICH_OPTIONS } = useQuery({
      queryKey: ["danh-sach-tieu-chi-tien-ich"],
      queryFn: () => amenitiesApi.getAllCriteria(),
      enabled: !!id,
      select: (response) =>
        response?.data?.data?.map((e) => ({ id: e.code, label: e.name })),
    });
    //#endregion

    //#region Event
    const onClose = () => {
      listRefetch();
      setOpen(false);
    };
    //#endregion

    useEffect(() => {
      if (error) {
        toast.error(error?.message);
        onClose();
      }
    }, [error]);

    useImperativeHandle(ref, () => ({
      open: (id) => {
        if (id) {
          setId(id);
          setOpen(true);
        }
      },
    }));

    //#region Render
    return (
      <Dialog open={open} onClose={onClose} maxWidth="xl">
        <Typography variant="dialog-title">xem chi tiết phòng</Typography>
        <Stack p={3} gap={4}>
          <Grid2
            container
            mx={14}
            columns={2}
            rowSpacing={2}
            columnSpacing={10}
          >
            <Grid2 xs={1}>
              <CFormInputWrapper percent={{ label: 45, input: 55 }}>
                <CFormLabel>Mã phòng</CFormLabel>
                <CInput value={data?.code ?? ""} disabled />
              </CFormInputWrapper>
            </Grid2>
            <Grid2 xs={1}>
              <CFormInputWrapper percent={{ label: 45, input: 55 }}>
                <CFormLabel>Chi nhánh</CFormLabel>
                <CInput value={data?.store_name ?? ""} disabled />
              </CFormInputWrapper>
            </Grid2>
            <Grid2 xs={1}>
              <CFormInputWrapper percent={{ label: 45, input: 55 }}>
                <CFormLabel>Tên phòng</CFormLabel>
                <CInput value={data?.name ?? ""} disabled />
              </CFormInputWrapper>
            </Grid2>
            <Grid2 xs={1}>
              <CFormInputWrapper percent={{ label: 45, input: 55 }}>
                <CFormLabel>Vị trí</CFormLabel>
                <CInput value={data?.place_position_name ?? ""} disabled />
              </CFormInputWrapper>
            </Grid2>
            <Grid2 xs={1}>
              <CFormInputWrapper percent={{ label: 45, input: 55 }}>
                <CFormLabel>Nhóm phòng</CFormLabel>
                <CInput value={data?.room_group_name ?? ""} disabled />
              </CFormInputWrapper>
            </Grid2>
            <Grid2 xs={1}>
              <CFormInputWrapper percent={{ label: 45, input: 55 }}>
                <CFormLabel>Trạng thái</CFormLabel>
                <CInput
                  value={data?.status === 1 ? "Hoạt động" : "Ngưng"}
                  disabled
                />
              </CFormInputWrapper>
            </Grid2>
            <Grid2 xs={1}>
              <CFormInputWrapper percent={{ label: 45, input: 55 }}>
                <CFormLabel>Áp dụng từ ngày</CFormLabel>
                <CInput
                  value={dayjs(data?.apply_from).format("DD/MM/YYYY") ?? ""}
                  disabled
                />
              </CFormInputWrapper>
            </Grid2>
          </Grid2>
          <Stack direction="row" gap={3}>
            <Stack flexShrink={0}>
              <MAmenitiesTable
                refetch={refetch}
                amenities={data?.amenities ?? []}
                room_id={Number(data?.id!) ?? 0}
                all_criteria_options={TIEU_CHI_TIEN_ICH_OPTIONS ?? []}
              />
            </Stack>
            <Stack flex={1}>
              <MRatesTable
                refetch={refetch}
                ratesData={data?.rates ?? []}
                room_id={data?.id! ?? ""}
              />
            </Stack>
          </Stack>
        </Stack>
      </Dialog>
    );
    //#endregion
  }
);
