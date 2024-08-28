import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

import { amenitiesApi } from "@apis/amenities.api";
import { roomGroupSuggestApi } from "@apis/room-group-suggests.api";
import { CAutocomplete, CInput, CNumberInput } from "@controls";
import { toast } from "@funcs/toast";
import { Dialog, Stack, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { CFormInputWrapper, CFormLabel } from "@others";
import { useQuery } from "@tanstack/react-query";

import { MAmenitiesTable } from "./MAmenitiesTable";
import { MRatesTable } from "./MRatesTable";
import { IMDetailModalProps, IMDetailModalRef } from "./types";

export const MDetailModal = forwardRef<IMDetailModalRef, IMDetailModalProps>(
  (props, ref) => {
    //#region Data
    const [open, setOpen] = useState(false);

    const [id, setId] = useState("");

    const { data, error, refetch } = useQuery({
      queryKey: ["chi-tiet-de-xuat-nhom-phong", id],
      queryFn: () => roomGroupSuggestApi.getById(id),
      enabled: !!id,
      select: (response) => response?.data?.data,
      retry: false,
    });

    const [criteriaValue, setCriteriaValue] = useState("");

    const { data: TIEU_CHI_TIEN_ICH_OPTIONS } = useQuery({
      queryKey: ["danh-sach-tieu-chi-tien-ich"],
      queryFn: () => amenitiesApi.getAllCriteria(),
      enabled: !!id,
      select: (response) =>
        response?.data?.data?.map((e) => ({ id: e.code, label: e.name })),
    });
    //#endregion

    //#region Event
    const onClose = () => setOpen(false);

    const onCriteriaChange = (newValue: string) => {
      setCriteriaValue(newValue);
    };
    //#endregion

    useEffect(() => {
      if (error) {
        toast.error(error?.message);
        onClose();
      }
    }, [error]);

    useEffect(() => {
      if (TIEU_CHI_TIEN_ICH_OPTIONS) {
        setCriteriaValue(TIEU_CHI_TIEN_ICH_OPTIONS[0].id);
      }
    }, [TIEU_CHI_TIEN_ICH_OPTIONS]);

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
        <Typography variant="dialog-title">
          xem chi tiết đề xuất nhóm phòng
        </Typography>
        <Stack p={3} gap={4}>
          {data && (
            <Grid2
              container
              mx={14}
              columns={2}
              rowSpacing={2}
              columnSpacing={10}
            >
              <Grid2 xs={1}>
                <CFormInputWrapper percent={{ label: 45, input: 55 }}>
                  <CFormLabel>Chi nhánh</CFormLabel>
                  <CInput value={data?.store_name} disabled />
                </CFormInputWrapper>
              </Grid2>
              <Grid2 xs={1}></Grid2>
              <Grid2 xs={1}>
                <CFormInputWrapper percent={{ label: 45, input: 55 }}>
                  <CFormLabel>Mã nhóm phòng</CFormLabel>
                  <CInput value={data?.code} disabled />
                </CFormInputWrapper>
              </Grid2>
              <Grid2 xs={1}>
                <CFormInputWrapper percent={{ label: 45, input: 55 }}>
                  <CFormLabel>Tên nhóm phòng</CFormLabel>
                  <CInput value={data?.name} disabled />
                </CFormInputWrapper>
              </Grid2>
              <Grid2 xs={1}>
                <CFormInputWrapper percent={{ label: 45, input: 55 }}>
                  <CFormLabel>DT phòng từ</CFormLabel>
                  <CNumberInput
                    value={data?.floor_area_min}
                    disabled
                    suffix="m2"
                  />
                </CFormInputWrapper>
              </Grid2>
              <Grid2 xs={1}>
                <CFormInputWrapper percent={{ label: 45, input: 55 }}>
                  <CFormLabel>DT phòng đến</CFormLabel>
                  <CNumberInput
                    value={data?.floor_area_max}
                    disabled
                    suffix="m2"
                  />
                </CFormInputWrapper>
              </Grid2>
              <Grid2 xs={1}>
                <CFormInputWrapper percent={{ label: 45, input: 55 }}>
                  <CFormLabel>Tiêu chí tiện ích</CFormLabel>
                  <CAutocomplete
                    value={criteriaValue}
                    onChange={onCriteriaChange}
                    options={TIEU_CHI_TIEN_ICH_OPTIONS ?? []}
                  />
                </CFormInputWrapper>
              </Grid2>
            </Grid2>
          )}
          <Stack direction="row" gap={3}>
            <Stack flexShrink={0}>
              <MAmenitiesTable
                refetch={refetch}
                criteria_code={criteriaValue}
                amenitiesRoot={data?.amenities ?? []}
                room_group_id={Number(data?.id!) ?? 0}
              />
            </Stack>
            <Stack flex={1}>
              <MRatesTable refetch={refetch} ratesData={data?.rates ?? []} />
            </Stack>
          </Stack>
        </Stack>
      </Dialog>
    );
    //#endregion
  }
);
