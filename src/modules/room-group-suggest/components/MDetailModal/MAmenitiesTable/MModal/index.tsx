import { forwardRef, useImperativeHandle, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { amenitiesApi } from "@apis/amenities.api";
import { roomGroupSuggestApi } from "@apis/room-group-suggests.api";
import { CAutocomplete, CButton, CCheckbox } from "@controls";
import { toast } from "@funcs/toast";
import { Box, Dialog, Grid2, Stack, Typography } from "@mui/material";
import { CFormInputWrapper, CFormLabel } from "@others";
import { useQuery } from "@tanstack/react-query";

import { IMModalProps, IMModalRef } from "./types";

export const MModal = forwardRef<IMModalRef, IMModalProps>(
  ({ all_criteria_options, refetch, ...props }, ref) => {
    //#region Data
    const [open, setOpen] = useState(false);

    const { control, handleSubmit, reset, watch, setValue } = useForm({
      mode: "all",
      defaultValues: {
        room_group_id: 0,
        criteria_code: "",
        amenities: [] as number[],
      },
    });

    const { data } = useQuery({
      queryKey: ["danh-sach-tien-ich-cua-tieu-chi", watch("criteria_code")],
      queryFn: () =>
        amenitiesApi.getAll({ amenity_criteria_code: watch("criteria_code") }),
      enabled: !!watch("criteria_code"),
      select: (response) =>
        response?.data?.data?.map((e) => ({ ...e, id: Number(e.id) })),
    });
    //#endregion

    //#region Event
    const isChecked = (checkId: number) => {
      return watch("amenities").includes(checkId);
    };

    const onClose = () => {
      reset({
        room_group_id: 0,
        criteria_code: "",
        amenities: [],
      });
      setOpen(false);
    };

    const onSubmit = () => {
      handleSubmit(async (values) => {
        try {
          const { criteria_code, ...payload } = values;
          await roomGroupSuggestApi.updateAmenitiesInRoomGroup(payload);

          toast.success("Cập nhật tiện ích của đề xuất phòng thành công");
          refetch();
          onClose();
        } catch (error: any) {
          toast.error(error?.message ?? "Có lỗi xảy ra");
        }
      })();
    };

    const onCheck = (checkId: number) => (checked: boolean) => {
      if (checked) {
        const result = [...watch("amenities"), checkId];
        setValue("amenities", result);
      } else {
        const result = watch("amenities").filter((e) => e !== checkId);
        setValue("amenities", result);
      }
    };
    //#endregion

    useImperativeHandle(ref, () => ({
      open: (room_group_id, amenities) => {
        reset({
          room_group_id,
          criteria_code: all_criteria_options[0].id as string,
          amenities: amenities.map((e) => Number(e.id)),
        });

        setOpen(true);
      },
    }));

    //#region Render
    return (
      (<Dialog open={open} onClose={onClose} maxWidth="lg">
        <Typography variant="dialog-title">thay đổi tiện ích</Typography>
        <Stack p={2}>
          <CFormInputWrapper percent={{ label: 45, input: 55 }}>
            <CFormLabel>Tiêu chí tiện ích</CFormLabel>
            <Controller
              control={control}
              name="criteria_code"
              render={({ field }) => (
                <CAutocomplete
                  {...field}
                  options={all_criteria_options ?? []}
                />
              )}
            />
          </CFormInputWrapper>

          <Typography fontSize={18} fontWeight={500} mt={2} mb={1}>
            Danh sách các tiện ích của tiêu chí
          </Typography>

          <Grid2
            container
            minWidth={600}
            mb={3}
            columns={3}
            rowSpacing={2}
            columnSpacing={4}
          >
            {data &&
              data.length > 0 &&
              data.map((e) => (
                <Grid2 key={e.id} size={1}>
                  <CCheckbox
                    value={isChecked(e.id)}
                    label={`${e.name} - ${e.price}`}
                    onChange={onCheck(e.id)}
                  />
                </Grid2>
              ))}
          </Grid2>

          <Box textAlign="center">
            <CButton onClick={onSubmit} highlight>
              Lưu thông tin
            </CButton>
          </Box>
        </Stack>
      </Dialog>)
    );
    //#endregion
  }
);
